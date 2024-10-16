import { DbConfig } from "@/lib/DbConfig";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { getTokenData } from "@/lib/GetTokenData";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const token = await getTokenData(request);
    await DbConfig();

    const user = await prismaInstance.user.findFirst({
      where: {
        id: token?.id as number,
      },
    });
    console.log("fu", user);
    return NextResponse.json(
      {
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
