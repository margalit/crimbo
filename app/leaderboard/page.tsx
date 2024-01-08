import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { Avatar, Card, View, Text } from "reshaped";
import { createServerClient } from "@supabase/ssr";

export default async function ServerComponent() {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const { data: leaderboard } = await supabase.from("leaderboard").select("*");

  return (
    <View gap={4}>
      {leaderboard?.map(({ uuid, image, name, points, harvests }) => (
        <Card key={uuid}>
          <View direction="row" align="center" gap={4}>
            <Avatar src={image!} size={12} />
            <View>
              <Text variant="body-1" weight="medium">
                {name}
              </Text>
              <Text variant="body-1" color="neutral-faded">
                {points === 1 ? "1 point" : `${points!} points`}
                {" from "}
                {harvests === 1 ? "1 harvest" : `${harvests!} harvests`}
              </Text>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}
