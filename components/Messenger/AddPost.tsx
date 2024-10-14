/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { ImagePlay, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMessageSchema } from "@/app/models/MessageSchema";
import { z } from "zod";
import toast from "react-hot-toast";
import { useSendPostMutation } from "@/app/store/chat/chatSlice";

export default function AddPost() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
  });

  const [sendPost, { error, isLoading }] = useSendPostMutation();
  const onSubmit: SubmitHandler<z.infer<typeof sendMessageSchema>> = async (
    data
  ) => {
    console.log("Form submitted. Raw data:", data);
    try {
      const res = await sendPost(data);
      console.log("res", res);
      if (error) {
        return toast.error(res?.error as string);
      } else if (!res) {
        // @ts-ignore
        return toast.error(res?.error as string);
      }
      reset();
      return toast.success(res?.data as string);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <p className="py-5 text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
        Post Something
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input
          {...register("content")}
          placeholder="Post what's in your mind ?"
        />
        {errors?.content && (
          <span className="text-sm font-bold text-red-500">
            {errors.content.message}
          </span>
        )}
        <div className="flex items-center gap-3 justify-between">
          <Button
            type="submit"
            className="rounded-full w-24 font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
          <div className="flex items-center gap-2">
            <label htmlFor="postImg" className="cursor-pointer">
              <ImagePlay />
              <input
                type="file"
                id="postImg"
                // onChange={(e) => handleFileChange(e, setPostImg)}
                className="hidden"
                accept="image/*"
              />
            </label>
            <label htmlFor="postVideo" className="cursor-pointer">
              <Video />
              <input
                type="file"
                id="postVideo"
                // onChange={(e) => handleFileChange(e, setPostVideo)}
                className="hidden"
                accept="video/*"
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
