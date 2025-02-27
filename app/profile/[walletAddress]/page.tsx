"use client";

import { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CreatorProfile from "@/components/CreatorProfile";
import Posts from "@/components/Posts";
import DonationSection from "@/components/DonationSection";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import { IContent } from "@/models/contents";
import { IUser } from "@/models/creator";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";
import { fetchUserSubscriptions } from "@/utils/contract";

const Dashboard = () => {
  const params = useParams();
  const router = useRouter();
  const { walletAddress } = params;
  const { circlesAddress } = useContext(CirclesSDKContext);
  const [contents, setContents] = useState<IContent[] | null>(null);
  const [creator, setCreator] = useState<IUser | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure walletAddress is a string
  const normalizedWalletAddress = Array.isArray(walletAddress)
    ? walletAddress[0] // Use the first item if it's an array
    : walletAddress;

  // Redirect or show error if walletAddress is invalid
  if (!normalizedWalletAddress) {
    router.push("/"); // Redirect to home or another page
    return null;
  }

  const fetchCreatorContents = async (address: string) => {
    try {
      const response = await fetch(`/api/users/${address}`);
      if (!response.ok) {
        setCreator(null);
        setError("Creator not found.");
      } else {
        const data: IUser = await response.json();
        setCreator(data);
        console.log("User data found:", data);
      }

      const contentResponse = await fetch(`/api/users/content/${address}`);
      if (contentResponse.ok) {
        const contentData: IContent[] = await contentResponse.json();
        console.log("Content data found:", contentData);
        setContents(contentData);
      } else {
        setError("Failed to fetch content.");
      }
    } catch (error) {
      console.error("Error fetching creator contents:", error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const isUserSubscribed = async (address: string): Promise<boolean> => {
    try {
      if (!circlesAddress) {
        console.log("User wallet address is not available.");
        return false;
      }

      // Fetch subscriptions from the smart contract
      const subscriptions = await fetchUserSubscriptions(circlesAddress);
      console.log("Parsed subscriptions:", subscriptions);

      if (subscriptions.length === 0) {
        console.log("No subscriptions found for this user.");
        return false;
      }

      // Check if the creator's address is in the subscription list
      const isSubscribed = subscriptions.some(
        (subscription: any) => subscription.creator === address
      );

      return isSubscribed;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      return false;
    }
  };

  useEffect(() => {
    if (!normalizedWalletAddress) return;

    const checkSubscription = async () => {
      const subscribed = await isUserSubscribed(normalizedWalletAddress);
      setIsSubscribed(subscribed);
    };

    checkSubscription();
    fetchCreatorContents(normalizedWalletAddress);
  }, [normalizedWalletAddress]);

  if (loading) {
    return (
      <div className="flex w-full min-h-screen bg-gray-100 text-black">
        <div className="w-0 md:w-1/6">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 w-3/4">
          <Header />
          <div className="p-6 block md:grid md:grid-cols-4 gap-4">
            {" "}
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full min-h-screen bg-gray-100 text-black">
        <div className="w-0 md:w-1/6">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 w-3/4">
          <Header />
          <div className="p-6 block md:grid md:grid-cols-4 gap-4">
            {" "}
            <p>Error Happened while loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-100 text-black">
      <div className="w-0 md:w-1/6">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-3/4">
        <Header />
        <div className="p-6 block md:grid md:grid-cols-4 gap-4">
          <div className="col-span-3">
            {creator != null && <CreatorProfile user={creator} />}

            {contents && <Posts posts={contents} />}
          </div>
          <div className="flex flex-col gap-4 mt-4 ">
            {isSubscribed ? (
              <div className="bg-white p-4 pt-8 shadow-md rounded-lg overflow-hidden w-full max-w-xs text-black">
                <h3 className="font-bold mb-4">
                  You are already Subscribed 😊
                </h3>
              </div>
            ) : (
              <SubscriptionTiers creatorAddress={normalizedWalletAddress} />
            )}
            {normalizedWalletAddress && (
              <DonationSection recipient={normalizedWalletAddress} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
