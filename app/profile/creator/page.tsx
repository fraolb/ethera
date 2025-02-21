"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const CreatorPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tiers, setTiers] = useState({
    standard: "",
    premium: "",
    other: "",
  });
  const [loading, setLoading] = useState(false);

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
    if (!tiers.standard || !tiers.premium || !tiers.other) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Simulate API call or smart contract interaction
    try {
      console.log("Submitting tiers:", tiers);
      // Add logic to interact with your smart contract here

      // Redirect to the creator dashboard or home page
      router.push("/creator-dashboard");
    } catch (error) {
      console.error("Error submitting tiers:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full ">
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
                        htmlFor="other"
                        className="block text-sm font-medium text-gray-700"
                      >
                        VIP Tier Price (CRC)
                      </label>
                      <input
                        type="number"
                        id="other"
                        name="other"
                        value={tiers.other}
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
                        {loading ? "Submitting..." : "Submit"}
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
