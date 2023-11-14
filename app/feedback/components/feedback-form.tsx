"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addFeedback } from "@/db/queries";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { SubmittionState } from "@/lib/types";

type FeedbackFormProps = {
  userId: number;
};

const FeedbackForm = (props: FeedbackFormProps) => {
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
        const title = formData.get("title");
        const description = formData.get("description");

        const feedbackInsertionResponse = await addFeedback({
          title: title as string,
          description: description as string,
          user_id: props.userId,
        });

        if (feedbackInsertionResponse) setSubmitted("done");
        else setSubmitted("error");
      }}
      className="flex flex-col justify-center items-center w-full space-y-10 mt-10 max-w-4xl"
    >
      <Input
        className="bg-neutral-900 border-2 border-c_grey"
        name="title"
        lang="en"
        placeholder="Title"
      />
      <Textarea
        className="bg-neutral-900 border-2 border-c_grey"
        name="description"
        lang="en"
        placeholder="Description"
      />
      <Button variant="secondary" type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default FeedbackForm;
