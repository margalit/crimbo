import { Reshaped } from "reshaped";
import "reshaped/themes/reshaped/theme.css";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Reshaped theme="reshaped" defaultColorMode="dark">
        <Component {...pageProps} />
      </Reshaped>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
