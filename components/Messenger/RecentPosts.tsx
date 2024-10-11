import { Ellipsis, Forward } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const sample = [
  {
    id: "1",
    user: {
      userId: "user_123",
      username: "john_doe",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
    content: "Hey! How's it going?",
    timestamp: "2024-10-11T14:23:45Z",
    attachments: [],
  },
  {
    id: "2",
    user: {
      userId: "user_456",
      username: "jane_smith",
      avatarUrl: "https://example.com/avatar2.jpg",
    },
    content: "Hi! All good, just working on a new project.",
    timestamp: "2024-10-11T14:24:10Z",
    attachments: [],
  },
  {
    id: "3",
    user: {
      userId: "user_789",
      username: "alice_w",
      avatarUrl: "https://example.com/avatar3.jpg",
    },
    content: "Check out this cool photo I took!",
    timestamp: "2024-10-11T14:25:00Z",
    attachments: [
      {
        type: "image",
        url: "https://example.com/photo.jpg",
      },
    ],
  },
  {
    id: "4",
    user: {
      userId: "user_123",
      username: "john_doe",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
    content: "Looks awesome! Where was that?",
    timestamp: "2024-10-11T14:25:30Z",
    attachments: [],
  },
  {
    id: "5",
    user: {
      userId: "user_456",
      username: "jane_smith",
      avatarUrl: "https://example.com/avatar2.jpg",
    },
    content: "Hey team, meeting at 3 PM today?",
    timestamp: "2024-10-11T14:26:15Z",
    attachments: [],
  },
  {
    id: "6",
    user: {
      userId: "user_789",
      username: "alice_w",
      avatarUrl: "https://example.com/avatar3.jpg",
    },
    content: "Yes, 3 PM works for me.",
    timestamp: "2024-10-11T14:27:00Z",
    attachments: [],
  },
  {
    id: "7",
    user: {
      userId: "user_123",
      username: "john_doe",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
    content: "Great! Do we have an agenda?",
    timestamp: "2024-10-11T14:28:15Z",
    attachments: [],
  },
  {
    id: "8",
    user: {
      userId: "user_456",
      username: "jane_smith",
      avatarUrl: "https://example.com/avatar2.jpg",
    },
    content: "I'll share a doc before the meeting.",
    timestamp: "2024-10-11T14:29:00Z",
    attachments: [
      {
        type: "document",
        url: "https://example.com/agenda.pdf",
        fileName: "Meeting_Agenda.pdf",
      },
    ],
  },
  {
    id: "9",
    user: {
      userId: "user_789",
      username: "alice_w",
      avatarUrl: "https://example.com/avatar3.jpg",
    },
    content: "Thanks, looking forward to it.",
    timestamp: "2024-10-11T14:30:30Z",
    attachments: [],
  },
  {
    id: "10",
    user: {
      userId: "user_123",
      username: "john_doe",
      avatarUrl: "https://example.com/avatar1.jpg",
    },
    content: "See you all there!",
    timestamp: "2024-10-11T14:31:45Z",
    attachments: [],
  },
];

export default function RecentPosts() {
  return (
    <div className="min-h-screen grid gap-2">
      {sample?.map((post) => (
        <Card key={post?.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex gap-1">
                  <span>@MRX</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className={buttonVariants({ variant: "ghost" })}>
                    <Ellipsis />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Choose Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-2">
            <CardDescription>{post?.content}</CardDescription>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2">
            <span>{new Date().toLocaleDateString()}</span>
            <Button variant={"ghost"}>
              <Forward />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
