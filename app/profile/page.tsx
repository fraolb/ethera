"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CreatorProfile from "@/components/CreatorProfile";
import Posts from "@/components/Posts";
import DonationSection from "@/components/DonationSection";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import { useUser } from "@/app/contexts/UserContext";

const Dashboard = () => {
  const { user, fetchUserData, updateUserData, isCreator, contents } =
    useUser();
  return (
    <div className="flex w-full bg-gray-100">
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
            <DonationSection />
            <SubscriptionTiers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
