"use client";

import { useRouter } from "next/navigation";
import { IContent } from "@/models/contents";

const PostGrid = ({ posts }: { posts: IContent[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const PostCard = ({ post }: { post: IContent }) => {
  const router = useRouter();

  const formatDate = (createdAt: string | Date): string => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);

    // Convert Date objects to timestamps (numbers) using .getTime()
    const timeDifference = currentDate.getTime() - postDate.getTime(); // Difference in milliseconds
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

    if (daysDifference === 0) {
      return "Today";
    } else if (daysDifference === 1) {
      return "Yesterday";
    } else if (daysDifference < 7) {
      return "This week";
    } else if (daysDifference < 14) {
      return "1 week ago";
    } else if (daysDifference < 21) {
      return "2 weeks ago";
    } else if (daysDifference < 28) {
      return "3 weeks ago";
    } else if (daysDifference < 60) {
      return "1 month ago";
    } else {
      // For dates older than 2 months, display the actual date
      return postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const renderContent = () => {
    switch (post.contentType) {
      case "blog":
        return (
          <div className="p-4 h-40 bg-gray-100 rounded-lg">
            <h3 className="text-lg pt-6 font-semibold">{post.title}</h3>
            <p className="text-gray-600  text-sm truncate">
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
      onClick={() => router.push(`/${post._id}`)}
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

      <div className="p-4 pt-0">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <h4 className="text-sm">{post.createdBy.creator}</h4>
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>{formatDate(post.createdAt)}</span>
          <span>👍 {post.likes != 0 && post.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
