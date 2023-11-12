import { PricingPlan } from "@/lib/types";
import PlanCard from "./plan-card";

type PlansShowcaseProps = {
  userId: number;
  isSignedIn: boolean;
  plansData: PricingPlan[];
};

const PlansShowcase = (props: PlansShowcaseProps) => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-24 lg:mt-16 mt-10">
      {props.plansData.map((plan, index) => (
        <PlanCard
          key={index}
          title={plan.name}
          preHeader={plan.preHeader as string}
          credits={plan.credits}
          price={plan.price}
          features={plan.features}
          userId={props.userId}
          isSignedIn={props.isSignedIn}
        />
      ))}
    </div>
  );
};

export default PlansShowcase;
