import { type NextPage } from "next";
import type { Session } from "next-auth";
import {
  Container,
  Button,
  Avatar,
  View,
  Actionable,
  DropdownMenu,
  Text,
  Image,
  Card,
  AspectRatio,
  Tabs,
  ActionBar,
  useTheme,
  Overlay,
} from "reshaped";
import {
  TrophyIcon,
  PhotoIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

const participants = {
  sam: {
    name: "Sam",
    image: "/sam.jpeg",
  },
  ruby: {
    name: "Ruby",
    image: "/ruby.jpeg",
  },
  jo: {
    name: "Jo",
    image: "/jo.jpeg",
  },
  chris: {
    name: "Chris",
    image: "/chris.jpeg",
  },
};

const feed = [
  {
    id: "1",
    src: "/one.jpeg",
    claimant: "sam" as const,
    street: "Franklin Street",
    points: 1,
    date: "Jan 18",
  },
  {
    id: "2",
    src: "/two.jpeg",
    claimant: "ruby" as const,
    street: "Unknown",
    points: 1,
    date: "Jan 16",
  },
  {
    id: "3",
    src: "/three.jpeg",
    claimant: "ruby" as const,
    street: "De Carle Street",
    points: 1,
    date: "Jan 16",
  },
  {
    id: "4",
    src: "/four.jpeg",
    claimant: "ruby" as const,
    street: "Unknown",
    points: 1,
    date: "Jan 3",
  },
  {
    id: "5",
    src: "/five.jpeg",
    claimant: "ruby" as const,
    street: "Unknown",
    points: 1,
    date: "Jan 3",
  },
  {
    id: "6",
    src: "/six.jpeg",
    claimant: "ruby" as const,
    street: "Unknown",
    points: 0.5,
    date: "Jan 3",
  },
];

const totals = feed.reduce(
  (totals, item) => {
    totals[item.claimant].points += item.points;
    totals[item.claimant].harvests++;
    return totals;
  },
  {
    sam: { points: 0, harvests: 0 },
    ruby: { points: 0, harvests: 0 },
    jo: { points: 0, harvests: 0 },
    chris: { points: 0, harvests: 0 },
  }
);

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

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>crimbo</title>
        <meta name="description" content="Harvest your neighbourhood" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container width="580px">
        <View gap={4} paddingTop={4} paddingBottom={4}>
          <View align="center" direction="row">
            <View.Item grow>
              <Text variant="body-strong-1">crimbo</Text>
            </View.Item>
            <Navigation />
          </View>
          <Tabs itemWidth="equal" variant="pills-elevated">
            <Tabs.List>
              <Tabs.Item value="0" icon={<PhotoIcon />}>
                <Text variant="body-medium-2">Feed</Text>
              </Tabs.Item>
              <Tabs.Item value="1" icon={<TrophyIcon />}>
                <Text variant="body-medium-2">Scores</Text>
              </Tabs.Item>
            </Tabs.List>
            <Tabs.Panel value="0">
              <View gap={6}>
                {feed.map(({ id, src, claimant, street, date, points }) => (
                  <Card key={id} padding={0}>
                    <Overlay
                      position="bottom"
                      backgroundSlot={
                        <AspectRatio ratio={1}>
                          <Image src={src} alt="discarded christmas tree" />
                        </AspectRatio>
                      }
                    >
                      <Text variant="title-1">{street}</Text>
                    </Overlay>
                    <ActionBar>
                      <View
                        gap={3}
                        align="center"
                        direction="row"
                        position="relative"
                      >
                        <Avatar src={participants[claimant].image} size={10} />
                        <View.Item grow>
                          <View align="center" direction="row" gap={1}>
                            <Text variant="body-medium-1">
                              {participants[claimant].name} harvested{" "}
                              {pointsText(points)}
                            </Text>
                          </View>
                          <Text color="neutral-faded">Claimed on {date}</Text>
                        </View.Item>
                      </View>
                    </ActionBar>
                  </Card>
                ))}
              </View>
            </Tabs.Panel>
            <Tabs.Panel value="1">
              <View gap={4}>
                {getEntries(totals)
                  .sort(([, a], [, b]) => (a.points > b.points ? -1 : 1))
                  .map(([id, totals], index) => (
                    <Card key={id}>
                      <View direction="row" align="center" gap={4}>
                        <Avatar src={participants[id].image} size={12} />
                        <View>
                          <Text variant="body-strong-1">
                            {participants[id].name}
                          </Text>
                          <Text variant="body-1" color="neutral-faded">
                            {totals.points === 1
                              ? "1 point"
                              : `${totals.points} points`}
                            {" from "}
                            {totals.harvests === 1
                              ? "1 harvest"
                              : `${totals.harvests} harvests`}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  ))}
              </View>
            </Tabs.Panel>
          </Tabs>
        </View>
      </Container>
    </>
  );
};

export default Home;

const Navigation = () => {
  const { data: sessionData } = useSession();
  return (
    <View justify="end" align="center" direction="row" gap={3}>
      <ColorModeButton />
    </View>
  );
};

const ColorModeButton = () => {
  const { setColorMode, colorMode } = useTheme();
  if (colorMode === "dark") {
    return (
      <Button
        variant="outline"
        size="small"
        onClick={() => setColorMode("light")}
        startIcon={<SunIcon />}
        endIcon={<ChevronDownIcon />}
      >
        Dark
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      size="small"
      onClick={() => setColorMode("dark")}
      startIcon={<MoonIcon />}
      endIcon={<ChevronDownIcon />}
    >
      Light
    </Button>
  );
};

interface UserProps {
  user: Session["user"];
}

const User = ({ user }: UserProps) => (
  <DropdownMenu position="bottom">
    <DropdownMenu.Trigger>
      {(attributes) => (
        <Actionable attributes={attributes}>
          {user?.image ? (
            <Avatar size={8} src={user.image} />
          ) : (
            <Text>Signed in</Text>
          )}
        </Actionable>
      )}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item onClick={() => void signOut()}>
        Sign out
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>
);
