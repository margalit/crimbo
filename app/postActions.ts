"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

export const addPost = async (formData: FormData) => {
  "use server";

  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (!session) {
    return;
  }

  // Pull out form fields
  const image = formData.get("image") as File;
  const location = formData.get("location") as string;
  const isSynthetic = formData.get("is_synthetic") === "true";

  // Upload image
  const upload = await supabase.storage
    .from("harvests")
    .upload("abc123", image);
  if (upload.error) throw upload.error;

  // Insert harvest
  const harvest = await supabase
    .from("harvests")
    .insert({
      user: session.user.id,
      image: upload.data.path,
      location,
      is_synthetic: isSynthetic,
    })
    .select();
  if (harvest.error) throw harvest.error;

  // Invalidate cache
  revalidatePath("/");
};
