/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { EllipsisVerticalIcon, ArrowRightIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  useDeleteMyPostMutation,
  useGetAllPostsQuery,
  useUpdateMyPostMutation,
} from "@/app/store/chat/chatSlice";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
// import { updatePostSchema } from "@/app/models/MessageSchema";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";

const RecentPosts = () => {
  const { data, isLoading, error } = useGetAllPostsQuery();
  const [deletePost, { error: deleteError }] = useDeleteMyPostMutation({});
  const [updatePost, { error: updateError }] = useUpdateMyPostMutation({});
  const [isEditable, setIsEditable] = useState(false);
  const [editablePostId, setEditablePostId] = useState<number | null>(null);
  const [nContent, setNContent] = useState("");

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </CardHeader>
            <div className="p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
            <div className="flex items-center justify-between p-4 border-t">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </Card>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">Error loading posts</div>
    );
  }

  const handleDelete = async (id: number) => {
    try {
      const res = await deletePost({ postId: id });
      if (deleteError) {
        return toast.error(res?.error as string);
      } else if (!res) {
        // @ts-ignore
        return toast.error(res?.error as string);
      }
      return toast.success(res?.data as string);
    } catch (error) {
      console.log(`Something went wrong. Failed to delete post :${error}`);
    }
  };

  const toggleEdit = (id: number) => {
    setEditablePostId(id);
    setIsEditable((prev) => !prev);
  };

  // useEffect(() => {}, [isEditable]);
  // console.log("e", isEditable);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("ud", {
    //   postId: editablePostId as number,
    //   content: nContent,
    // });
    try {
      const res = await updatePost({
        postId: editablePostId as number,
        content: nContent,
        // postImg: "",
        // postVideo: "",
      });
      // console.log("res", res);
      if (updateError) {
        return toast.error(res?.error as string);
      } else if (!res) {
        // @ts-ignore
        return toast.error(res?.error as string);
      }
      // reset();
      setNContent("");
      toast.success(res?.data as string);
      setIsEditable(false)
    } catch (error) {
      console.log(`Something went wrong. Failed to delete post :${error}`);
    }
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto">
      <div className="grid gap-6 grid-cols-1">
        {data?.map((elem) => (
          <Card key={elem?.id} className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-sm font-semibold">@MRX</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Choose Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                        className="w-full"
                        onClick={() => toggleEdit(elem?.id)}
                        type="button"
                      >
                        Edit
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        className="w-full"
                        variant={"destructive"}
                        onClick={() => handleDelete(elem?.id)}
                        type="button"
                      >
                        Delete
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="">
                {!isEditable && <p className="">{elem?.content}</p>}
                {isEditable && editablePostId === elem?.id && (
                  <form onSubmit={handleUpdate}>
                    <Input
                      defaultValue={elem?.content}
                      value={nContent}
                      onChange={(e) => setNContent(e.target.value)}
                      placeholder={elem?.content}
                    />
                    <span>
                      <Button variant={"destructive"} type="submit">
                        Confirm Edit
                      </Button>
                    </span>
                  </form>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className=" text-sm">Just now</span>
                <Button variant={"ghost"} aria-label="Forward post">
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
