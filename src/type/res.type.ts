export type Success = {
  type: "success";
  statusCode: number;
  data: {
    id: string;
    name: string;
    email: string;
    zone: string;
    phone: string;
    accessToken: string;
    refreshToken: string;
  };
};
