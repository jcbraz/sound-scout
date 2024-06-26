import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import "@/app/globals.css";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/toaster";
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
        <body className={space_grotesk.className}>
          {children}
          <Toaster />
          <Footer session={session} />
        </body>
      </AuthSessionProvider>
    </html>
  );
}
