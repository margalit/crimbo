import {
  Avatar,
  View,
  Text,
  Card,
  AspectRatio,
  ActionBar,
  Overlay,
} from "reshaped";
import { MapPinIcon } from "@heroicons/react/24/solid";
import NextImage from "next/image";
import { useData } from "../pages";

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

const Feed = () => {
  const { data } = useData();
  return (
    <View gap={6} paddingTop={4}>
      {data?.feed?.map(
        ({ id, image, avatar, name, location, created_at, points }, index) => {
          return (
            <Card key={id} padding={0}>
              <Overlay
                position="bottom"
                backgroundSlot={
                  <AspectRatio ratio={1}>
                    <NextImage
                      src={`https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/${image!}`}
                      width={548}
                      height={548}
                      alt="Discarded christmas tree"
                      priority={index <= 1}
                      style={{ height: "auto" }}
                    />
                  </AspectRatio>
                }
              >
                <View direction="row" align="center" gap={1}>
                  <MapPinIcon width={24} height={24} />
                  <Text variant="title-3">{location}</Text>
                </View>
              </Overlay>
              <ActionBar>
                <View
                  gap={3}
                  align="center"
                  direction="row"
                  position="relative"
                >
                  <Avatar src={avatar!} size={10} />
                  <View.Item grow>
                    <View align="center" direction="row" gap={1}>
                      <Text variant="body-medium-1">
                        {name!} got {pointsText(points!)}
                      </Text>
                    </View>
                    <Text color="neutral-faded">
                      Harvested on {dateText(created_at!)}
                    </Text>
                  </View.Item>
                </View>
              </ActionBar>
            </Card>
          );
        }
      )}
    </View>
  );
};

export default Feed;
