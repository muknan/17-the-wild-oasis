import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  // Error handling
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  // If everything is good
  return data;
}

export async function createCabin(newCabin) {
  // Replace all to replace "/" with "" incase file name has a "/" in it for some reason, that would cause supabase to create a new folder instead
  // const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll(
  //   "/",
  //   ""
  // );

  const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://mvgmwloozzrlqjhgihpn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was a storage error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "There was an error in uploading image, Cabin was not created"
    );
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  // Error handling
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted or does not exist");
  }
}
