import { type NextPage } from "next";
import { Container, View, Text, Tabs } from "reshaped";
import {
  TrophyIcon,
  CameraIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";
import About from "../components/About";
import Harvests from "../components/Harvests";
import Leaderboard from "../components/Leaderboard";

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

const harvests = [
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

const totals = harvests.reduce(
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
              <About />
            </Tabs.Panel>
            <Tabs.Panel value="1">
              <Harvests harvests={harvests} players={players} />
            </Tabs.Panel>
            <Tabs.Panel value="2">
              <Leaderboard totals={totals} players={players} />
            </Tabs.Panel>
          </Tabs>
        </View>
      </Container>
    </>
  );
};

export default Home;
