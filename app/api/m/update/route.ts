import { updatePostSchema } from "@/app/models/MessageSchema";
import { DbConfig } from "@/lib/DbConfig";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const parsedRes = updatePostSchema.safeParse(reqBody);
    if (!parsedRes.success) {
      throw parsedRes.error;
    }

    await DbConfig();

    const parsedData = parsedRes.data;

    await prismaInstance.post.update({
      where: {
        id: parsedData?.postId as number,
      },
      data: {
        content: parsedData?.content,
        postImg: parsedData?.postImg as string,
        postVideo: parsedData?.postVideo as string,
      },
    });

    return NextResponse.json(
      {
        message: "Updated",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
