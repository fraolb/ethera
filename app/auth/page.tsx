"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsThreeDots, BsPeople, BsHeart, BsBookmark } from "react-icons/bs";
import BgImage from "@/public/bgImage1.jpg";
import Logo from "@/public/ETHERALogo.png";

const PreLogin = () => {
  const router = useRouter();
  return (
    <div className="relative h-screen w-full bg-cover bg-center flex flex-col items-center text-white px-6 md:px-16">
      <Image
        src={BgImage}
        alt="Background"
        fill
        quality={90}
        priority
        className="absolute inset-0 z-0 object-cover"
      />

      {/* Top Navigation */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-[90%] md:w-[80%] bg-white shadow-lg rounded-full px-4 py-2 z-10">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" width={100} height={50} />
        </div>

        {/* Center Buttons */}
        <div className="flex items-center space-x-2 text-black">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm border">
            <BsPeople className="text-black" />
            FRIENDS
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm border">
            <BsHeart />
            LIKED
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm border">
            <BsBookmark />
            SAVED
          </button>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-2">
          <button className="bg-black text-white px-4 py-2 rounded-full flex items-center">
            <BsThreeDots />
            <span className="ml-2">MENU</span>
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-full"
            onClick={() => router.push("/auth/login")}
          >
            ✴ Try now
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col justify-center items-center text-center flex-grow z-10">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Dive into the World of{" "}
          <span className="text-yellow-300">
            Decentralized Content Monetization
          </span>
        </h2>
        <p className="text-lg bg-gray-800/70 mt-4 max-w-xl  py-4 rounded-xl">
          Earn from your content without middlemen. Experience full control,
          security, and freedom with Ethera.
        </p>

        {/* Read More Section */}
        <div className="mt-6 flex items-center gap-4 z-10">
          <button
            className="bg-white text-black px-6 py-3 rounded-full text-lg font-medium"
            onClick={() => router.push("/auth/login")}
          >
            Start Now
          </button>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              🔒
            </span>
            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              ⚡
            </span>
            <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              🌍
            </span>
          </div>
        </div>
      </div>

      {/* Feature Tags */}
      <div className="absolute bottom-10 flex flex-wrap justify-center gap-2 text-sm">
        <span className="bg-gray-800/70 px-4 py-2 rounded-full">
          Security & Privacy
        </span>
        <span className="bg-gray-800/70 px-4 py-2 rounded-full">
          No Middlemen
        </span>
        <span className="bg-gray-800/70 px-4 py-2 rounded-full">
          Full Ownership
        </span>
        <span className="bg-gray-800/70 px-4 py-2 rounded-full">
          Earn Instantly
        </span>
      </div>
    </div>
  );
};

export default PreLogin;
