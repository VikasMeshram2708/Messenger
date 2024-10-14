/* eslint-disable @typescript-eslint/ban-ts-comment */
import { prismaInstance } from "@/lib/prismaInstance";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
const handler = NextAuth({
  pages: {
    signIn: "/u/login",
    newUser: "/u/signup",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        const res = await prismaInstance.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!res) {
          throw new Error("Invalid User");
        }

        // compare the hashed password
        const validPassword = await bcrypt.compare(
          String(credentials?.password),
          res?.password
        );

        if (!validPassword) {
          throw new Error("Invalid Credentials");
        }

        return {
          id: res?.id,
          avatar: res?.avatar,
          username: res?.username,
          email: res?.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        // @ts-ignore
        token.username = user?.username;
        token.email = user?.email;
        // @ts-ignore
        token.avatar = user?.avatar;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.username = token.username;
        // @ts-ignore
        session.user.email = token.email;
        // @ts-ignore
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60, // 1 hour
  },
});

export { handler as GET, handler as POST };
