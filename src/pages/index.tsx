import { type GetServerSideProps, type NextPage } from "next";
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
import useSWR from "swr";

export type FeedData = Database["public"]["Views"]["feed"]["Row"][];
export type LeaderboardData =
  Database["public"]["Views"]["leaderboard"]["Row"][];

export interface Data {
  feed: FeedData;
  leaderboard: LeaderboardData;
}

const Home: NextPage<Data> = () => {
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
          <Feed />
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Leaderboard />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export async function getData() {
  const { data: feed } = await supabase.from("feed").select("*");
  const { data: leaderboard } = await supabase.from("leaderboard").select("*");
  return {
    feed,
    leaderboard,
  };
}

export const useData = () => useSWR("data", getData);

export const getStaticProps: GetServerSideProps = async () => {
  const data = await getData();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fallback: {
        data,
      },
    },
  };
};

export default Home;
