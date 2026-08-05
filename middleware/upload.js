import supabase from "../db/supabase.client.js";

export async function uploadToBucket(req, res) {
  console.log(req.body);
  res.end();
}
