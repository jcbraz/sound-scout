"use client";

import { useChat } from "ai/react";
import { useToast } from "@/components/ui/use-toast";
import { generatePlaylist } from "@/lib/actions";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { addPlaylist, spendCredit } from "@/db/queries";
import { signOut } from "next-auth/react";
import SuggestionsSubmitButton from "./suggestions-submit-button";
import URLSubmitButton from "./url-submit-button";
import SpotifyRedirectButton from "./spotify-redirect-button";

type ResultsShowcaseProps = {
  user_credits: number | undefined;
  user_id: number;
  user_prompt: string;
};

const ResultsShowcase = (props: ResultsShowcaseProps) => {
  const [isSuggestionsSubmitted, setSubmitState] = useState<boolean>(false);
  console.log(isSuggestionsSubmitted);
  const [url, setUrl] = useState<string | null>(null);
  const toast = useToast();

  const { messages, isLoading, handleSubmit } = useChat({
    api: "/api/chat",
    initialInput: props.user_prompt,
    body: {
      prompt: props.user_prompt,
    },
    onResponse: (res) => {
      if (res.status === 429)
        toast.toast({
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          title: "Too many requests",
          description:
            "Our friends at OpenAI are getting a lot of requests at the moment. Please try again later.",
        });
      else {
        setSubmitState(true);
        spendCredit(props.user_id, props.user_credits as number)
          .then((res) => {
            if (res === false) {
              toast.toast({
                action: (
                  <ToastAction altText="Dismiss" onClick={() => signOut()}>
                    Sign Out
                  </ToastAction>
                ),
                title: "Error",
                description:
                  "Something went wrong from our side. Please sign out and try again.",
              });
            }
          })
          .catch((err) => {
            toast.toast({
              action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
              title: "Error",
              description: err.message,
              variant: "destructive",
            });
          });
      }
    },
    onError: (err) => {
      toast.toast({
        action: (
          <ToastAction altText="Dismiss" onClick={() => signOut()}>
            Sign Out
          </ToastAction>
        ),
        title: "Error",
        description:
          "Something went wrong from our side. Please sign out an try again" +
          err.message,
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <form
        className="flex flex-col justify-center items-center space-y-10 max-w-xl"
        onSubmit={handleSubmit}
      >
        {!isSuggestionsSubmitted && (
          <>
            <SuggestionsSubmitButton isLoading={isLoading} />
            <h6 className="text-xs italic max-w-sm text-center">
              <span className="font-bold">WARNING!</span> By submitting the
              request, 1 credit will be used. If the request does not work, the
              credit will be returned.
            </h6>
          </>
        )}
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-y-2 space-y-4 lg:gap-x-10 lg:grid-flow-row lg:text-justify text-center lg:max-w-2xl max-w-sm mt-14">
          {messages.map((message) =>
            message.content
              .split("\n")
              .slice(0, -1)
              .map((line, i) => (
                <p
                  key={i}
                  className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-c_grey to-neutral-400 italic"
                >
                  {line}
                </p>
              ))
          )}
        </div>
      </form>
      {messages && isSuggestionsSubmitted && (
        <form
          action={async () => {
            const content = messages
              .map((message) => message.content)
              .join("\n");
            const givenURL = (
              await generatePlaylist(content, props.user_prompt)
            ).url;
            if (givenURL) {
              setUrl(givenURL);
              addPlaylist({
                id: givenURL.replace("https://open.spotify.com/playlist/", ""),
                user_id: props.user_id,
                prompt: props.user_prompt,
                suggestion: content,
              }).catch((err) => {
                toast.toast({
                  action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
                  title: "Some trouble in our side",
                  description: err.message,
                  variant: "destructive",
                });
              });
            }
          }}
          className="mt-14"
        >
          <h4 className="italic lg:text-lg text-base">
            Looks good. Let's get you access to the playlist.
          </h4>
          {url ? <SpotifyRedirectButton url={url} /> : <URLSubmitButton />}
        </form>
      )}
    </>
  );
};

export default ResultsShowcase;
