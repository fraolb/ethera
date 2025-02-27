"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";
import Image from "next/image";
import Logo from "@/public/etheraIcon.png";
import { Home, Search, Mail, Banknote } from "lucide-react";
import { fetchUserSubscriptions } from "@/utils/contract";
import { useUser } from "@/app/contexts/UserContext";
import { IContent } from "@/models/contents";

const Sidebar = () => {
  const router = useRouter();
  const { allContents } = useUser();
  const { disconnectWallet, circlesAddress } = useContext(CirclesSDKContext);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [subscribedCreatorsNames, setSubscribedCreatorsNames] = useState<
    string[]
  >([]);

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
    router.push("/auth");
  };

  const getUserSubscriptions = async (walletAddress: string) => {
    try {
      // Fetch subscriptions from the smart contract
      const subscriptions = await fetchUserSubscriptions(walletAddress);
      console.log("Parsed subscriptions:", subscriptions);

      if (subscriptions.length === 0) {
        console.log("No subscriptions found for this user.");
        setSubscriptions([]);
        setSubscribedCreatorsNames([]);
        return;
      }

      // Fetch creator names from the database
      const names: string[] = [];
      for (const subscription of subscriptions) {
        const response = await fetch(`/api/users/${subscription.creator}`);
        if (response.ok) {
          const user = await response.json();
          names.push(user.creator); // Assuming the API returns an object with a `creator` field
        } else {
          console.error("Failed to fetch user:", subscription.creator);
        }
      }

      // Update state
      setSubscriptions(subscriptions);
      setSubscribedCreatorsNames(names);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  useEffect(() => {
    if (circlesAddress) {
      getUserSubscriptions(circlesAddress);
    }
  }, [circlesAddress]);

  return (
    <div className="w-1/6 text-black h-screen bg-white shadow-md p-5 hidden md:flex flex-col fixed top-0 left-0">
      <div className="flex justify-center mb-6">
        <Image
          src={Logo}
          width={150}
          height={150}
          alt="Ethera Logo"
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
      </div>

      <nav className="space-y-2">
        <SidebarItem icon={Home} route="/" text="Feed" badge={37} />
        <SidebarItem icon={Search} text="Explore" />
        <SidebarItem icon={Mail} text="Messages" />
        <SidebarItem icon={Banknote} text="Payment" />
      </nav>

      <div className="mt-auto">
        <h3 className="font-semibold mb-2">Subscriptions</h3>
        {subscribedCreatorsNames.length > 0 ? (
          <ul>
            {subscribedCreatorsNames.map((name, index) => (
              <SidebarItem key={index} text={name} />
            ))}
          </ul>
        ) : (
          <p>No subscriptions found.</p>
        )}

        <div className="flex justify-center">
          <button
            className="mt-4 text-red-500 px-6 py-2 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
            onClick={handleDisconnectWallet}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon: Icon,
  text,
  badge,
  route,
}: {
  icon?: React.ElementType;
  text: string;
  badge?: number;
  route?: string;
}) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md cursor-pointer"
      onClick={() => {
        if (route) {
          router.push(route);
        }
      }}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={20} className="text-gray-600" />}
        <span>{text}</span>
      </div>
      {badge !== undefined && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
};

export default Sidebar;
