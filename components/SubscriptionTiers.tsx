"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { subscribeToCreator } from "@/utils/contract";

const SubscriptionTiers = ({ creatorAddress }: { creatorAddress: string }) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "none" | "success" | "error"
  >("none");

  const handleSubscribe = async () => {
    if (selectedTier === null) {
      alert("Please select a tier.");
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus("none");

    try {
      // Get the signer from the wallet (e.g., MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Call the subscribeToCreator function
      const txHash = await subscribeToCreator(
        signer,
        creatorAddress,
        selectedTier
      );
      console.log("Transaction hash:", txHash);

      // Display success message
      setSubscriptionStatus("success");
      alert("Subscription successful!");
    } catch (error) {
      console.error("Error:", error);
      setSubscriptionStatus("error");
      alert("Subscription failed. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden w-full max-w-xs text-black">
      <h3 className="font-bold mb-4">Subscription Tiers</h3>

      {/* Tier 0: Standard */}
      <SubscriptionPlan
        title="Standard"
        price={2}
        benefits={["Access to standard posts", "One free content"]}
        isSelected={selectedTier === 0}
        onSelect={() => setSelectedTier(0)}
      />

      {/* Tier 1: Advanced */}
      <SubscriptionPlan
        title="Advanced"
        price={4}
        benefits={["Access to premium posts", "All free contents"]}
        isSelected={selectedTier === 1}
        onSelect={() => setSelectedTier(1)}
      />

      {/* Tier 2: VIP */}
      <SubscriptionPlan
        title="VIP"
        price={6}
        benefits={["Access to vip posts", "Special contents"]}
        isSelected={selectedTier === 2}
        onSelect={() => setSelectedTier(2)}
      />

      {/* Subscribe Button */}
      <button
        onClick={handleSubscribe}
        disabled={isSubscribing || selectedTier === null}
        className="bg-orange-500 text-white w-full py-2 rounded-md mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubscribing ? "Subscribing..." : "Subscribe"}
      </button>

      {/* Subscription Status */}
      {subscriptionStatus === "success" && (
        <p className="text-green-500 font-bold mt-2">
          Subscription successful!
        </p>
      )}
      {subscriptionStatus === "error" && (
        <p className="text-red-500 font-bold mt-2">
          Subscription failed. Please try again.
        </p>
      )}
    </div>
  );
};

const SubscriptionPlan = ({
  title,
  price,
  benefits,
  isSelected,
  onSelect,
}: {
  title: string;
  price: number;
  benefits: string[];
  isSelected?: boolean;
  onSelect: () => void;
}) => (
  <div
    className={`border p-4 mb-2 rounded-md cursor-pointer ${
      isSelected ? "border-orange-500 bg-orange-50" : "border-gray-200"
    }`}
    onClick={onSelect}
  >
    <h4 className="font-bold">
      {title} - CRC {price}/month
    </h4>
    <ul className="text-sm text-gray-600">
      {benefits.map((b, i) => (
        <li key={i}>- {b}</li>
      ))}
    </ul>
  </div>
);

export default SubscriptionTiers;
