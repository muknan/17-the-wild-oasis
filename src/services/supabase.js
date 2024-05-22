import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mvgmwloozzrlqjhgihpn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z213bG9venpybHFqaGdpaHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMDMzOTUsImV4cCI6MjAzMTc3OTM5NX0.eVvIxO7J-u8wc9yOtyhihzTRywoB3HcOjengLXnLWWM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
