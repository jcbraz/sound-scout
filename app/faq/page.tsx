import { Section } from "@/components/ui/section";
import QuestionAnsnwer from "./components/question-answer";
import MainPageLink from "@/components/ui/main-page-link";

const qaPairs = [
  {
    question:
      "Why some of the tracks shown during the generation are not present in the actual Spotify Playlist?",
    answer:
      "This may vary in different factors. Some of the most common reasons are that some tracks returned by the playlist engine may not be avaliable on Spotify or the response from Spotify may not be sucessful for some specific tracks.",
  },
  {
    question:
      "Some additional tracks are added to the playlist, which are not shown during the generation. Why?",
    answer:
      "The engine checks if the returned tracks respect certain requirements based on your prompt. If the requirements are not met, the engine will try to find the closest tracks that meet the requirements. This may result in some additional tracks being added to the playlist.",
  },
  {
    question: "Any other questions or suggestions?",
    answer: "Feel free to contact us and give some feedback!",
    buttonHref: "/feedback",
    buttonText: "Contact Us",
  }
];

const FAQPage = () => {
  return (
    <Section className="space-y-10">
      <MainPageLink />
      <h1 className="lg:text-5xl text-2xl font-normal italic">
        Confused on how playlists are generated?
      </h1>
      <h3 className="text-xl font-normal">Here's a quick rundown:</h3>
      {qaPairs.map((qaPair, i) => (
        <QuestionAnsnwer
          key={i}
          question={qaPair.question}
          answer={qaPair.answer}
          buttonProps={{
            href: qaPair.buttonHref ? qaPair.buttonHref : "",
            text: qaPair.buttonText ? qaPair.buttonText : "",
          }}
        />
      ))}
    </Section>
  );
};

export default FAQPage;
