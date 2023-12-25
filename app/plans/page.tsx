import AuthenticatedDropdownMenu from "@/app/menu/components/authenticated-dropdown-menu";
import { Section } from "@/components/ui/section";
import { getServerSession } from "next-auth";
import MainPageLink from "../../components/ui/main-page-link";
import PlansShowcase from "./components/plans-showcase";
import { getPlans } from "@/db/queries";
import PlansHeaders from "./components/plans-headers";
import { redirect } from "next/navigation";

type SearchParamsType = {
  userId: number;
};

const PlansPage = async ({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) => {
  const session = await getServerSession();
  const isUserSignedIn = !!session?.user;

  if (!isUserSignedIn) redirect("/auth/signin");
  else redirect("/");

  // const { userId } = searchParams;

  // const plansData = await getPlans();
  // if (!plansData || plansData.length === 0) {
  //   return (
  //     <Section className="flex flex-col justify-center items-center lg:h-full">
  //       <MainPageLink />
  //       <AuthenticatedDropdownMenu session={session} />
  //       <p className="text-2xl font-semibold text-c_grey">
  //         Seems like there's something wrong from our side. Please try again
  //         later.
  //       </p>
  //     </Section>
  //   );
  // }

  // return (
  //   <Section className="flex flex-col items-center lg:h-full">
  //     <MainPageLink />
  //     <AuthenticatedDropdownMenu session={session} />
  //     <PlansHeaders />
  //     <PlansShowcase
  //       plansData={plansData}
  //       isSignedIn={isUserSignedIn}
  //       userId={userId}
  //     />
  //   </Section>
  // );
};

export default PlansPage;
