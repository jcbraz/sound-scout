"use client";

import { useChat } from "ai/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { generatePlaylist } from "@/lib/actions";
import { useState } from "react";

type ResultsShowcaseProps = {
  user_prompt: string;
};

const ResultsShowcase = (props: ResultsShowcaseProps) => {
  const toast = useToast();
  const { messages, isLoading, setMessages, handleSubmit } = useChat({
    api: "/api/chat",
    initialInput: props.user_prompt,
    body: {
      prompt: props.user_prompt,
    },
    onResponse: (res) => {
      if (res.status === 429)
        toast.toast({
          title: "Too many requests",
          description:
            "Our friends at OpenAI are getting a lot of requests right now. Please try again later.",
        });
    },
    onError: (err) => {
      toast.toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const [url, setUrl] = useState<string | null>(null);
  console.log(url);

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
          disabled={isLoading}
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
                <p key={i} className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-c_grey to-neutral-400 italic">
                  {line}
                </p>
              ))
          )}
        </div>
      </form>
      {messages && (
        <form action={async () => {
          const content = messages.map((message) => message.content).join("\n");
          console.log(content);
          const url = (await generatePlaylist(content, props.user_prompt)).url;
          setUrl(url);

        }} className="mt-14">
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
