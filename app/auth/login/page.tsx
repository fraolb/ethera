"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import { type Chain } from "viem";
import BgImage from "@/public/bgImage1.jpg";
import Logo from "@/public/ETHERALogo.png";

const GNOSIS_CHAIN_ID = 100; // Gnosis Chain ID

const GNOSIS_CHAIN: Chain = {
  id: 100,
  name: "Gnosis Chain",
  nativeCurrency: {
    decimals: 18,
    name: "xDai",
    symbol: "xDAI",
  },
  rpcUrls: {
    default: { http: ["https://rpc.gnosischain.com"] },
  },
  blockExplorers: {
    default: { name: "GnosisScan", url: "https://gnosisscan.io" },
  },
};

const LoginPage = () => {
  const router = useRouter();
  const { address, isConnected, chain } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const [loading, setLoading] = useState(false);

  // Check if the user is on the correct chain
  const isCorrectChain = chain?.id === GNOSIS_CHAIN_ID;

  const handleSwitchChain = async () => {
    console.log("handleSwichChain");
    try {
      await switchChain({ chainId: GNOSIS_CHAIN_ID });
    } catch (error) {
      console.error("Failed to switch chain:", error);
      // Optionally, you can prompt the user to add Gnosis Chain manually
      if (error?.code === 4902) {
        // MetaMask-specific error code for unrecognized chain
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [GNOSIS_CHAIN],
        });
      }
    }
  };

  useEffect(() => {
    if (isConnected && isCorrectChain) {
      router.push("/");
    }
  }, [isConnected, router, isCorrectChain]);

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
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-center w-96 z-10">
          <div className="flex justify-center  items-center space-x-2">
            <Image src={Logo} alt="Logo" width={100} height={50} />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            {isConnected ? "Logged In" : "Login with Gnosis Wallet"}
          </h2>
          <p className="text-black mb-6">
            {isConnected && isCorrectChain
              ? "Do you have Circles Avatar?"
              : `Connect your crypto wallet on Gnosis Chain to continue.`}
          </p>

          {isConnected ? (
            isCorrectChain ? (
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Connected as:
                </p>

                <p className="break-all text-gray-800">{`${address?.slice(
                  0,
                  4
                )}...${address?.slice(-4)}`}</p>
                <button
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div>
                <p className="text-red-500 text-sm mb-3">
                  ❌ You are on the wrong network!
                </p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition w-full"
                  onClick={handleSwitchChain}
                >
                  Switch to Gnosis Chain
                </button>
              </div>
            )
          ) : (
            <button
              onClick={() => {
                setLoading(true);
                connect({ connector: injected() });
                setTimeout(() => setLoading(false), 1500);
              }}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition w-full flex justify-center"
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
