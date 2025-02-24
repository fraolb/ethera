import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import User, { IUser } from "@/models/creator"; // Import your User model and IUser interface
import { IContent } from "@/models/contents";

// Define the shape of the context
interface UserContextType {
  user: IUser | null;
  fetchUserData: (walletAddress: string) => Promise<void>;
  updateUserData: (updatedUser: IUser) => Promise<void>;
  isCreator: boolean;
  contents: IContent[] | null;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the props for the UserProvider component
interface UserProviderProps {
  children: ReactNode;
}

// Create the UserProvider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [contents, setContents] = useState<IContent[] | null>(null);
  const [isCreator, setIsCreator] = useState(true);

  // Function to fetch user data from MongoDB
  const fetchUserData = async (walletAddress: string) => {
    console.log("user data initialized");
    try {
      const response = await fetch(`/api/users/${walletAddress}`);
      if (!response.ok) {
        setIsCreator(false);
        return;
      }
      const data: IUser = await response.json();
      setUser(data);
      console.log("user data found ", data);
      setIsCreator(true);

      const contentResponse = await fetch(
        `/api/users/content/${walletAddress}`
      );
      if (!contentResponse.ok) {
        console.error("Failed to fetch content:", contentResponse);
        return;
      }

      const contentData: IContent[] = await contentResponse.json();
      console.log("Content data found:", contentData);
      setContents(contentData);
    } catch (error) {
      setIsCreator(false);
      console.error("Failed to fetch user data:", error);
    }
  };

  // Function to update user data
  const updateUserData = async (updatedUser: IUser) => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      const data: IUser = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, fetchUserData, updateUserData, isCreator, contents }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
