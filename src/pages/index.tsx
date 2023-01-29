import { type NextPage } from "next";
import {
  Container,
  Button,
  Avatar,
  View,
  Text,
  Image,
  Card,
  AspectRatio,
  Tabs,
  ActionBar,
  useTheme,
  Overlay,
  Link,
} from "reshaped";
import {
  TrophyIcon,
  CameraIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

const players = {
  samM: {
    name: "Sam M",
    image: "/players/samM.jpeg",
  },
  rubyB: {
    name: "Ruby B",
    image: "/players/rubyB.jpeg",
  },
  joL: {
    name: "Jo L",
    image: "/players/joL.jpeg",
  },
  chrisV: {
    name: "Chris V",
    image: "/players/chrisV.jpeg",
  },
  maxW: {
    name: "Max W",
    image: "/players/maxW.png",
  },
  jessH: {
    name: "Jess H",
    image: "/players/jessH.png",
  },
  chrisM: {
    name: "Chris M",
    image: "/players/chrisM.png",
  },
};

const feed = [
  {
    id: "jan23-3",
    src: "/harvests/jan23-3.jpeg",
    claimant: "chrisM" as const,
    location: "Flinders St, Thornbury",
    points: 1,
    date: "Jan 23",
  },
  {
    id: "jan23-2",
    src: "/harvests/jan23-2.jpeg",
    claimant: "jessH" as const,
    location: "Near the train station, Thornbury",
    points: 1,
    date: "Jan 23",
  },
  {
    id: "jan23",
    src: "/harvests/jan23.jpeg",
    claimant: "maxW" as const,
    location: "Rennie St, Thornbury",
    points: 1,
    date: "Jan 23",
  },
  {
    id: "jan22",
    src: "/harvests/jan22.jpeg",
    claimant: "rubyB" as const,
    location: "Darebin Street, Heidelberg",
    points: 1,
    date: "Jan 22",
  },
  {
    id: "1",
    src: "/harvests/one.jpeg",
    claimant: "samM" as const,
    location: "Franklin Street, Coburg",
    points: 1,
    date: "Jan 18",
  },
  {
    id: "2",
    src: "/harvests/two.jpeg",
    claimant: "rubyB" as const,
    location: "Coburg",
    points: 1,
    date: "Jan 16",
  },
  {
    id: "3",
    src: "/harvests/three.jpeg",
    claimant: "rubyB" as const,
    location: "De Carle Street, Coburg",
    points: 1,
    date: "Jan 16",
  },
  {
    id: "4",
    src: "/harvests/four.jpeg",
    claimant: "rubyB" as const,
    location: "Coburg North",
    points: 1,
    date: "Jan 3",
  },
  {
    id: "5",
    src: "/harvests/five.jpeg",
    claimant: "rubyB" as const,
    location: "Clayton",
    points: 1,
    date: "Jan 3",
  },
  {
    id: "6",
    src: "/harvests/six.jpeg",
    claimant: "rubyB" as const,
    location: "Outside Vinnies, Preston",
    points: 0.5,
    date: "Jan 3",
  },
  {
    id: "7",
    src: "/harvests/seven.jpg",
    claimant: "chrisV" as const,
    location: "Tumbarumba",
    points: 5,
    date: "Dec 27",
  },
];

const totals = feed.reduce(
  (totals, item) => {
    totals[item.claimant].points += item.points;
    totals[item.claimant].harvests++;
    return totals;
  },
  {
    samM: { points: 0, harvests: 0 },
    rubyB: { points: 0, harvests: 0 },
    joL: { points: 0, harvests: 0 },
    chrisV: { points: 0, harvests: 0 },
    maxW: { points: 0, harvests: 0 },
    jessH: { points: 0, harvests: 0 },
    chrisM: { points: 0, harvests: 0 },
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
  return (
    <>
      <Head>
        <title>crimbo</title>
        <meta
          name="description"
          content="Find and share old Christmas trees to win"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="og:title"
          content="Crimbo: Find and share old Christmas trees"
        />
        <meta
          name="og:description"
          content="Crimbo is a game where each player tries to take photos of discarded Christmas trees."
        />
        <meta
          name="og:image"
          content={`${
            process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
          }/hero.jpeg`}
        />
      </Head>
      <Container width="580px">
        <View gap={4} paddingTop={4} paddingBottom={12}>
          <View align="center" direction="row">
            <View.Item grow>
              <Text variant="body-strong-1">Crimbo</Text>
            </View.Item>
            <Navigation />
          </View>
          <Tabs itemWidth="equal" variant="pills-elevated">
            <Tabs.List>
              <Tabs.Item value="0" icon={<CameraIcon />}>
                <Text variant="body-medium-2">Harvests</Text>
              </Tabs.Item>
              <Tabs.Item value="1" icon={<TrophyIcon />}>
                <Text variant="body-medium-2">Leaderboard</Text>
              </Tabs.Item>
              <Tabs.Item value="2" icon={<InformationCircleIcon />}>
                <Text variant="body-medium-2">About</Text>
              </Tabs.Item>
            </Tabs.List>
            <Tabs.Panel value="0">
              <View gap={6} paddingTop={4}>
                {feed.map(({ id, src, claimant, location, date, points }) => (
                  <Card key={id} padding={0}>
                    <Overlay
                      position="bottom"
                      backgroundSlot={
                        <AspectRatio ratio={1}>
                          <Image
                            src={src}
                            alt="discarded christmas tree"
                            width="100%"
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
                        <Avatar src={players[claimant].image} size={10} />
                        <View.Item grow>
                          <View align="center" direction="row" gap={1}>
                            <Text variant="body-medium-1">
                              {players[claimant].name} got {pointsText(points)}
                            </Text>
                          </View>
                          <Text color="neutral-faded">Harvested on {date}</Text>
                        </View.Item>
                      </View>
                    </ActionBar>
                  </Card>
                ))}
              </View>
            </Tabs.Panel>
            <Tabs.Panel value="1">
              <View gap={4} paddingTop={4}>
                {getEntries(totals)
                  .sort(([, a], [, b]) => (a.points > b.points ? -1 : 1))
                  .map(([id, totals]) => (
                    <Card key={id}>
                      <View direction="row" align="center" gap={4}>
                        <Avatar src={players[id].image} size={12} />
                        <View>
                          <Text variant="body-strong-1">
                            {players[id].name}
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
            <Tabs.Panel value="2">
              <View gap={6} paddingTop={4}>
                <AspectRatio ratio={1.6}>
                  <Image
                    src="/hero.jpeg"
                    borderRadius="large"
                    alt="Discarded christmas tree"
                  />
                </AspectRatio>
                <Text variant="title-3">
                  Crimbo is a game where each player tries to take photos of
                  discarded Christmas trees.
                </Text>
                <View gap={1}>
                  <Text variant="title-3">Harvests</Text>
                  <Text variant="body-1">
                    Photos of trees are called ‘harvests’. Players receive more
                    points later in the year as trees get rarer making it
                    possible to win with just a few late harvests.
                  </Text>
                </View>
                <View gap={1}>
                  <Text variant="title-3">Rules</Text>
                  <Text variant="body-1">
                    <li>Harvests must be unique</li>
                    <li>Trees must be on the way out, not the way in</li>
                    <li>The leaderboard resets on Christmas Day</li>
                  </Text>
                </View>
                <View gap={1}>
                  <Text variant="title-3">Points</Text>
                  <Text variant="body-1">
                    <li>+1 point for each month past December</li>
                    <li>1/2 points for synthetic trees</li>
                    <li>
                      5 points for harvests between Boxing Day and New Years
                    </li>
                  </Text>
                </View>
                <View gap={1}>
                  <Text variant="title-3">Can I play?</Text>
                  <Text variant="body-1">
                    Sure! The feed is currently manual so please send harvests
                    via <Link href="mailto:sam@margalit.com.au">email</Link>.
                    Please include a location so I can verify it’s uniqueness!
                  </Text>
                </View>
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

// interface UserProps {
//   user: Session["user"];
// }

// const User = ({ user }: UserProps) => (
//   <DropdownMenu position="bottom">
//     <DropdownMenu.Trigger>
//       {(attributes) => (
//         <Actionable attributes={attributes}>
//           {user?.image ? (
//             <Avatar size={8} src={user.image} />
//           ) : (
//             <Text>Signed in</Text>
//           )}
//         </Actionable>
//       )}
//     </DropdownMenu.Trigger>
//     <DropdownMenu.Content>
//       <DropdownMenu.Item onClick={() => void signOut()}>
//         Sign out
//       </DropdownMenu.Item>
//     </DropdownMenu.Content>
//   </DropdownMenu>
// );
