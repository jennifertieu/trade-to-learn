import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongoClientPromise from "@/client/MongoDBClient";

export const authOptions = {
  adapter: MongoDBAdapter(mongoClientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
    // error: "/auth/error",
  },
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user,
      };
    },
  },
};

export default NextAuth(authOptions);
