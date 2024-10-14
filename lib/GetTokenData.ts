import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const getTokenData = async (request: NextRequest) => {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    return token;
  } catch (error) {
    throw new Error(`Something went wrong. Failed to get Token Data :${error}`);
  }
};
