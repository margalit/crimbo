import "reshaped/themes/reshaped/theme.css";

import { Container, Reshaped, View } from "reshaped";
import Navigation from "./(components)/Navigation";
import Header from "./(components)/Header";

export const metadata = {
  title: "crimbo",
  description: "A silly, festive game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-rs-theme="reshaped" data-rs-color-mode="dark">
      <body>
        <Reshaped theme="reshaped" defaultColorMode="dark">
          <Header />
          <View paddingBlock={20}>
            <Container width={128}>{children}</Container>
          </View>
          <Navigation />
        </Reshaped>
      </body>
    </html>
  );
}
