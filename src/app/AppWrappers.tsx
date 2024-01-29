'use client';
import React, { ReactNode } from 'react';
import { getSession, SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const Main = ({ children }) => <React.Fragment>{children}</React.Fragment>;

export interface AppWrappersProps {
  children: React.ReactNode
  session: Session
}
// AppWrappers.getInitialProps = async (context) => {
//   const { ctx } = context;
//   const session = await getSession(ctx);
//   return {
//     session,
//   };
// };

export default function AppWrappers({ children,session }: AppWrappersProps) {
  return (
  <Main>
  <SessionProvider baseUrl={process.env.NEXTAUTH_URL} refetchInterval={60 * 5} session={session} >
    {children}
  </SessionProvider>
  </Main>
  )

}
