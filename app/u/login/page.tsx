"use client";

import { loginSchema } from "@/app/models/UserSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [tEye, setTEye] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginSchema> = async (data) => {
    try {
      if (!data) return;
      const res = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });
      reset();
      if (!res?.ok) {
        return toast.error(res?.error || "Login Failed");
      }
      toast.success("Logged In");
      router.push("/");
    } catch (error) {
      console.error(`Something went wrong. Login Failed try again ${error}`);
    }
  };

  useEffect(() => {}, [router]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors?.email && (
              <span className="text-sm text-red-500 font-bold">
                {errors?.email?.message}
              </span>
            )}
            <div className="relative">
              <Input
                {...register("password", { required: true })}
                placeholder="Password"
                type={tEye ? "text" : "password"}
              />
              {errors?.password && (
                <span className="text-sm text-red-500 font-bold">
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
            <Button className="font-bold mt-5" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-start justify-center">
          <p>
            Not an user ?{" "}
            <Link
              href="/u/signup"
              className="hover:text-blue-500 font-bold transition duration-300"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
