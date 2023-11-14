"use client";

import { LinkingReference } from "@/lib/types";
import Link from "next/link";

type WorkflowStepDetailsProps = {
  step: number;
  description: string;
  subdescription?: LinkingReference;
};

const WorkflowStepDetails = (props: WorkflowStepDetailsProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h3 className="italic lg:text-2xl text-lg font-semibold">
        Step {props.step}
      </h3>
      <p className="lg:text-base text-xs font-normal text-center max-w-sm">
        {props.description}
      </p>
      {props.subdescription && (
        <Link href={props.subdescription.href} target="_blank">
          <p className="text-xs font-thin text-center max-w-sm italic underline">
            {props.subdescription.label}
          </p>
        </Link>
      )}
    </div>
  );
};

export default WorkflowStepDetails;
