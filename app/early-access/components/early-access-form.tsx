"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addFeedback } from "@/db/queries";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { SubmittionState } from "@/lib/types";

type EarlyAccessForm = {
  userId: number;
};

const EarlyAccessForm = (props: EarlyAccessForm) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState<SubmittionState>("idle");

  useEffect(() => {
    if (submitted === "done") {
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback!",
        duration: 7000,
        className: "bg-c_green text-c_green",
        variant: "default",
      });
    }

    if (submitted === "error") {
      toast({
        title: "Error submitting feedback!",
        description: "Please try again later.",
        duration: 7000,
        variant: "destructive",
      });
    }
  }, [submitted]);

  return (
    <form
      action={async (formData) => {
        const description = formData.get("description");

        const feedbackInsertionResponse = await addFeedback({
          title: "early-access",
          description: description as string,
          user_id: props.userId,
        });

        if (feedbackInsertionResponse) setSubmitted("done");
        else setSubmitted("error");
      }}
      className="flex flex-col justify-center items-center w-full space-y-10 mt-10 max-w-4xl"
    >
      <Textarea
        className="bg-neutral-900 border-2 border-c_grey lg:text-base text-xs"
        name="description"
        lang="en"
        placeholder="Write some Feedback. What do you like? What do you dislike?"
      />
      <Button variant="secondary" type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default EarlyAccessForm;
