"use client";

import { useRouter } from "next/navigation";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle dropdown item clicks
  const handleDropdownItemClick = (path: string) => {
    router.push(path);
    setIsDropdownOpen(false); // Close dropdown after navigation
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md p-4">
      <div className="w-2/3 flex justify-center">
        <div className="w-full relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search creators..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* User Icon with Dropdown */}
        <div className="relative">
          <FaUserCircle
            className="text-gray-600 text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <ul className="py-1">
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
        </div>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-md">
          Become a creator
        </button>
      </div>
    </header>
  );
};

export default Header;
