import { DbConfig } from "@/lib/DbConfig";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await DbConfig();

    const posts = await prismaInstance.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        content: true,
        User: {
          select: {
            id: true,
            avatar: true,
            createdAt: true,
            email: true,
            post: true,
            updatedAt: true,
            username: true,
          },
        },
        id: true,
        createdAt: true,
        postImg: true,
        postVideo: true,
        updatedAt: true,
        userId: true,
      },
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
