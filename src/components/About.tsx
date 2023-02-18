import { View, Text, AspectRatio } from "reshaped";
import NextImage from "next/image";
import HeroImage from "/public/hero.png";

const About = () => (
  <View gap={6} paddingTop={4}>
    <View borderRadius="large" overflow="hidden">
      <AspectRatio ratio={16 / 9}>
        <NextImage
          src={HeroImage}
          width={548}
          priority
          alt="Discarded christmas tree"
          style={{ height: "auto" }}
        />
      </AspectRatio>
    </View>
    <Text variant="title-3">
      Crimbo is a game where each player tries to take photos of discarded
      Christmas trees.
    </Text>
    <View gap={1}>
      <Text variant="title-3">Harvests</Text>
      <Text variant="body-1">
        Photos of trees are called ‘harvests’. Players receive more points later
        in the year as trees get rarer making it possible to win with just a few
        late harvests.
      </Text>
    </View>
    <View gap={1}>
      <Text variant="title-3">Rules</Text>
      <Text variant="body-1">
        <li>Harvests must be unique</li>
        <li>Trees must be on the way out, not the way in</li>
        <li>The leaderboard resets on Christmas Day</li>
      </Text>
    </View>
    <View gap={1}>
      <Text variant="title-3">Points</Text>
      <Text variant="body-1">
        <li>+1 point for each month past December</li>
        <li>1/2 points for synthetic trees</li>
        <li>5 points for harvests between Boxing Day and New Years</li>
      </Text>
    </View>
    <View gap={1}>
      <Text variant="title-3">Can I play?</Text>
      <Text variant="body-1">
        Absolutely! Sign in with your Google account and start harvesting.
      </Text>
    </View>
  </View>
);

export default About;
