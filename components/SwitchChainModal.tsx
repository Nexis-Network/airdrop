import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import close from "@/assets/close.svg";
import fuseGray from "@/assets/fuse-gray.svg";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import Image from "next/image";
import { resetConnection } from "@/lib/web3Auth";
import { useAppDispatch } from "@/store/store";
import { setLogout } from "@/store/userSlice";
import { defineChain } from "viem";

type ChainModalProps = {
  description?: string;
}

export const nexisDevnet = defineChain({
  id: 2371,
  name: 'Nexis Network Devnet',
  nativeCurrency: { name: 'NZT', symbol: 'NZT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evm-devnet.nexis.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://evm-devnet.nexscan.io',
      apiUrl: 'https://evm-devnet.nexscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xf7642be33a6b18D16a995657adb5a68CD0438aE2',
      blockCreated: 283775,
    },
  },
  testnet: true,
})


const SwitchChainModal = ({
  description = "Please switch to the Nexis Network to continue"
}: ChainModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { switchChain } = useSwitchChain()
  const { isConnected, chain } = useAccount();
  const dispatch = useAppDispatch();
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess() {
        dispatch(setLogout());
        resetConnection();
      }
    }
  });

  useEffect(() => {
    if (isConnected && chain?.id !== nexisDevnet.id) setIsOpen(true);
    else setIsOpen(false);
  }, [chain, isConnected]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex"
          id="modal-bg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            className="bg-white w-[400.88px] h-fit rounded-xl flex flex-col p-10 relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:w-full md:top-full md:-translate-y-full md:rounded-b-none md:p-4"
          >
            <Image
              src={close}
              alt="close"
              width={30}
              height={30}
              className="absolute top-7 right-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <p className="text-2xl text-dune font-bold max-w-[218.24px]">
              Wrong Network Connected
            </p>
            <p className="text-sm	text-dove-gray font-medium max-w-[252.62px] my-[26.5px]">
              {description}
            </p>
            <Image
              src={fuseGray}
              alt="Fuse gray"
              className="m-auto"
              onClick={() => setIsOpen(false)}
            />
            <button
              className="transition ease-in-out w-full bg-success text-lg font-bold text-black rounded-xl mt-[31.7px] mb-2.5 py-3.5 hover:bg-black hover:text-white"
              onClick={() => {
                switchChain({ chainId: nexisDevnet.id });
              }}
            >
              Switch to Nexis Network
            </button>
            <button
              className="transition ease-in-out w-full bg-dune text-lg font-bold text-white rounded-xl py-3.5 hover:bg-[#FFEBE9] hover:text-[#FD0F0F]"
              onClick={() => {
                disconnect();
                setIsOpen(false);
              }}
            >
              Disconnect Wallet
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SwitchChainModal;
