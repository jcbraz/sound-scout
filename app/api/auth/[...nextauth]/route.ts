import authOptions from "./authOptions";
import NextAuth from "next-auth";

const GET = NextAuth(authOptions);
const POST = NextAuth(authOptions);

export { GET, POST };