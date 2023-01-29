import { type NextPage } from "next";
import {
  Container,
  Button,
  Avatar,
  View,
  Text,
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
import NextImage from "next/image";
import HeroImage from "/public/hero.png";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

const players = {
  samM: {
    name: "Sam M",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/samM.jpeg",
  },
  rubyB: {
    name: "Ruby B",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/rubyB.jpeg",
  },
  joL: {
    name: "Jo L",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/joL.jpeg",
  },
  chrisV: {
    name: "Chris V",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/chrisV.jpeg",
  },
  maxW: {
    name: "Max W",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/maxW.png",
  },
  jessH: {
    name: "Jess H",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/jessH.png",
  },
  chrisM: {
    name: "Chris M",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/chrisM.png",
  },
  patA: {
    name: "Pat A",
    image:
      "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/players/patA.png",
  },
};

const feed = [
  {
    id: "17",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/17.jpeg",
    claimant: "patA" as const,
    location: "Manning St, Oyster Bay",
    points: 1,
    date: "Jan 29",
  },
  {
    id: "16",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/16.jpeg",
    claimant: "chrisV" as const,
    location: "Normanby Ave, Thornbury",
    points: 1,
    date: "Jan 29",
  },
  {
    id: "15",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/15.jpeg",
    claimant: "chrisV" as const,
    location: "Darebin Rd, Thornbury",
    points: 1,
    date: "Jan 29",
  },
  {
    id: "14",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/14.jpeg",
    claimant: "chrisV" as const,
    location: "Mitchell St, Northcote",
    points: 1,
    date: "Jan 29",
  },
  {
    id: "13",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/13.jpeg",
    claimant: "joL" as const,
    location: "St Georges Rd, Thornbury",
    points: 1,
    date: "Jan 28",
  },
  {
    id: "12",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/12.jpeg",
    claimant: "jessH" as const,
    location: "Ballantyne St, Thornbury",
    points: 1,
    date: "Jan 28",
  },
  {
    id: "11",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/11.jpeg",
    claimant: "chrisM" as const,
    location: "Flinders St, Thornbury",
    points: 1,
    date: "Jan 23",
  },
  {
    id: "10",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/10.jpeg",
    claimant: "jessH" as const,
    location: "Near the train station, Thornbury",
    points: 1,
    date: "Jan 23",
  },
  {
    id: "9",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/9.jpeg",
    claimant: "maxW" as const,
    location: "Rennie St, Thornbury",
    points: 1,
    date: "Jan 23",
  },
  {
    id: "8",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/8.jpeg",
    claimant: "rubyB" as const,
    location: "Darebin St, Heidelberg",
    points: 1,
    date: "Jan 22",
  },
  {
    id: "7",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/7.jpeg",
    claimant: "samM" as const,
    location: "Franklin St, Coburg",
    points: 1,
    date: "Jan 18",
  },
  {
    id: "6",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/6.jpeg",
    claimant: "rubyB" as const,
    location: "Coburg",
    points: 1,
    date: "Jan 16",
  },
  {
    id: "5",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/5.jpeg",
    claimant: "rubyB" as const,
    location: "De Carle St, Coburg",
    points: 1,
    date: "Jan 16",
  },
  {
    id: "4",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/4.jpeg",
    claimant: "rubyB" as const,
    location: "Coburg North",
    points: 1,
    date: "Jan 3",
  },
  {
    id: "3",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/3.jpeg",
    claimant: "rubyB" as const,
    location: "Clayton",
    points: 1,
    date: "Jan 3",
  },
  {
    id: "2",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/2.jpeg",
    claimant: "rubyB" as const,
    location: "Outside Vinnies, Preston",
    points: 0.5,
    date: "Jan 3",
  },
  {
    id: "1",
    src: "https://edgkqxmiesphykcasdll.supabase.co/storage/v1/object/public/harvests/1.jpg",
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
    patA: { points: 0, harvests: 0 },
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
          }/hero.png`}
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
              <Tabs.Item value="0" icon={<InformationCircleIcon />}>
                <Text variant="body-medium-2">About</Text>
              </Tabs.Item>
              <Tabs.Item value="1" icon={<CameraIcon />}>
                <Text variant="body-medium-2">Harvests</Text>
              </Tabs.Item>
              <Tabs.Item value="2" icon={<TrophyIcon />}>
                <Text variant="body-medium-2">Leaderboard</Text>
              </Tabs.Item>
            </Tabs.List>
            <Tabs.Panel value="0">
              <View gap={6} paddingTop={4}>
                <View borderRadius="large" overflow="hidden">
                  <NextImage
                    src={HeroImage}
                    width={548}
                    priority
                    alt="Discarded christmas tree"
                  />
                </View>
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
            <Tabs.Panel value="1">
              <View gap={6} paddingTop={4}>
                {feed.map(
                  ({ id, src, claimant, location, date, points }, index) => (
                    <Card key={id} padding={0}>
                      <Overlay
                        position="bottom"
                        backgroundSlot={
                          <AspectRatio ratio={1}>
                            <NextImage
                              src={src}
                              width={548}
                              height={548}
                              alt="Discarded christmas tree"
                              priority={index <= 1}
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
                                {players[claimant].name} got{" "}
                                {pointsText(points)}
                              </Text>
                            </View>
                            <Text color="neutral-faded">
                              Harvested on {date}
                            </Text>
                          </View.Item>
                        </View>
                      </ActionBar>
                    </Card>
                  )
                )}
              </View>
            </Tabs.Panel>
            <Tabs.Panel value="2">
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
