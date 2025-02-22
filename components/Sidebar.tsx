"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";
import Image from "next/image";
import Logo from "@/public/etheraLogo.png";
import { Home, Search, Mail, Banknote } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const { disconnectWallet } = useContext(CirclesSDKContext);

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
    router.push("/auth");
  };

  return (
    <div className="w-1/6 h-screen bg-white shadow-md p-5 hidden md:flex flex-col fixed top-0 left-0">
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
        <SidebarItem text="Brooklyn Simmons" />
        <SidebarItem text="Alisa Flores" />
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
