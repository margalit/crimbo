import { Avatar, View, Text, Card } from "reshaped";
import type { LeaderboardData } from "../pages";

const Leaderboard = ({ leaderboard }: { leaderboard: LeaderboardData }) => (
  <View gap={4} paddingTop={4}>
    {leaderboard.map(({ uuid, image, name, points, harvests }) => (
      <Card key={uuid}>
        <View direction="row" align="center" gap={4}>
          <Avatar src={image!} size={12} />
          <View>
            <Text variant="body-strong-1">{name}</Text>
            <Text variant="body-1" color="neutral-faded">
              {points === 1 ? "1 point" : `${points!} points`}
              {" from "}
              {harvests === 1 ? "1 harvest" : `${harvests!} harvests`}
            </Text>
          </View>
        </View>
      </Card>
    ))}
  </View>
);

export default Leaderboard;
