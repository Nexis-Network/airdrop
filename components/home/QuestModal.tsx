import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { generateTwitterAuthUrl, selectUserSlice, setIsQuestModalOpen, verifyQuest } from "@/store/userSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import closeWhite from "@/assets/close-white.svg";
import pointHexagon from "@/assets/point-hexagon.svg";
import { useMediaQuery } from "usehooks-ts";
import { screenWidth } from "@/lib/helpers";
import Spinner from "../ui/Spinner";
import Markdown from "react-markdown";

type QuestDescriptions = {
  [key: string]: React.ReactNode;
}

const BridgeDescription = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <p>
        Get 4 points daily for reach $1 bridged to Fuse
      </p>
      <div className="flex flex-col gap-2.5">
        <p className="font-bold">Quest conditions:</p>
        <ul className="list-disc max-w-[378px] text-left">
          <li>Bridge NZT, USDC, UDST or ETH token</li>
          <li>{"Points begin accumulating after >24 hours pass from the bridging transaction"}</li>
          <li>Do not swap or stake bridged assets on Console dApp</li>
        </ul>
      </div>
    </div>
  )
}

const questDescriptions: QuestDescriptions = {
  "bridge": <BridgeDescription />
}

const QuestModal = (): JSX.Element => {
  const { isQuestModalOpen, selectedQuest } = useAppSelector(selectUserSlice);
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);

  function handleClick(id: string, endpoint?: string) {
    if (endpoint) {
      return dispatch(verifyQuest({ endpoint }));
    }

    switch (id) {
      case "followFuseOnTwitter":
        dispatch(generateTwitterAuthUrl());
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "quest-modal-bg") {
        dispatch(setIsQuestModalOpen(false));
      }
    });
  }, [dispatch]);

  return (
    <AnimatePresence>
      {isQuestModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[80] flex backdrop-blur"
          id="quest-modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className="bg-tertiary h-fit max-h-[98%] overflow-y-auto w-[519px] xl:w-[415px] max-w-[95%] z-[80] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl"
          >
            <div className="relative flex flex-col justify-between min-h-[inherit] pt-9 xl:pt-7">
              <div className="absolute right-9 xl:right-7">
                <Image
                  src={closeWhite}
                  alt="close"
                  width={25}
                  height={25}
                  className="cursor-pointer hover:opacity-60"
                  onClick={() => dispatch(setIsQuestModalOpen(false))}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                {selectedQuest.image &&
                  <div className={`flex justify-center items-center ${selectedQuest.imageHeight ?? "h-[210px]"} xl:h-auto`}>
                    <Image
                      src={selectedQuest.image}
                      alt={selectedQuest.title}
                      className="pt-2.5"
                    />
                  </div>
                }
                <p className="text-2xl xl:text-xl leading-none text-white font-bold mt-8 max-w-md xl:max-w-xs">
                  {selectedQuest.heading ?? selectedQuest.title}
                </p>
                <div className="text-lg xl:text-base leading-6 text-pale-slate font-medium max-w-md xl:max-w-xs mt-5 whitespace-pre-wrap">
                  {
                    questDescriptions[selectedQuest.id] ??
                    <Markdown>{selectedQuest.description}</Markdown>
                  }
                </div>
                <div className="flex items-center self-start gap-2 text-left mt-12 ml-8 max-w-md xl:max-w-xs">
                  <Image
                    src={pointHexagon}
                    alt="point hexagon"
                    width={matches ? 20 : 16}
                    height={matches ? 23 : 19}
                  />
                  <p className="text-lg xl:text-base text-success font-bold">
                    {selectedQuest.pointModal ?? selectedQuest.point}
                  </p>
                </div>
              </div>
              <div className="min-h-[104px] xl:min-h-fit mt-10">
                <hr className="border-[0.3px] border-davy-gray" />
                <div className={`flex items-center gap-2 mt-7 mb-8 xl:mt-6 xl:mb-6.5 px-9 xl:px-7 ${selectedQuest.buttonTwo ? "justify-between" : "justify-end"}`}>
                  {selectedQuest.button &&
                    <button
                      className="transition ease-in-out bg-primary flex justify-center items-center gap-2 border border-primary rounded-full text-black leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 hover:bg-transparent hover:text-primary"
                      onClick={() => {
                        if (selectedQuest.isFunction) {
                          handleClick(selectedQuest.id);
                        }
                        if (selectedQuest.link) {
                          window.open(selectedQuest.link, "_blank")
                        }
                      }}
                    >
                      {selectedQuest.button}
                      {selectedQuest.isLoading &&
                        <Spinner />
                      }
                    </button>
                  }
                  {selectedQuest.buttonTwo &&
                    <button
                      className="transition ease-in-out bg-primary flex justify-center items-center gap-2 border border-primary rounded-full text-black leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 enabled:hover:bg-transparent enabled:hover:text-primary disabled:grayscale"
                      disabled={selectedQuest.isDisabledTwo}
                      onClick={() => {
                        if (selectedQuest.isFunctionTwo) {
                          handleClick(selectedQuest.id, selectedQuest.endpointTwo);
                        }
                        if (selectedQuest.linkTwo) {
                          window.open(selectedQuest.linkTwo, "_blank")
                        }
                      }}
                    >
                      {selectedQuest.buttonTwo}
                      {selectedQuest.isLoadingTwo &&
                        <Spinner />
                      }
                    </button>
                  }
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default QuestModal;
