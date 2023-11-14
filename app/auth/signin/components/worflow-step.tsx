"use client";

import MediaCard from "./media-card";
import { LinkingReference } from "@/lib/types";
import WorkflowStepDetails from "./workflow-step-details";
import { useBreakpoint } from "use-breakpoint";

type WorkflowStepProps = {
  description: string;
  subdescription?: LinkingReference;
  image: string;
  reversed?: boolean;
  step: number;
  type: "image" | "video";
};

const WorkflowStep = (props: WorkflowStepProps) => {
  const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "sm");
  const isMobile = breakpoint === "sm" || breakpoint === "md";

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-40 lg:gap-y-0 gap-y-10">
      {!props.reversed && (
        <>
          {isMobile ? (
            <>
              <WorkflowStepDetails
                description={props.description}
                step={props.step}
              />
              <MediaCard
                type={props.type}
                src={props.image}
                step={props.step}
              />
            </>
          ) : (
            <>
              <MediaCard
                type={props.type}
                src={props.image}
                step={props.step}
              />
              <WorkflowStepDetails
                description={props.description}
                step={props.step}
              />
            </>
          )}
        </>
      )}
      {props.reversed && (
        <>
          <WorkflowStepDetails
            description={props.description}
            step={props.step}
          />
          <MediaCard type={props.type} src={props.image} step={props.step} />
        </>
      )}
    </div>
  );
};

export default WorkflowStep;
