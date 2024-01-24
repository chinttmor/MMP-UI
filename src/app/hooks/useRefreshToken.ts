// hooks/auth/useRefreshToken.ts
import instance from 'config/axios.config';
import { signIn, useSession } from 'next-auth/react';
export const useRefreshToken = () => {
  const { data: session } = useSession();
  console.log('rf', session?.user.refreshToken);
  const refreshToken = async () => {
    // Gọi tới backend để lấy access token mới và trả về
    const res = await instance.get('auth/acstoken', {
      headers: {
        Authorization: `Bearer ${session?.user.refreshToken}`,
      },
    });
    console.log('rf res', res);
    if (session) session.user.accessToken = res.data.data.accessToken;
    else signIn();
  };
  return refreshToken;
};
