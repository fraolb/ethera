"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BgImage from "@/public/bgImage1.jpg";
import Logo from "@/public/ETHERALogo.png";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";

const LoginPage = () => {
  const router = useRouter();

  // Use the Circles SDK context
  const {
    sdk,
    isConnected,
    setIsConnected,
    circlesAddress,
    initializeSdk,
    disconnectWallet,
  } = useContext(CirclesSDKContext);

  console.log("Context values in LoginPage:", {
    sdk,
    isConnected,
    circlesAddress,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      console.log("Trying to connect...");
      await initializeSdk();
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      console.log("SDK is now connected:", sdk);
    }
  }, [sdk, isConnected]);

  useEffect(() => {
    if (isConnected && circlesAddress) {
      // Check if the user has a Circles avatar
      sdk?.getAvatar(circlesAddress).then((avatar) => {
        if (avatar) {
          router.push("/dashboard"); // Redirect to dashboard if avatar exists
        } else {
          router.push("/onboarding"); // Redirect to onboarding if no avatar
        }
      });
    }
  }, [isConnected, circlesAddress, router, sdk]);

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
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-center w-96 z-10">
          <div className="flex justify-center items-center space-x-2">
            <Image src={Logo} alt="Logo" width={100} height={50} />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            {isConnected ? "Logged In" : "Login with Gnosis Wallet"}
          </h2>
          <p className="text-black mb-6">
            {isConnected
              ? "Do you have Circles Avatar?"
              : "Connect your crypto wallet on Gnosis Chain to continue."}
          </p>

          {isConnected ? (
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Connected as:
              </p>
              <p className="break-all text-gray-800">{`${circlesAddress?.slice(
                0,
                4
              )}...${circlesAddress?.slice(-4)}`}</p>
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition w-full flex justify-center"
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
