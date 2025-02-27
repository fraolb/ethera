"use client";

import { useState, useContext } from "react";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";
import { tipCreator } from "@/utils/contract";
import { ethers } from "ethers";

interface notificationInterface {
  message: string;
  type: string;
}

const DonationSection = ({ recipient }: { recipient: string }) => {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] =
    useState<notificationInterface | null>(null);

  // Use the Circles SDK context
  const { circlesAddress } = useContext(CirclesSDKContext);

  const sendCRCToken = async () => {
    if (!circlesAddress) {
      setNotification({
        message: "Your wallet address not available.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      // Get the signer from the wallet (e.g., MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Call the tipCreator function
      const txHash = await tipCreator(signer, recipient, amount);
      console.log("Transaction hash:", txHash);

      // Display success message
      setNotification({
        message: "Creator tipped successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error transferring tokens:", error);
      setNotification({
        message: "Error tipping creator. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden w-full max-w-xs text-black">
      {notification && (
        <div
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-12 p-2 px-4 w-3/4 rounded shadow-lg z-10 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}
      <h3 className="font-bold mb-2">Tip Creator</h3>
      <input
        type="number"
        className="w-full border p-2 mb-2"
        placeholder="Amount"
        onChange={(e) => setAmount(Number(e.target.value))} // Convert string to number
      />
      <input
        type="text"
        className="w-full border p-2 mb-2"
        placeholder="Your name"
      />
      <input
        type="text"
        className="w-full border p-2 mb-2"
        placeholder="Add message"
      />
      <button
        onClick={sendCRCToken}
        disabled={loading}
        className="bg-orange-500 text-white w-full py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Donate"}
      </button>
    </div>
  );
};

export default DonationSection;
