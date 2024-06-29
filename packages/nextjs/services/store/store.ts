import { create } from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
  };
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  setIsNativeCurrencyFetching: (newIsNativeCurrencyFetching: boolean) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
  },
  setNativeCurrencyPrice: (newValue: number): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, price: newValue } })),
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, isFetching: newValue } })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
}));

type TAppStore = {
  ethPrice: number;
  setEthPrice: (newEthPriceState: number) => void;

  walletAddress: string;
  setWalletAddress: (newAddress: string) => void;

  currentWalletContract: any;
  setCurrentWalletContract: (wallet: any) => void;

  txPoolLength: string | any;
  setTxPoolLength: (value: any) => void;
};

export const useAppStore = create<TAppStore>(set => ({
  ethPrice: 0,
  setEthPrice: (newValue: number): void => set(() => ({ ethPrice: newValue })),
  walletAddress: "",
  setWalletAddress: (newAddress: string): void => set(() => ({ walletAddress: newAddress })),

  currentWalletContract: undefined,
  setCurrentWalletContract: (wallet: any): void => set(() => ({ currentWalletContract: wallet })),

  txPoolLength: undefined,
  setTxPoolLength: (value: any): void => set(() => ({ txPoolLength: value })),
}));
