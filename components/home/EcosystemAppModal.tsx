import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSelectedQuest, selectUserSlice, setIsEcosystemAppModalOpen, verifyQuest, initQuest } from "@/store/userSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import closeWhite from "@/assets/close-white.svg";
import pointHexagon from "@/assets/point-hexagon.svg";
import { useMediaQuery } from "usehooks-ts";
import { screenWidth } from "@/lib/helpers";
import Spinner from "../ui/Spinner";
import Markdown from "react-markdown";
import plus from "@/assets/plus.svg";
import minus from "@/assets/minus.svg";

const EcosystemAppModal = (): JSX.Element => {
  const { isEcosystemAppModalOpen, selectedEcosystemApp, selectedQuest } = useAppSelector(selectUserSlice);
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);
  const [purchaseSliderValue,setPurchaseSliderValue] = useState(0);
  const pricePerLicense = 10;
  const [totalPrice,setTotalPrice] = useState(10);

  function handleClick(id: string, endpoint?: string) {
    if (endpoint) {
      return dispatch(verifyQuest({ endpoint }));
    }
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "ecosystem-app-modal-bg") {
        dispatch(setIsEcosystemAppModalOpen(false));
      }
    });
  }, [dispatch]);

  console.log("selectedEcosystemApp==",selectedEcosystemApp)
  return (
    <AnimatePresence>
      {isEcosystemAppModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[80] flex backdrop-blur"
          id="ecosystem-app-modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className={`bg-tertiary w-full max-w-[880px] md:max-w-[95%] max-h-[90%] overflow-auto z-[80] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl before:content-[''] before:absolute before:w-full before:h-full before:-z-[1] before:bg-no-repeat before:rotate-180 before:bg-cover before:bg-left-top ${selectedEcosystemApp.beforeBackground}`}
          >
            <div className="flex flex-col p-12 xl:p-10">
              <div className="flex justify-between items-start">
                <Image
                  src={selectedEcosystemApp.image}
                  alt={selectedEcosystemApp.name}
                />
                <Image
                  src={closeWhite}
                  alt="close"
                  width={25}
                  height={25}
                  className="cursor-pointer hover:opacity-60"
                  onClick={() => dispatch(setIsEcosystemAppModalOpen(false))}
                />
              </div>
              <p className="text-lg xl:text-base text-white/70 font-medium mt-[29px] xl:mt-5">
                {selectedEcosystemApp.description}
              </p>
              <div className="flex flex-col gap-[22px] mt-[54px] xl:mt-11">
                {selectedEcosystemApp.quests[0].id==="shardSaleNexis"?<></>: <p className="text-2xl xl:text-xl text-white font-bold">
                  {selectedEcosystemApp.quests.length} quests
                </p>}
               
                <div className="flex flex-col gap-5">
                  {selectedEcosystemApp.quests.map((ecosystemAppQuest) => {
                    if (ecosystemAppQuest.isHidden) {
                      return;
                    }
                    if(ecosystemAppQuest.id==="shardSaleNexis"){
                      return (   <div
                        className="bg-oslo-gray/[0.22] rounded-[20px]"
                      >
                       <div className="flex flex-col items-start text-start gap-5 p-4">
                              <p className="text-lg xl:text-base text-white font-semibold pt-4">
                               Buy Shards
                              </p>
                              <input type="text" placeholder="referral code"
                              className="flex gap-2 bg-oslo-gray/30 rounded-md text-md leading-none text-white px-[20px] py-3.5 focus:outline-none placeholder:text-gray-200 w-[100%]"
                              />
                          <div className="text-white">
                            Purchase {purchaseSliderValue} Shard Licenses
                          </div>
                          <input 
                                  type="range" 
                                  className="w-full"
                                  min="0" 
                                  max="100" 
                                  step="1"
                                  value={purchaseSliderValue}
                                  onChange={(e)=>{
                                    setPurchaseSliderValue(parseInt(e.target.value))
                                    setTotalPrice(parseInt(e.target.value)*pricePerLicense)
                                  }}
                              />
                              <div>Price per License: ${pricePerLicense}</div>
                                <div>Total Price: ${totalPrice}</div>
                                <button
          className={`transition ease-in-out bg-primary flex justify-center items-center gap-2 rounded-full w-[163px] text-xl leading-none font-semibold py-[15px] hover:bg-white`}
        >

       Purchase
        </button>
                              </div>
                      </div>);
                    }
                    return (
                      <AnimatePresence
                        key={ecosystemAppQuest.id}
                      >
                        <div
                          className="bg-oslo-gray/[0.22] rounded-[20px]"
                        >
                          <button
                            className="flex justify-between items-center w-full pt-8 px-8 pb-6 xl:p-6 hover:opacity-90"
                            onClick={() => dispatch(setSelectedQuest(
                              selectedQuest.id === ecosystemAppQuest.id ?
                                initQuest :
                                ecosystemAppQuest
                            ))}
                          >
                            <div className="flex flex-col items-start text-start gap-5">
                              <p className="text-lg xl:text-base text-white font-semibold">
                                {selectedQuest.id === ecosystemAppQuest.id ?
                                  selectedQuest.heading ?? selectedQuest.title :
                                  ecosystemAppQuest.title
                                }
                              </p>
                              <div className="flex items-center gap-2">
                                <Image
                                  src={pointHexagon}
                                  alt="point hexagon"
                                  width={matches ? 12 : 10}
                                  height={matches ? 14 : 12}
                                />
                                <p className="text-lg xl:text-base text-success font-bold">
                                  {selectedQuest.id === ecosystemAppQuest.id ?
                                    ecosystemAppQuest.pointModal ?? ecosystemAppQuest.point :
                                    ecosystemAppQuest.point
                                  }
                                </p>
                              </div>
                            </div>
                            {selectedQuest.id === ecosystemAppQuest.id ?
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center"
                              >
                                <Image
                                  src={minus}
                                  alt="minus"
                                />
                              </motion.div>
                              :
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center"
                              >
                                <Image
                                  src={plus}
                                  alt="plus"
                                />
                              </motion.div>
                            }
                          </button>
                          {selectedQuest.id === ecosystemAppQuest.id &&
                            <motion.div
                              key={selectedQuest.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col items-start gap-10 pt-6 px-8 pb-8 xl:p-6"
                            >
                              <div className="text-lg xl:text-base leading-6 text-pale-slate font-medium whitespace-pre-wrap">
                                <Markdown>{selectedQuest.description}</Markdown>
                              </div>
                              <div className="flex md:flex-col items-center md:items-start gap-[26px] md:gap-4">
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
                                    className="transition ease-in-out bg-primary flex justify-center items-center gap-2 border border-primary rounded-full text-black leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 hover:bg-transparent hover:text-primary"
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
                            </motion.div>
                          }
                        </div>
                      </AnimatePresence>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default EcosystemAppModal;
