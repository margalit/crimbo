import { type GetStaticProps, type NextPage } from "next";
import { Text, Tabs } from "reshaped";
import {
  TrophyIcon,
  CameraIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import About from "../components/About";
import Feed from "../components/Feed";
import Leaderboard from "../components/Leaderboard";
import { supabase } from "../lib/supabaseClient";
import type { Database } from "../types/supabase";
import Head from "next/head";

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
      </Head>
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: feed } = await supabase.from("feed").select("*");
  const { data: leaderboard } = await supabase.from("leaderboard").select("*");

  if (!(feed && leaderboard)) {
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
