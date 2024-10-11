import AddPost from "@/components/Messenger/AddPost";
import RecentPosts from "@/components/Messenger/RecentPosts";

export default function Home() {
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-2">
      <main className="py-10">
        <AddPost />
        <div className="py-20">
          <RecentPosts />
        </div>
      </main>
    </div>
  );
}
