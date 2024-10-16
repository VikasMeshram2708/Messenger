"use client";

import React from "react";
import { useGetUserDetailsQuery } from "@/app/store/user/userSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Mail, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data, isLoading } = useGetUserDetailsQuery({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col rounded-lg items-center space-y-4 pb-2">
          {isLoading ? (
            <Skeleton className="w-24 h-24 rounded-full" />
          ) : (
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={data?.avatar || "/logo.jpg"}
                alt={data?.username || "User"}
              />
              <AvatarFallback>
                {data?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="text-center">
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <h2 className="text-2xl font-bold">
                {data?.username || "Username"}
              </h2>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-500" />
            {isLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              <span>{data?.email || "email@example.com"}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <span>
                Joined: {data?.createdAt ? formatDate(data.createdAt) : "N/A"}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="w-full"
            disabled={isLoading}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
