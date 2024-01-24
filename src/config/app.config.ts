export const AppConfig = {
  apiBase: process.env.NEXT_PUBLIC_API_URL,
  enableApiMockup: !!parseInt(process.env.NEXT_PUBLIC_ENABLE_API_MOCKUP || '0'),
};
