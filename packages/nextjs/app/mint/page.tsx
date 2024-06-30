"use client";

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import HomeHeader from "../../components/HomeHeader";
import { MetaHeader } from "../../components/MetaHeader";
import { useScaffoldReadContract, useScaffoldWriteContract } from "../../hooks/scaffold-eth";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { parseEther } from "viem";

const Mint: NextPage = () => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: mintPrice } = useScaffoldReadContract({
    contractName: "NBA",
    functionName: "price",
  });
  const { data: maxMintAmount, isLoading: isLoadingMaxMintAmount } = useScaffoldReadContract({
    contractName: "NBA",
    functionName: "maxMintAmount",
  });
  useEffect(() => {
    if (mintPrice) {
      const _price = parseFloat(ethers.formatEther(mintPrice));
      const nftMintPrice = _price * quantity;
      setPrice(nftMintPrice);
    }
  }, [mintPrice, quantity]);

  const { writeContractAsync: mintNft } = useScaffoldWriteContract("NBA");

  async function handleMintNft() {
    mintNft({
      functionName: "mintItem",
      args: [BigInt(quantity)],
      value: parseEther(String(price)),
    });
  }

  return (
    <main className="">
      <MetaHeader />
      <HomeHeader />
      <section
        className="bg-contain bg-bottom mt-16 pb-16 pt-10"
        style={{
          background: `url("/assets/bg1.png")`,
          backgroundPositionY: "bottom",
          backgroundSize: "contain",
          backgroundPositionX: "center",
        }}
      >
        <div className="container flex flex-col mx-auto py-32 items-center justify-center text-center">
          <div className="mb-6">
            <Image src={"/assets/erc.png"} width={136} height={136} alt="erc logo" />
          </div>
          <input
            type="number"
            value={quantity}
            placeholder="Quantity"
            className="input font-bai-jamjuree px-5 bg-transparent border border-gray-500  text-lg sm:text-2xl"
            onChange={e => {
              let val = parseInt(e.target.value);
              !val ? (val = 1) : val;
              setQuantity(val);
            }}
          />
          <button
            disabled={maxMintAmount ? quantity > maxMintAmount : false}
            className={`${isLoadingMaxMintAmount ? "loading" : ""} btn btn-secondly btn-lg mt-5`}
            onClick={handleMintNft}
          >
            Mint Nft
          </button>
        </div>
      </section>
    </main>
  );
};

export default Mint;
