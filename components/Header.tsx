"use client";

import { useRouter } from "next/navigation";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
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

      <div className="flex items-center gap-4">
        <FaUserCircle
          className="text-gray-600 text-2xl"
          onClick={() => router.push(`/profile`)}
        />
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md">
          Become a creator
        </button>
      </div>
    </header>
  );
};

export default Header;
