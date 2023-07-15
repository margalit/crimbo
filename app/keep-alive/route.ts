import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/database.types";

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const data = await supabase.from("harvests").select();

  return NextResponse.json(data);
}
