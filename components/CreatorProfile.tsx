"use client";

import { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IUser } from "@/models/creator";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";

const CreatorProfile = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const { circlesAddress } = useContext(CirclesSDKContext);

  return (
    <div className="bg-white shadow-md p-6 rounded-md mb-4 text-black">
      <div className="flex items-center gap-4">
        {user.profileImg != "" && (
          <Image
            src={user.profileImg}
            alt="Profile"
            width={100}
            height={100}
            className="w-16 h-16 rounded-full"
          />
        )}

        <div>
          <h2 className="text-xl font-bold">{user.creator}</h2>
          <p className="text-gray-500">{user.description}</p>
        </div>
      </div>

      {/* <div className="flex justify-between mt-4">
        <p>
          <strong>3487</strong> Subscribers
        </p>
        <p>
          <strong>28</strong> Posts
        </p>
        <p>
          <strong>1593</strong> Likes
        </p>
      </div> */}
      {circlesAddress && circlesAddress == user.walletAddress && (
        <div className="flex mt-8 gap-8">
          <h3 className="font-bold mb-2 pt-2">Post a new content</h3>

          <button
            className="bg-orange-500 text-white px-4  rounded-md"
            onClick={() => router.push("/post")}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatorProfile;
