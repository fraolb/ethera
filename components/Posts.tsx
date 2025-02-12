import React from "react";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  isLocked?: boolean;
  isPremium?: boolean;
  likes: number;
  saved: number;
}

const PostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-40 object-cover"
        />
        {post.isLocked && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-semibold">
            Locked
          </div>
        )}
        {post.isPremium && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Premium
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="text-gray-600 text-sm truncate">{post.description}</p>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>👍 {post.likes} likes</span>
          <span>🔖 {post.saved} saved</span>
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
