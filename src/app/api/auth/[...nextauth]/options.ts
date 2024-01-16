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
        let res: Success;
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
        res = response.data;
        if (res.statusCode === 201) {
          // Any object returned will be saved in `user` property of the JWT
          let user: User = {
            ...res.data,
          };
          console.log("user", user);
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user && account) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  //   pages: {
  //     signIn: "/login",
  //     signOut: "/login",
  //   },
};
