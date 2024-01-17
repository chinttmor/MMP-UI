import CredentialsProvider from "next-auth/providers/credentials";
import { Success } from "@/type/res.type";
import axios from "axios";
import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
// import User from "@/app/(models)/User";
// import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const response = await axios.post(
          `http://localhost:8000/v1/auth/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let res = response.data;
        if (res.statusCode === 201) {
          // Any object returned will be saved in `user` property of the JWT
          let user: User = {
            ...res.data,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      session;
      return session;
    },
  },
};
