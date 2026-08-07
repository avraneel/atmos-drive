import supabase from "../db/supabase.client.js";

export async function uploadFile(file) {
  const fileBase64 = decode(file.buffer.toString("base64"));
  const { data, error } = await supabase.storage
    .from("upload")
    .upload(file.originalname, fileBase64, {
      cacheControl: "3600",
      upsert: true,
    });

  return data;
}

export async function downloadFile(params) {}
