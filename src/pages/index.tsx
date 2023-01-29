import { type GetServerSideProps, type NextPage } from "next";
import { Container, View, Text, Tabs } from "reshaped";
import {
  TrophyIcon,
  CameraIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";
import About from "../components/About";
import Feed from "../components/Feed";
import Leaderboard from "../components/Leaderboard";
import Navigation from "../components/Navigation";
import { supabase } from "../lib/supabaseClient";
import type { Database } from "../types/supabase";

export type FeedData = Database["public"]["Views"]["feed"]["Row"][];
export type LeaderboardData =
  Database["public"]["Views"]["leaderboard"]["Row"][];

const Home: NextPage<{
  feed: FeedData;
  leaderboard: LeaderboardData;
}> = ({ feed, leaderboard }) => {
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
              <Feed feed={feed} />
            </Tabs.Panel>
            <Tabs.Panel value="2">
              <Leaderboard leaderboard={leaderboard} />
            </Tabs.Panel>
          </Tabs>
        </View>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: feed } = await supabase.from("feed").select("*");
  const { data: leaderboard } = await supabase.from("leaderboard").select("*");

  console.log(leaderboard);

  if (!feed || !leaderboard) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      feed,
      leaderboard,
    },
  };
};

export default Home;
