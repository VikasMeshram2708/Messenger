import { ImagePlay, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddPost() {
  return (
    <div className="grid gap-3 max-w-5xl mx-auto">
      <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
        Post Something
      </p>
      <Input placeholder="Post what's in your mind ?" />
      <div className="flex items-center gap-3 justify-between">
        <Button className="rounded-full w-24 font-bold">Post</Button>
        <div className="flex items-center gap-2">
          <ImagePlay />
          <Video />
        </div>
      </div>
    </div>
  );
}
