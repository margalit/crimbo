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
import type { FeedData } from "../pages";

function pointsText(points: number) {
  switch (points) {
    case 0.5:
      return `half a point`;
    case 1:
      return `a point`;
    default:
      return `${points} points`;
  }
}

const Feed = ({ feed }: { feed: FeedData }) => (
  <View gap={6} paddingTop={4}>
    {feed.map(
      ({ id, image, avatar, name, location, created_at, points }, index) => {
        return (
          <Card key={id} padding={0}>
            <Overlay
              position="bottom"
              backgroundSlot={
                <AspectRatio ratio={1}>
                  <NextImage
                    src={image!}
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
              <View gap={3} align="center" direction="row" position="relative">
                <Avatar src={avatar!} size={10} />
                <View.Item grow>
                  <View align="center" direction="row" gap={1}>
                    <Text variant="body-medium-1">
                      {name!} got {pointsText(points!)}
                    </Text>
                  </View>
                  <Text color="neutral-faded">Harvested on {created_at}</Text>
                </View.Item>
              </View>
            </ActionBar>
          </Card>
        );
      }
    )}
  </View>
);

export default Feed;
