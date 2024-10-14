/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/app/models/UserSchema";
import toast from "react-hot-toast";
import { useNewUserMutation } from "@/app/store/user/userSlice";

export default function SignUp() {
  const [tEye, setTEye] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const [newUser, { error, isLoading }] = useNewUserMutation({});
  const onSubmit: SubmitHandler<signUpSchema> = async (data) => {
    try {
      // console.log("d", data);
      const res = await newUser(data);
      // console.log('res', res)
      if (error) {
        return toast.error(res?.error as string);
      } else if(!res) {
        // @ts-ignore
        return toast.error(res?.error as string);
      }
      reset();
      return toast.success(res?.data as string);
    } catch (error) {
      console.error(`Something went wrong. Failed to Sign Up ${error}`);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {isLoading ? "Processing..." : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input
              {...register("username", { required: true })}
              placeholder="User Name"
            />
            {errors?.username && (
              <span className="text-sm font-bold text-red-500">
                {errors?.username?.message}
              </span>
            )}
            <Input
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors?.email && (
              <span className="text-sm font-bold text-red-500">
                {errors?.email?.message}
              </span>
            )}
            <div className="relative">
              <Input
                {...register("password")}
                placeholder="Password"
                type={tEye ? "text" : "password"}
              />
              {errors?.password && (
                <span className="text-sm font-bold text-red-500">
                  {errors?.password?.message}
                </span>
              )}
              <Button
                type="button"
                className="absolute right-0 top-0"
                onClick={() => setTEye((prev) => !prev)}
                variant={"ghost"}
              >
                {tEye ? <Eye /> : <EyeClosed />}
              </Button>
            </div>
            <Button
              disabled={isLoading}
              className="font-bold mt-5"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-start justify-center">
          <p>
            Already an user ?{" "}
            <Link
              href="/u/login"
              className="hover:text-blue-500 font-bold transition duration-300"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
