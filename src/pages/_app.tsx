import "reshaped/themes/reshaped/theme.css";
import { Reshaped } from "reshaped";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { Container, View, Text } from "reshaped";
import Navigation from "../components/Navigation";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Reshaped theme="reshaped" defaultColorMode="dark">
        <Container width="580px">
          <View gap={4} paddingTop={4} paddingBottom={12}>
            <View align="center" direction="row">
              <View.Item grow>
                <Text variant="body-strong-1">Crimbo</Text>
              </View.Item>
              <Navigation />
            </View>
            <Component {...pageProps} />
          </View>
        </Container>
      </Reshaped>
    </SessionContextProvider>
  );
}
export default MyApp;
