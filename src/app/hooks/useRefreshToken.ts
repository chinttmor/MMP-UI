// hooks/auth/useRefreshToken.ts
import instance from 'config/axios.config';
import { signIn, useSession } from 'next-auth/react';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    // Gọi tới backend để lấy access token mới và trả về
    const res = await instance.post('/auth/acstoken', {
      refreshToken: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.tokens.accessToken;
    else signIn();
  };
  return refreshToken;
};
