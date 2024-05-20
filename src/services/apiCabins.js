import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  // Error handling
  if (error) {
    console.error(error);
    throw new Error("Table cabins could not be loaded");
  }

  // If everything is good
  return data;
}
