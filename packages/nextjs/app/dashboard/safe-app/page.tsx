"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SafeApps from "../../../components/superhack/SafeApps";
import { useAccountContext } from "../../../context/AccountContext";

const SafeAppsPage = () => {
  const router = useRouter();

  // const walletAddress = useAppStore(state => state.walletAddress);
  const { activeTokenMainAccount } = useAccountContext();

  useEffect(() => {
    if (!activeTokenMainAccount) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTokenMainAccount]);

  return (
    <div className="">
      <SafeApps isWC={false} />
    </div>
  );
};

export default SafeAppsPage;
