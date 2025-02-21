"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaSearch, FaEnvelope, FaMoneyBillWave } from "react-icons/fa";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";

const Sidebar = () => {
  const router = useRouter();
  // Use the Circles SDK context
  const {
    sdk,
    isConnected,
    setIsConnected,
    adapter,
    circlesProvider,
    circlesAddress,
    initializeSdk,
    disconnectWallet,
    circlesData,
  } = useContext(CirclesSDKContext);

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
    router.push("/auth");
  };

  return (
    <div className="w-1/6 h-screen bg-white shadow-md p-5 hidden md:flex flex-col fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6">ETHera</h2>

      <nav className="space-y-4">
        <SidebarItem icon={<FaHome />} route="/" text="Feed" badge={37} />
        <SidebarItem icon={<FaSearch />} text="Explore" />
        <SidebarItem icon={<FaEnvelope />} text="Messages" />
        <SidebarItem icon={<FaMoneyBillWave />} text="Payment" />
      </nav>

      <div className="mt-auto">
        <h3 className="font-semibold mb-2">Subscriptions</h3>
        <SidebarItem text="Brooklyn Simmons" />
        <SidebarItem text="Alisa Flores" />
        <div className="flex justify-center">
          <button
            className="mt-4 text-red-500 px-6 py-2 border border-red-500 rounded rounded-md hover:bg-red-500 hover:text-white"
            onClick={() => handleDisconnectWallet()}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon,
  text,
  badge,
  route,
}: {
  icon?: JSX.Element;
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
        {icon && <span className="text-gray-600">{icon}</span>}
        <span>{text}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
};

export default Sidebar;
