import { Section } from "@/components/ui/section";
import WorkflowStep from "./worflow-step";

import step1image from "@/public/images/step1image.png";
import step2image from "@/public/images/step2image.png";
import step3image from "@/public/images/step3image.png";

const WorkflowShowcase = () => {
  return (
    <Section className="grid grid-rows-3 lg:gap-y-20">
      <WorkflowStep
        description="Introduce the playlist prompt. It's fully up to you in terms of detail."
        image={step1image.src}
        step={1}
        type="image"
      />
      <WorkflowStep
        description="Confirm the prompt and observe some of the potential tracks in your playlist."
        image={step2image.src}
        subdescription={{
          label:
            "Understand how we generate results and reach a consensus between AI and Spotify infrastructure.",
          href: "/prompt-info",
        }}
        step={2}
        type="image"
        reversed
      />
      <WorkflowStep
        description="View it on Spotify and start listening. Great success!!"
        image={step3image.src}
        step={3}
        type="image"
      />
    </Section>
  );
};

export default WorkflowShowcase;
