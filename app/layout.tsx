import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import "@/app/globals.css";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { getServerSession } from "next-auth";
import { Space_Grotesk } from "next/font/google";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html className="bg-neutral-900" lang="en">
      <AuthSessionProvider session={session}>
        <body className={space_grotesk.className}>{children}</body>
      </AuthSessionProvider>
    </html>
  );
}
