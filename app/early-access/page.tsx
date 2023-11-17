import { Section } from "@/components/ui/section";
import MainPageLink from "../../components/ui/main-page-link";
import EarlyAccessHeaders from "./components/early-access-headers";
import EarlyAccessForm from "./components/early-access-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/db/queries";

const EarlyAccessPage = async () => {

    const session = await getServerSession();
    if (!session || !session.user) redirect("/auth/signin");
  
    const email = session.user.email;
    if (!email) redirect("/");
  
    const userQuery = await getUserByEmail(email);
    if (userQuery?.length !== 1) redirect("/");

    return (
        <Section className="flex flex-col items-center justify-center">
            <MainPageLink />
            <EarlyAccessHeaders />
            <EarlyAccessForm userId={userQuery[0].id} />
        </Section>
    )
};

export default EarlyAccessPage;