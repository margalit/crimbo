import "reshaped/themes/reshaped/theme.css";
import { Icon, Reshaped } from "reshaped";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { Container, View, Text } from "reshaped";
import { SWRConfig } from "swr/_internal";
import type { Data } from ".";
import Navigation from "../components/Navigation";
import { LogoIcon } from "../icons";
import { Coffin } from "../icons";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
  fallback: Data;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <SWRConfig value={{ fallback: pageProps.fallback }}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Reshaped theme="reshaped" defaultColorMode="dark">
          <Container width="580px">
            <View gap={4} paddingTop={4} paddingBottom={12}>
              <View align="center" direction="row">
                <View.Item grow>
                  <Icon size={5} svg={<LogoIcon />} />
                </View.Item>
                <Navigation />
              </View>
              <Component {...pageProps} />
              <View paddingTop={4} gap={4} align="center">
                <Icon autoWidth size={24} svg={<Coffin />} />
                <View gap={1}>
                  <Text variant="body-medium-1" align="center">
                    A silly game by{" "}
                    <a href="https://margalit.com.au">Sam Margalit</a> and{" "}
                    <a href="https://ruby-brown.com">Ruby Brown</a>
                  </Text>
                  <Text variant="body-medium-1" align="center">
                    Logo and illustrations by{" "}
                    <a href="https://www.instagram.com/chrisvernon_/">
                      Chris Vernon
                    </a>
                  </Text>
                </View>
              </View>
            </View>
          </Container>
        </Reshaped>
      </SessionContextProvider>
    </SWRConfig>
  );
}
export default MyApp;
