import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
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
        <meta name="og:image" content="https://crimbo.app/hero.png" />
      </Head>
      <body data-rs-theme="reshaped-dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
