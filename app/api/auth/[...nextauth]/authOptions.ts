import spotifyProfile, { refreshAccessToken } from "./SpotifyProfile";
import { Account, AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export type AuthUser = {
  name: string;
  email: string;
  image: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id: string;
};

const authOptions: AuthOptions = {
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 60, // 1hr
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {

      const isNewSession = Boolean(account);
      if (isNewSession) {
        return {
          ...token,
          access_token: account?.access_token,
          token_type: account?.token_type,
          expires_at: (Date.now() / 1000) + 3600,
          expires_in: 3600,
          refresh_token: account?.refresh_token,
          scope: account?.scope,
          id: account?.providerAccountId,
        };
      }

      const isTokenExpired =
        typeof token.expires_at === "number" &&
        Date.now() < token.expires_at * 1000;

      if (!isTokenExpired) return token;

      const refreshedToken = await refreshAccessToken(token);

      return refreshedToken;
    },
    session({ session, token }: { session: any; token: any }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: (Date.now() / 1000) + 3600,
        expires_in: 3600,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      };
      session.user = user;
      session.error = token.error;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;