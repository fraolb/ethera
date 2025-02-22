"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { gnosis } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Chain } from "wagmi/chains";

const projectId = "4d9c3b0d7b2814d2c3a0e562017b56ee";

const supportedChains: Chain[] = [gnosis];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as [Chain, ...Chain[]],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
