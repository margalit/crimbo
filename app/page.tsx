import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { Card, View, ActionBar, Avatar, Scrim, Text, Icon } from "reshaped";
import Image from "next/image";
import { LocationIcon } from "./(components)/Icons";

export default async function ServerComponent() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const { data: feed } = await supabase.from("feed").select("*");

  return (
    <View gap={6}>
      {feed?.map(
        ({ id, name, avatar, location, points, created_at, image }, index) => (
          <Card key={id} padding={0}>
            <Scrim
              position="bottom"
              backgroundSlot={
                <View aspectRatio={1}>
                  <Image
                    src={`https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/${image}`}
                    width={548}
                    height={548}
                    alt="Discarded christmas tree"
                    priority={index <= 1}
                    style={{ height: "auto" }}
                  />
                </View>
              }
            >
              <View direction="row" align="center" gap={1}>
                <Icon svg={LocationIcon} size={8} />
                <Text variant="featured-3" weight="medium">
                  {location}
                </Text>
              </View>
            </Scrim>
            <ActionBar>
              <View gap={3} align="center" direction="row" position="relative">
                <Avatar src={avatar!} size={10} />
                <View.Item grow>
                  <View align="center" direction="row" gap={1}>
                    <Text variant="body-2" weight="medium">
                      {name} got {pointsText(points!)}
                    </Text>
                  </View>
                  <Text color="neutral-faded">
                    Harvested on {dateText(created_at!)}
                  </Text>
                </View.Item>
              </View>
            </ActionBar>
          </Card>
        )
      )}
    </View>
  );
}

function pointsText(points: number) {
  switch (points) {
    case 0.5:
      return "half a point";
    case 1:
      return "a point";
    default:
      return `${points} points`;
  }
}

function dateText(timestamp: string) {
  const date = new Date(timestamp);
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  return `${month} ${date.getDate()}`;
}
