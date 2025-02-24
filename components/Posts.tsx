"use client";

import { useRouter } from "next/navigation";
import { IContent } from "@/models/contents";

interface Post {
  id: string;
  title: string;
  contentType: "video" | "image" | "blog";
  contentLink: string;
  likes: number;
  tier: "standard" | "premium" | "vip";
}

const PostGrid = ({ posts }: { posts: IContent[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      {posts.map((post) => (
        <PostCard key={post.title} post={post} />
      ))}
    </div>
  );
};

const PostCard = ({ post }: { post: IContent }) => {
  const router = useRouter();

  const renderContent = () => {
    switch (post.contentType) {
      case "blog":
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600 text-sm truncate">
              Read the full blog post:{" "}
              <a
                href={post.contentLink}
                className="text-blue-500 hover:underline"
              >
                Click here
              </a>
            </p>
          </div>
        );
      case "video":
        return (
          <video controls className="w-full h-40 object-cover">
            <source src={post.contentLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case "image":
        return (
          <img
            src={post.contentLink}
            alt={post.title}
            className="w-full h-40 object-cover"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:cursor-pointer"
      onClick={() => router.push(`/${post.title}`)}
    >
      <div className="relative">
        {renderContent()}
        {post.tier === "premium" && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Premium
          </span>
        )}
        {post.tier === "vip" && (
          <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
            VIP
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>👍 {post.likes} likes</span>
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
