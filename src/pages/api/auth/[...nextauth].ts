import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongoClientPromise from "@/client/MongoDBClient";
import EmailProvider from "next-auth/providers/email";
import type { Session, User } from "next-auth";

export const authOptions = {
  adapter: MongoDBAdapter(mongoClientPromise),
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
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
    async session({ session, user }: { session: Session; user: User }) {
      return {
        ...session,
        user,
      };
    },
  },
};

export default NextAuth(authOptions);
