import { Separator } from "@/components/ui/separator";
import { SelectFeatures } from "@/db/schema";
import { Check, Minus } from "lucide-react";
import CheckoutButton from "./checkout-button";

type FeatureDisplayProps = {
  feature: string;
  included: boolean;
};

type PlanCardProps = {
  title: string;
  preHeader: string;
  credits: number;
  price: string;
  features: SelectFeatures[];
  userId: number;
  isSignedIn: boolean;
};

const FeatureDisplay = (props: FeatureDisplayProps) => {
  return (
    <div className="flex lg:space-x-4 space-x-1 text-start">
      {props.included ? (
        <Check className="w-4 h-4" />
      ) : (
        <Minus className="w-4 h-4" />
      )}
      <h5 className="text-xs">{props.feature}</h5>
    </div>
  );
};

const PlanCard = (props: PlanCardProps) => {
  return (
    <div className="relative rounded-2xl bg-black shadow-lg border-2 border-c_green shadow-black">
      <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-c_green px-3 py-2 text-sm font-medium text-white text-center">
        {props.title}
      </div>
      <div className="p-5 pt-10 text-center">
        <h6 className="text-xs font-thin max-w-xs">{props.preHeader}</h6>
        <h2 className="lg:text-6xl text-4xl font-semibold pt-4">
          {props.credits}
        </h2>
        <h5 className="italic lg:text-sm text-xs pt-4">credits</h5>
        <Separator className="mt-4" />
        <h3 className="lg:text-2xl text-base font-semibold pt-4">
          {props.price + "€"}
        </h3>
        <h5 className="text-xs italic">1 time payment</h5>
        <Separator className="mt-4" />
        <div className="pt-4 space-y-4">
          {props.features.map((feature, index) => (
            <FeatureDisplay
              key={index}
              feature={feature.description}
              included={feature.included}
            />
          ))}
        </div>
        <CheckoutButton isSignedIn={props.isSignedIn} />
      </div>
    </div>
  );
};

export default PlanCard;
