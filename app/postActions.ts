"use server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { randomUUID } from "crypto";

export const addPost = async (formData: FormData) => {
  "use server";

  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

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
    .upload(randomUUID(), image);
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
