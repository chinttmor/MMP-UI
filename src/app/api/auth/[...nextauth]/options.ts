import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { NextAuthOptions, User } from 'next-auth';
// import User from "@/app/(models)/User";
// import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email:',
          type: 'email',
          placeholder: 'your-email',
        },
        password: {
          label: 'password:',
          type: 'password',
          placeholder: 'your-password',
        },
      },
      async authorize(credentials, req) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        let res = response.data;
        if (res.statusCode === 201) {
          // Any object returned will be saved in `user` property of the JWT
          let user: User = {
            ...res.data,
          };
          console.log('user', user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.zone = user.zone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.zone = token.zone;
      return session;
    },
  },
};
