import authOptions from "./authOptions";
import NextAuth from "next-auth";

export const runtime = 'edge';

const GET = NextAuth(authOptions);
const POST = NextAuth(authOptions);

export { GET, POST };