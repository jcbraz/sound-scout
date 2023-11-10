"use client";

import { useChat } from "ai/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { generatePlaylist } from "@/lib/actions";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { spendCredit, updatePlaylistPrompt } from "@/db/queries";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

type ResultsShowcaseProps = {
  user_credits: number | undefined;
  user_id: number;
  user_prompt: string;
  playlist_id: number;
};

const ResultsShowcase = (props: ResultsShowcaseProps) => {
  const [url, setUrl] = useState<string | null>(null);
  const toast = useToast();
  let disabledFlag: boolean = false;
  if (props.user_credits === undefined) {
    disabledFlag = true;
    toast.toast({
      action: (
        <ToastAction onClick={() => signOut()} altText="Dismiss">
          Sign Out
        </ToastAction>
      ),
      title: "Error",
      description:
        "Something went wrong from our side. Please sign out an try again",
      variant: "destructive",
    });
  } else if (props.user_credits <= 0) redirect("/plans");

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
        disabledFlag = true;
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
        updatePlaylistPrompt(props.playlist_id, props.user_prompt)
          .then((res) => {
            if (res === false) {
              throw new Error("Something went wrong from our side.");
            }
          })
          .catch((err) => {
            toast.toast({
              action: (
                <ToastAction altText="Dismiss" onClick={() => signOut()}>
                  Sign Out
                </ToastAction>
              ),
              title: "Error",
              description:
                "Something went wrong from our side. Please sign out and try again." +
                err.message,
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
        <Button
          variant="highlight"
          className="w-full max-w-2xl mt-10 uppercase italic"
          type="submit"
          disabled={isLoading || disabledFlag}
        >
          {isLoading ? (
            <Icons.spinner className="w-6 h-6 animate-spin" />
          ) : (
            "Generate Playlist"
          )}
        </Button>
        <h6 className="text-xs italic max-w-sm text-center">
          <span className="font-bold">WARNING!</span> By submitting the request,
          1 credit will be used. If the request does not work, the credit will
          be returned.
        </h6>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-y-2 space-y-4 lg:gap-x-10 lg:grid-flow-row lg:text-justify text-center lg:max-w-2xl max-w-sm">
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
      {messages && (
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
            }
          }}
          className="mt-14"
        >
          <h4 className="italic lg:text-lg text-base">
            Looks good. Let's get you access to the playlist.
          </h4>
          <Button
            variant="secondary"
            className="w-full max-w-2xl mt-10 uppercase italic"
            type="submit"
            disabled={url !== null || isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="w-6 h-6 animate-spin" />
            ) : (
              "Get It On Spotify"
            )}
          </Button>
        </form>
      )}
    </>
  );
};

export default ResultsShowcase;
