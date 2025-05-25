import { createClient } from "@/lib/utils/supabase/server";

export async function getStorageUrl(path: string | null | undefined) {
  if (!path) return null;

  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("portfolio-imagesget`stoarge`url")
    .createSignedUrl(`portfolio-images/${path}`, 60 * 60); // 1-hour expiration

  if (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }

  return data.signedUrl;
}