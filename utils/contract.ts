import { ethers } from "ethers";
import SubscriptionABI from "@/ABI/Subscription.json";
import CRC20ABI from "@/ABI/CRC20.json";

const subscriptionContractAddress =
  "0x035d4fDde12380709888B35ddCf57bF5Fc968B46";
const crcTokenAddress = "0x1d8D6E1ea2648A5DDB5E5e38A8A3732583F870E2";

export const getContract = (
  providerOrSigner: ethers.Provider | ethers.Signer
) => {
  return new ethers.Contract(
    subscriptionContractAddress,
    SubscriptionABI,
    providerOrSigner
  );
};

export const getCRCTokenContract = (signer: ethers.Signer) => {
  return new ethers.Contract(crcTokenAddress, CRC20ABI, signer);
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

export const setSubscriptionTiers = async (
  signer: ethers.Signer,
  tierPrices: [bigint, bigint, bigint]
) => {
  try {
    // Get the contract instance with the signer
    const contract = getContract(signer);

    console.log("the tier prices ", tierPrices);

    // Send the transaction
    const transaction = await contract.setSubscriptionTiers(tierPrices);

    // Wait for the transaction to be mined
    await transaction.wait();

    console.log("Transaction successful:", transaction.hash);
    return transaction.hash;
  } catch (error) {
    console.error("Error setting subscription tiers:", error);
    throw error;
  }
};

export const subscribeToCreator = async (
  signer: ethers.Signer,
  creatorAddress: string,
  tier: number
) => {
  try {
    // Get the subscription and CRC token contract instances
    const subscriptionContract = getContract(signer);
    const crcTokenContract = getCRCTokenContract(signer);

    // Get the price of the selected tier
    // const price = await subscriptionContract.getTierPrice(creatorAddress, tier);
    const price = ethers.parseEther("5");
    console.log("Tier price:", ethers.formatEther(price), "CRC");

    // Approve the subscription contract to spend the required amount of CRC tokens
    const approveTx = await crcTokenContract.approve(
      subscriptionContractAddress,
      price
    );
    await approveTx.wait();
    console.log("Approval successful:", approveTx.hash);

    // Call the subscribe function on the subscription contract
    const subscribeTx = await subscriptionContract.subscribe(
      creatorAddress,
      tier
    );
    await subscribeTx.wait();
    console.log("Subscription successful:", subscribeTx.hash);

    return subscribeTx.hash;
  } catch (error) {
    console.error("Error subscribing to creator:", error);
    throw error;
  }
};
