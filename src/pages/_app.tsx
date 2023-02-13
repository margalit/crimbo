import "reshaped/themes/reshaped/theme.css";
import { Reshaped } from "reshaped";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";

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
        <Component {...pageProps} />
      </Reshaped>
    </SessionContextProvider>
  );
}
export default MyApp;
