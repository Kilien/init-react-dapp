import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "New React Dapp",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, arbitrum, base],
  ssr: true,
});
