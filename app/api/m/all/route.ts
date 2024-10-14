import { DbConfig } from "@/lib/DbConfig";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { getTokenData } from "@/lib/GetTokenData";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const token = await getTokenData(request);
    console.log("t", token);
    await DbConfig();

    const posts = await prismaInstance.post.findMany({
      where: {
        userId: token?.id as number,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json(
      {
        posts,
      },
      { status: 201 }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
