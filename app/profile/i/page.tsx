"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CreatorProfile from "@/components/CreatorProfile";
import Posts from "@/components/Posts";
import { useUser } from "@/app/contexts/UserContext";
import Promote from "@/components/Promote";

const dummyPosts = [
  {
    id: 1,
    title: "My new project",
    description: "Excited to share my latest work...",
    image:
      "https://images.unsplash.com/photo-1675573206424-36f844f7627a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isLocked: true,
    likes: 23,
    saved: 12,
    views: 1800000,
  },
  {
    id: 2,
    title: "My first photoshoot",
    description: "This was a memorable day...",
    image:
      "https://plus.unsplash.com/premium_photo-1661765701123-a0fd80ce484a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPremium: true,
    likes: 12,
    saved: 4,
    views: 1800000,
  },
  {
    id: 3,
    title: "Nature photography",
    description: "Captured this amazing landscape...",
    image:
      "https://images.unsplash.com/photo-1739246079440-a628fb2e7737?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 30,
    saved: 15,
    views: 1800000,
  },
];

const Dashboard = () => {
  const { user, contents } = useUser();
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="w-0 md:w-1/6">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-3/4">
        <Header />
        <div className="p-6 block md:grid md:grid-cols-4 gap-4">
          <div className="col-span-3">
            {user != null && <CreatorProfile user={user} />}

            {contents && <Posts posts={contents} />}
          </div>
          <div className="flex flex-col gap-4 mt-4 ">
            <Promote cardTitle="trending" contents={dummyPosts} />
            <Promote cardTitle="Most Viewed" contents={dummyPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
