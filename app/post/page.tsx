"use client";

import { useState, useContext } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CirclesSDKContext from "@/app/contexts/CirclesSDK";

interface notificationInterfact {
  message: string;
  type: string;
}

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState<"video" | "image" | "blog">(
    "video"
  );
  const [tier, setTier] = useState<"standard" | "premium" | "vip">("standard");
  const [content, setContent] = useState<File | string | null>("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] =
    useState<notificationInterfact | null>();

  // Use the Circles SDK context
  const { circlesAddress } = useContext(CirclesSDKContext);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    if (
      !title ||
      !description ||
      !contentType ||
      !tier ||
      !content ||
      !circlesAddress
    ) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      let contentLink = "";

      // Upload file to Cloudinary if content is not a blog
      if (contentType !== "blog") {
        const file = content as File;

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
        console.log("the res data is ", data);

        // Check if the upload was successful
        if (!res.ok) {
          throw new Error("Failed to upload file to Cloudinary");
        }

        contentLink = await `${data.contentUrl}`; // Get the secure URL of the uploaded file
      } else {
        contentLink = content as string; // For blog content, use the text directly
      }

      // Prepare the data to submit to your API
      const postData = {
        walletAddress: circlesAddress,
        title,
        description,
        contentType,
        tier,
        contentLink,
      };
      console.log("the postData is ", postData);

      // Submit the form data to your API
      const response = await fetch("/api/users/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(postData), // Serialize the object to JSON
      });

      if (!response.ok) {
        console.log("the res is ", response);
        throw new Error("Failed to submit content");
      }

      const result = await response.json();
      console.log("Content submitted successfully:", result, result?.error);

      // Reset the form
      setTitle("");
      setDescription("");
      setContentType("video");
      setTier("standard");
      setContent(null);

      setNotification({
        message: "Content submitted successfully!",
        type: "success",
      });

      // Redirect to the creator dashboard or home page
      //setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Error submitting content:", error);

      setNotification({
        message: "Error happened while submitting content!",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex w-full bg-gray-100 text-black">
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
        <div className="p-6 block md:grid md:grid-cols-4 gap-4">
          <div className="col-span-4 flex flex-col items-center  min-h-screen bg-white rounded-lg shadow-md p-4 pt-0">
            <h1 className="text-3xl font-bold mt-8 mb-0 ">
              Create New Content
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg  p-8 ">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter title"
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

                {/* Content Type */}
                <div>
                  <label
                    htmlFor="contentType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content Type
                  </label>
                  <select
                    id="contentType"
                    value={contentType}
                    onChange={(e) =>
                      setContentType(
                        e.target.value as "video" | "image" | "blog"
                      )
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="blog">Blog</option>
                  </select>
                </div>

                {/* Tier */}
                <div>
                  <label
                    htmlFor="tier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tier
                  </label>
                  <select
                    id="tier"
                    value={tier}
                    onChange={(e) =>
                      setTier(e.target.value as "vip" | "standard" | "premium")
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>

                {/* Content Input (Dynamic) */}
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  {contentType === "blog" ? (
                    <textarea
                      id="content"
                      value={content as string}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Write your blog content here"
                      rows={5}
                      required
                    />
                  ) : (
                    <input
                      type="file"
                      id="content"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setContent(e.target.files[0]);
                        }
                      }}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      accept={contentType === "video" ? "video/*" : "image/*"}
                      required
                    />
                  )}
                </div>

                {/* Submit Button */}
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
    </div>
  );
};

export default PostPage;
