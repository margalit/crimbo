import { Avatar, View, Text, Card } from "reshaped";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

const Leaderboard = ({ totals, players }) => (
  <View gap={4} paddingTop={4}>
    {getEntries(totals)
      .sort(([, a], [, b]) => (a.points > b.points ? -1 : 1))
      .map(([id, totals]) => (
        <Card key={id}>
          <View direction="row" align="center" gap={4}>
            <Avatar src={players[id].image} size={12} />
            <View>
              <Text variant="body-strong-1">{players[id].name}</Text>
              <Text variant="body-1" color="neutral-faded">
                {totals.points === 1 ? "1 point" : `${totals.points} points`}
                {" from "}
                {totals.harvests === 1
                  ? "1 harvest"
                  : `${totals.harvests} harvests`}
              </Text>
            </View>
          </View>
        </Card>
      ))}
  </View>
);

export default Leaderboard;
