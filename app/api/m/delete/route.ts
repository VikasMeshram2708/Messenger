import { deletePostSchema } from "@/app/models/MessageSchema";
import { DbConfig } from "@/lib/DbConfig";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const parsedRes = deletePostSchema.safeParse(reqBody);
    if (!parsedRes.success) {
      throw parsedRes.error;
    }

    await DbConfig();
    const parsedData = parsedRes.data;

    await prismaInstance.post.delete({
      where: {
        id: parsedData?.postId as number,
      },
    });

    return NextResponse.json(
      {
        message: "Post Deleted",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
