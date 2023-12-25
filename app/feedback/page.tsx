import { Section } from "@/components/ui/section";
import MainPageLink from "../../components/ui/main-page-link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/db/queries";
import FeedbackForm from "./components/feedback-form";

const FeedbackPage = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/auth/signin");

  const email = session.user.email;
  if (!email) redirect("/");

  const userQuery = await getUserByEmail(email);
  if (userQuery?.length !== 1) redirect("/");

  return (
    <Section className="flex flex-col justify-center items-center">
      <MainPageLink />
      <h2 className="lg:text-3xl text-xl italic">
        Having trouble? Please let us know!
      </h2>
      <FeedbackForm userId={userQuery[0].id} />
    </Section>
  );
};

export default FeedbackPage;
