"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/app/contexts/UserContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DonationSection from "@/components/DonationSection";
import SubscriptionTiers from "@/components/SubscriptionTiers";
import { IContent } from "@/models/contents";
import { ThumbsUp } from "lucide-react";

export default function Page() {
  const params = useParams();
  const { _id } = params; // Access the _id parameter from the URL

  const { allContents } = useUser();
  const [content, setContent] = useState<IContent | undefined>(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(100);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1); // Decrease like count
    } else {
      setLikeCount(likeCount + 1); // Increase like count
    }
    setIsLiked(!isLiked); // Toggle like state
  };

  useEffect(() => {
    if (allContents) {
      const foundContent: IContent | undefined = allContents.find(
        (c) => c._id === _id
      );
      setContent(foundContent);
    }
  }, [allContents, _id]);

  if (!content) {
    return <div>Content not found</div>;
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="w-0 md:w-1/6">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-3/4">
        <Header />
        <div className="p-6 block md:grid md:grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="bg-white shadow-md rounded-md mb-4 h-2/3 ">
              {content.contentType === "image" && (
                <Image
                  src={content.contentLink}
                  alt={content.title}
                  width={100} // Set width to 0 to allow the container to control the size
                  height={100} // Set height to 0 to allow the container to control the size
                  style={{
                    objectFit: "cover", // Ensures the image fits within the container while maintaining aspect ratio
                  }}
                  className="w-full h-full rounded-md"
                />
              )}
              {content.contentType === "video" && (
                <video controls src={content.contentLink} />
              )}
              {content.contentType === "blog" && (
                <div>
                  <h1>{content.title}</h1>
                  <p>{content.contentLink}</p>
                </div>
              )}
            </div>
            <div className="bg-white block md:flex justify-between shadow-md p-6 py-4 rounded-md mb-4 mt-2">
              <div className="flex items-center gap-4">
                {content.createdBy.profileImg != "" && (
                  <Image
                    src={content.createdBy.profileImg}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full"
                  />
                )}

                <div>
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
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
              </div>
              <div>
                <button
                  className={`flex mb-2 items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${
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
            <SubscriptionTiers />
            <DonationSection />
          </div>
        </div>
      </div>
    </div>
  );
}
