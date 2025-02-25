import { ethers } from "ethers";
import SubscriptionABI from "@/ABI/Subscription.json";

const contractAddress = "0x361CBd908fa8D79F6cFeD01dAEc3309fC2a1132d";

export const getContract = (provider: ethers.Provider) => {
  return new ethers.Contract(contractAddress, SubscriptionABI, provider);
};

export const fetchUserSubscriptions = async (walletAddress: string) => {
  console.log("json rpc ", process.env.NEXT_PUBLIC_RPC_PROVIDER);
  const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_PROVIDER
  );
  const contract = getContract(provider);
  const result = await contract.getUserSubscriptions(walletAddress);

  console.log("the result from sc is ", result);

  // Convert the Result object to a plain array or object
  const subscriptions = result.map((subscription: any) => ({
    creator: subscription.creator,
    tier: subscription.tier,
    expiry: subscription.expiry,
    // Add other fields as needed
  }));

  return subscriptions;
};
