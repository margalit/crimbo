import { View, Icon, Text, Accordion } from "reshaped";
import { Coffin } from "../(components)/Icons";

const FAQ_CONTENT = [
  {
    question: "What on earth is this?",
    answer:
      "A game where people compete by taking pictures of thrown out Christmas trees. Photos are called 'harvests' and are worth points. The person with the most points by Christmas wins.",
  },
  {
    question: "How do the points work?",
    answer:
      "You get an extra point for every month past December that the tree is out. So a tree thrown out in January is worth 1 point, February is worth 2 points, etc. You get ½ the amount of points for a synthetic tree.",
  },
  {
    question: "What are the rules?",
    answer:
      "Trees must be unique and they must be on the way out, not the way in.",
  },
  {
    question: "Can I play?",
    answer: "Absolutely! Click post to upload your harvests.",
  },
  {
    question: "Who made this?",
    answer:
      "Me (Sam) and my girlfriend (Ruby) made up this game sometime around 2019. Our neighbours Jo and Chris started playing too so we decided to make a website for it.",
  },
  {
    question: "Who did the illustrations?",
    answer: "Our neighbour Chris, you can find him on Instagram @chrisvernon_",
  },
  {
    question: "When does the game start?",
    answer: "Boxing day each year.",
  },

  {
    question: "Do trees need to be conifers?",
    answer:
      "Not necessarily, if the tree has clearly performed festive duties (eg. signs of tinsel) it counts.",
  },
  {
    question: "How do you enforce the rules?",
    answer:
      "We rely on the honour system. If you cheat, you only cheat yourself.",
  },
  {
    question: "Will anyone ever catch up to Tristan?",
    answer: "Probably not, but it's fun to try.",
  },
  {
    question: "I found a bug!",
    answer: "Please send me an email sam@margalit.com.au",
  },
];

export default function Faq() {
  return (
    <View gap={3} divided>
      <View align="center" padding={12}>
        <View align="center" position="relative">
          <View
            borderRadius="circular"
            aspectRatio={1}
            backgroundColor="primary-faded"
            position="absolute"
            inset={-8}
          />
          <View position="relative">
            <Icon color="primary" svg={Coffin} size={32} />
          </View>
        </View>
      </View>
      {FAQ_CONTENT.map(({ question, answer }) => (
        <Accordion key={question}>
          <Accordion.Trigger>
            <Text variant="featured-3" weight="medium">
              {question}
            </Text>
          </Accordion.Trigger>
          <Accordion.Content>
            <Text variant="body-2" color="neutral-faded">
              {answer}
            </Text>
          </Accordion.Content>
        </Accordion>
      ))}
    </View>
  );
}
