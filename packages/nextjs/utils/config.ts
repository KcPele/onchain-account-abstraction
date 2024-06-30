import { createConfig, http } from "@wagmi/core";
import { base, baseSepolia } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
});
