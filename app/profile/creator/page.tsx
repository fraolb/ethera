"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";
import { setSubscriptionTiers } from "@/utils/contract";
import { ethers } from "ethers";

interface notificationInterfact {
  message: string;
  type: string;
}

const CreatorPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tiers, setTiers] = useState({
    standard: "",
    premium: "",
    vip: "",
  });
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] =
    useState<notificationInterfact | null>();

  // Use the Circles SDK context
  const { circlesAddress } = useContext(CirclesSDKContext);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTiers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    if (!tiers.standard || !tiers.premium || !tiers.vip || !name) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // Convert tier prices from ETH to wei
      const tierPricesInWei: [bigint, bigint, bigint] = [
        ethers.parseEther(tiers.standard), // Convert standard tier to wei
        ethers.parseEther(tiers.premium), // Convert premium tier to wei
        ethers.parseEther(tiers.vip), // Convert other tier to wei
      ];

      // Get the signer from the wallet (e.g., MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Call the setSubscriptionTiers function to update the smart contract
      const txHash = await setSubscriptionTiers(signer, tierPricesInWei);
      console.log("Transaction hash:", txHash);

      // Simulate API call or smart contract interaction
      console.log("Submitting tiers:", tiers);

      let profileImg = "";
      if (profile !== null) {
        const file = profile as File;

        // Create a FormData object to upload the file
        const uploadData = new FormData();
        uploadData.append("file", file);

        // Upload the file to Cloudinary
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        // Read the response body only once
        const data = await res.json();

        // Check if the upload was successful
        if (!res.ok) {
          console.log("the res is ", res);
          throw new Error("Failed to upload file to Cloudinary");
        }

        profileImg = await `${data.contentUrl}`; // Get the secure URL of the uploaded file
      }

      // Create a new user
      const userData = {
        creator: name, // Use the name as the creator
        description: description,
        walletAddress: circlesAddress, // Replace with the actual wallet address
        profileImg,
        isCreator: true,
      };

      // Call the API route to create the user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if the response is not OK
      if (!response.ok) {
        // Parse the error response from the API
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to create user");
      }

      const newUser = await response.json();
      console.log("User created successfully:", newUser);

      setNotification({
        message: "User created successfully!",
        type: "success",
      });

      // Redirect to the creator dashboard or home page
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Error submitting tiers or creating user:", error);

      // Display the error message in an alert
      setNotification({
        message: "Error happened while creating user!",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex w-full min-h-screen text-black bg-gray-100">
      {notification && (
        <div
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-12 p-2 px-4 w-3/4 rounded shadow-lg z-10 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {notification.message}
        </div>
      )}
      <div className="w-1/6">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-3/4">
        <Header />
        <div className="p-6 grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="py-8  bg-white px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  Become a Creator
                </h1>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                  Add Subscription Tiers
                </h2>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Add your Profile name
                      </label>
                      <input
                        type="string"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Enter your Profile name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="descripton"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Post Description
                      </label>
                      <input
                        type="text"
                        id="descripton"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Enter Description"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profile Image
                      </label>

                      <input
                        type="file"
                        id="content"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setProfile(e.target.files[0]);
                          }
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        accept="image/*"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="standard"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Standard Tier Price (CRC)
                      </label>
                      <input
                        type="number"
                        id="standard"
                        name="standard"
                        value={tiers.standard}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Enter price in CRC"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="premium"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Premium Tier Price (CRC)
                      </label>
                      <input
                        type="number"
                        id="premium"
                        name="premium"
                        value={tiers.premium}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Enter price in CRC"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="vip"
                        className="block text-sm font-medium text-gray-700"
                      >
                        VIP Tier Price (CRC)
                      </label>
                      <input
                        type="number"
                        id="vip"
                        name="vip"
                        value={tiers.vip}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Enter price in CRC"
                        required
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-3 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Submitting...
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;
