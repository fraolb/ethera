"use client";

import { useRouter } from "next/navigation";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { CiBitcoin } from "react-icons/ci";
import { useState, useContext, useEffect } from "react";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";
import Image from "next/image";
import Logo from "@/public/etheraLogo.png";

const Header = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userBalance, setUserBalance] = useState("0");
  const [avatarInfo, setAvatar] = useState(null);

  // Use the Circles SDK context
  const { sdk, circlesAddress, circlesProvider } =
    useContext(CirclesSDKContext);

  const getCRCBalance = async () => {
    try {
      if (!sdk || !circlesAddress) return;

      const avatar = await sdk.getAvatar(circlesAddress);
      console.log("avatar ", avatar);
      if (avatar) {
        setAvatar(avatar);
        const total = await avatar.getTotalBalance(circlesAddress);
        setUserBalance(total);
      } else {
        setAvatar(null);
      }
    } catch (error) {
      console.error("Error checking avatar:", error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle dropdown item clicks
  const handleDropdownItemClick = (path: string) => {
    router.push(path);
    setIsDropdownOpen(false); // Close dropdown after navigation
  };

  useEffect(() => {
    getCRCBalance();
  }, [circlesAddress, circlesProvider]);
  console.log(avatarInfo);

  return (
    <header className="flex flex-col bg-white shadow-md">
      {/* Top section of the header */}
      <div className="flex justify-between items-center p-4">
        {/* Logo for mobile */}
        <div className="md:hidden">
          <Image
            src={Logo}
            width={100}
            height={100}
            alt="Picture of the author"
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
        </div>

        {/* Search bar */}
        <div className="w-2/3 mx-2 md:mx-0 flex justify-center">
          <div className="w-full relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search creators..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        {/* User actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex">
            <CiBitcoin className="text-yellow-700 text-2xl " />
            <div className="text-yellow-700">
              {Number(userBalance).toFixed()} CRC
            </div>
          </div>
          {/* User Icon */}
          <FaUserCircle
            className="hidden md:flex text-gray-600 text-2xl cursor-pointer hover:ring-2 hover:ring-yellow-700 hover:rounded-xl"
            onClick={() => router.push("/profile/i")}
          />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <FaBars
              className="text-gray-600 text-2xl cursor-pointer"
              onClick={toggleDropdown}
            />
          </div>

          {/* Become a creator button (hidden on mobile) */}
          <button
            onClick={() => router.push("/profile/creator")}
            className="hidden md:flex bg-orange-500 text-white px-4 py-2 rounded-md hover:ring-2 hover:ring-orange-700 "
          >
            Become a creator
          </button>
        </div>
      </div>

      {/* Dropdown section (visible on mobile) */}
      {isDropdownOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDropdownItemClick("/profile")}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDropdownItemClick("/faq")}
            >
              FAQ
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDropdownItemClick("/settings")}
            >
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDropdownItemClick("/logout")}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
