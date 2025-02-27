"use client";

import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useUser } from "@/app/contexts/UserContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CirclesSDKContext from "../contexts/CirclesSDK";
import DonationSection from "@/components/DonationSection";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import { IContent } from "@/models/contents";
import { ThumbsUp } from "lucide-react";
import { fetchUserSubscriptions } from "@/utils/contract";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { _id } = params; // Access the _id parameter from the URL
  const { circlesAddress } = useContext(CirclesSDKContext);

  const { allContents } = useUser();
  const [content, setContent] = useState<IContent | undefined>(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1); // Decrease like count
    } else {
      setLikeCount(likeCount + 1); // Increase like count
    }
    setIsLiked(!isLiked); // Toggle like state
  };

  const isUserSubscribed = async (walletAddress: string): Promise<boolean> => {
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
        (subscription: any) => subscription.creator === walletAddress
      );

      return isSubscribed;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      return false;
    }
  };

  useEffect(() => {
    if (allContents) {
      const foundContent: IContent | undefined = allContents.find(
        (c) => c._id === _id
      );
      setContent(foundContent);
      if (foundContent) {
        // Check if the user is the owner of the content
        if (circlesAddress === foundContent.walletAddress) {
          setIsOwner(true);
        }

        const checkSubscription = async () => {
          const subscribed = await isUserSubscribed(foundContent.walletAddress);
          setIsSubscribed(subscribed);
        };

        checkSubscription();
      }
    }
  }, [allContents, _id]);

  if (!content) {
    return <div>Content not found</div>;
  }

  console.log("userrss sub ", isSubscribed, "owner ", isOwner);

  return (
    <div className="flex w-full min-h-screen bg-gray-100 text-black">
      <div className="w-0 md:w-1/6">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-3/4">
        <Header />
        <div className="p-6 block md:grid md:grid-cols-4 gap-4">
          <div className="col-span-3">
            {isOwner == false && isSubscribed == false ? (
              <div className="bg-white shadow-md rounded-md mb-4 h-1/3 border border-solid relative">
                <Image
                  src="https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Not subscribed"
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                  }}
                  className="w-full h-full rounded-md"
                />

                <h2 className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black bg-opacity-50">
                  Subscribe to watch!
                </h2>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-md mb-4 h-2/3 border border-solid">
                {content.contentType === "image" && (
                  <Image
                    src={content.contentLink}
                    alt={content.title}
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                    }}
                    className="w-full h-full rounded-md"
                  />
                )}
                {content.contentType === "video" && (
                  <video
                    controls
                    src={content.contentLink}
                    className="w-full h-full rounded-md"
                  />
                )}
                {content.contentType === "blog" && (
                  <div>
                    <h1>{content.title}</h1>
                    <p>{content.contentLink}</p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white block md:flex justify-between shadow-md p-6 py-4 rounded-md mb-4 mt-2">
              <div className="flex items-center gap-4">
                {content.createdBy.profileImg != "" && (
                  <Image
                    src={content.createdBy.profileImg}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full cursor-pointer"
                    onClick={() => {
                      router.push(`/profile/${content.walletAddress}`);
                    }}
                  />
                )}

                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(`/profile/${content.walletAddress}`);
                  }}
                >
                  <h2 className="text-xl font-bold">
                    {content.createdBy.creator}
                  </h2>
                  <p className="text-gray-500">
                    {content.createdBy.description}
                  </p>
                </div>
                <div className="block md:flex gap-4">
                  <button
                    className={`flex mb-2 items-center justify-center px-4 py-2 rounded-full font-semibold text-sm ${
                      isSubscribed
                        ? "bg-gray-200 text-black hover:bg-gray-300" // Subscribed state
                        : "bg-orange-600 text-white hover:bg-orange-700" // Subscribe state
                    } transition-colors duration-200`}
                    // onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
              </div>
              <div>
                <button
                  className={`flex mb-2 mt-2 items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
                    isLiked
                      ? "bg-blue-100 text-orange-700 hover:bg-blue-200" // Liked state
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Like state
                  } transition-colors duration-200`}
                  onClick={handleLike}
                >
                  {isLiked ? <ThumbsUp fill="#fb7013" /> : <ThumbsUp />}{" "}
                  <span>{likeCount}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 ">
            {isSubscribed ? (
              <div className="bg-white p-4 pt-8 shadow-md rounded-lg overflow-hidden w-full max-w-xs text-black">
                <h3 className="font-bold mb-4">
                  You are already Subscribed 😊
                </h3>
              </div>
            ) : (
              <SubscriptionTiers creatorAddress={content.walletAddress} />
            )}

            <DonationSection recipient={content.walletAddress} />
          </div>
        </div>
      </div>
    </div>
  );
}
