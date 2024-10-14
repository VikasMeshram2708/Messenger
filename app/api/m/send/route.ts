import { sendMessageSchema } from "@/app/models/MessageSchema";
import { DbConfig } from "@/lib/DbConfig";
import { ErrorHandler } from "@/lib/ErrorHandler";
import { getTokenData } from "@/lib/GetTokenData";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const token = await getTokenData(request);

    const parsedRes = sendMessageSchema.safeParse(reqBody);
    if (!parsedRes.success) {
      throw parsedRes.error;
    }
    const parsedData = parsedRes.data;

    await DbConfig();

    await prismaInstance.post.create({
      data: {
        content: parsedData?.content,
        postImg: parsedData?.postImg as string,
        postVideo: parsedData?.postVideo as string,
        User: {
          connect: {
            id: token?.id as number,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: "Posted",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(request, error as Error);
  }
};
