import { motion } from "framer-motion";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, convertTimestampToUTC, currentDate, daysInYear, eclipseAddress, isFloat, path, screenWidth, season2ClaimLaunchDate, season2LaunchDate } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { retrieve, selectUserSlice, setIsQuestModalOpen, setRetrieveTime, setSelectedQuest } from "@/store/userSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import AirdropLive from "./AirdropLive";
import Avatar from "@/components/ui/Avatar";
import star from "@/assets/star.svg";
import rightCaret from "@/assets/right-caret.svg";
import airdrop from "@/assets/airdrop.svg";
import bridgeFuse from "@/assets/bridge-fuse.svg";
import { useIntersectionObserver, useMediaQuery } from "usehooks-ts";
import { CardBody, CardContainer, CardItem } from "../ui/Card3D";
import crownCircle from "@/assets/crown-circle.svg";
import Quest from "./Quest";
import fireTransparent from "@/assets/fire-transparent.svg";
import followX from "@/assets/follow-x.svg";
import holdTokens from "@/assets/hold-tokens.svg";
import ogWallet from "@/assets/og-wallet.svg";
import joinDiscord from "@/assets/join-discord.svg";
import stakeSfuse from "@/assets/stake-sfuse.svg";
import stakeVolt from "@/assets/stake-volt.svg";
import liquidityVoltage from "@/assets/liquidity-voltage.svg";
import sayGm from "@/assets/say-gm.svg";
import meridian from "@/assets/meridian.svg";
import logx from "@/assets/logx.svg";
import bitazza from "@/assets/bitazza.svg";
import zneakrz from "@/assets/zneakrz.svg";
import mirakle from "@/assets/mirakle.svg";
import joinTelegram from "@/assets/join-telegram.svg";
import voltApp from "@/assets/volt-app.svg";
import goodDollar from "@/public/gooddollar.png";
import goodDollarCircle from "@/assets/gooddollar-circle.svg";
import voltWallet from "@/assets/volt-wallet.svg";
import voltWalletTwoLines from "@/assets/volt-wallet-two-lines.svg";
import dementedRoulette from "@/assets/demented-roulette.svg";
import { EcosystemApps, Quests } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_ENVIRONMENT } from "@/lib/config";
import questionMarkCircle from "@/assets/question-mark-circle.svg";
import voltage from "@/assets/voltage.svg";
import dementedGamesColor from "@/assets/demented-games-color.svg";
import followXColor from "@/assets/follow-x-color.svg";
import holdTokensColor from "@/assets/hold-tokens-color.svg";
import joinDiscordColor from "@/assets/join-discord-color.svg";
import joinTelegramColor from "@/assets/join-telegram-color.svg";
import ogWalletColor from "@/assets/og-wallet-color.svg";
import shoebillFinanceColor from "@/assets/shoebill-finance-color.svg";
import voltWalletColor from "@/assets/volt-wallet-color.svg";
import voltageColor from "@/assets/voltage-color.svg";
import goodDollarColor from "@/public/gooddollar-color.png";
import logxColor from "@/public/logx-color.png";
import meridianColor from "@/public/meridian-color.png";
import mirakleColor from "@/public/mirakle-color.png";
import EcosystemAppItem from "./EcosystemApp";
import { useAccount } from "wagmi";

const isMultiplyPointNotice = false;
const ecosystemAppBackgrounds = {
  green: {
    background: "bg-[url('/vectors/multiply-quest-green-gradient.svg')]",
    beforeBackground: "before:bg-[url('/vectors/multiply-quest-green-gradient.svg')]",
  },
  blue: {
    background: "bg-[url('/vectors/multiply-quest-blue-gradient.svg')]",
    beforeBackground: "before:bg-[url('/vectors/multiply-quest-blue-gradient.svg')]",
  }
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const {  user, retrieveTime } = useAppSelector(selectUserSlice);
  const {address} = useAccount()
  const router = useRouter();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);
  const { isIntersecting: isUserSectionIntersecting, ref: userSection } = useIntersectionObserver({
    freezeOnceVisible: true,
  });
  const { isIntersecting: isEarningSectionIntersecting, ref: earningSection } = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  const [quests, setQuests] = useState<Quests>([
    {
      id: "telegramSubscription",
      title: "Join Nexis Network Telegram",
      heading: "Join Nexis Network Telegram channel",
      point: "50 points",
      description: "Get 50 point for joining an official Nexis Network Telegram channel  \n**Verify the quest 1 hour after completing it on Layer3**",
      image: joinTelegramColor,
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/join-fuse-telegram",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "telegram",
    },
    {
      id: "joinFuseDiscord",
      title: "Join Nexis Network Discord",
      image: joinDiscordColor,
      point: "50 points",
      description: "Get 50 point for joining an official Nexis Network Discord channel  \n**Verify the quest 1 hour after completing it on Layer3**",
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/join-fuse-discord",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "join-fuse-discord",
    },
    {
      id: "numOfTokens",
      title: "Holding more than 2 different tokens",
      point: "10 points",
      description: "Get 10 point by holding more than 2 different tokens on your wallet.\nPoints are awarded automatically when the conditions are met.",
      image: holdTokensColor,
      isActive: true,
    },
    {
      id: "walletAge",
      title: "You're an OG! - Wallet older then a year",
      point: "10 points",
      image: ogWalletColor,
      isActive: true,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/sFUSE",
    },
  ])
  
  const [ecosystemApps] = useState<EcosystemApps>([
    {
      name: "Shard Sale",
      description: "Node sales program, distributing tasks across network nodes for efficient processing",
      image: voltageColor,
      quests: [
        {
          id: "shardSaleNexis",
          title: "Provide Liquidity to Voltage v3",
          heading: "Multiply your points by providing liquidity on Voltage DEX",
          point: "8 points per $1 in pool daily",
          description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Nexis Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by putting bridged funds in any V3 liquidity pool on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
          isActive: true,
          button: "Go to Voltage",
          link: "https://voltage.finance/pool?filter=v3",
        }
      ]
    },
  ])

  function referralLink() {
    const host = !IS_SERVER ? window?.location?.host : ""
    return `${host}?ref=${address}`
  }

  useEffect(() => {
    const RETRIEVE_DIFFERENCE_IN_MILLISECONDS = 600000;

    function retrieveUser() {
      const currentTime = new Date();
      const retrieveUserTime = new Date(retrieveTime);
      if ((currentTime.getTime() - retrieveUserTime.getTime()) > RETRIEVE_DIFFERENCE_IN_MILLISECONDS) {
        dispatch(retrieve());
        dispatch(setRetrieveTime());
      }
    }

    const intervalId = setInterval(() => retrieveUser, RETRIEVE_DIFFERENCE_IN_MILLISECONDS);

    return () => {
      clearInterval(intervalId);
    }
  }, [dispatch, retrieveTime])

  useEffect(() => {
    setQuests((prevQuests) => {
      const newQuests = [...prevQuests];
      newQuests.map((newQuest) => {
        user.completedQuests?.map((completedQuest) => {
          let completedQuestId = completedQuest.type;
          if (completedQuest.stakingType) {
            completedQuestId = `${completedQuest.type}-${completedQuest.stakingType}`;
          }
          if (newQuest.id === completedQuestId) {
            newQuest.completed = true;
          }
        })
        return newQuest;
      });
      return newQuests;
    })
  }, [user.completedQuests])

  return (
    <motion.div
      className="w-8/9 flex flex-col mt-[65px] mb-[187px] xl:mt-[52px] xl:mb-[150px] xl:w-9/12 md:w-9/10 max-w-7xl"
      key="dashboard"
      initial={{
        y: 300,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      exit={{
        y: -300,
        opacity: 0
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-5xl xl:text-4xl md:text-3xl text-white font-semibold md:max-w-[198px] md:break-all md:truncate">
          Hey, {eclipseAddress(address!)}
        </h1>
        <AirdropLive />
      </div>
      <div ref={userSection} className={`transition-all ease-in-out duration-300 delay-200 flex flex-row lg:flex-col justify-between items-center lg:items-start lg:gap-[74px] bg-oslo-gray/[.22] rounded-[20px] mt-11 mb-[100px] xl:mb-11 p-[42px] xl:p-9 ${isUserSectionIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
        <div className="flex flex-row justify-between items-center w-1/2 lg:w-auto">
          <div className="flex flex-row items-center gap-10">
            <div className="relative">
              <Avatar size={matches ? 95 : 77} />
              {/* {(user.walletAgeInDays && user.walletAgeInDays > daysInYear) &&
                <div className="absolute -top-2 -right-2">
                  <div className="group relative">
                    <Image
                      src={crownCircle}
                      alt="crown circle"
                    />
                    <div className="tooltip-text hidden absolute translate-x-1/2 -translate-y-1/2 top-[calc(-50%-30px)] right-1/2 bg-white p-6 rounded-2xl w-[250px] xl:w-[200px] shadow-lg group-hover:block text-black text-sm font-medium">
                      <p>
                        You&apos;re an OG! your wallet is more than 1 year old
                      </p>
                    </div>
                  </div>
                </div>
              } */}
            </div>
            <div>
              <p className="text-lg xl:text-base leading-none text-pale-slate font-medium">
                Your XP points
              </p>
              <div className="flex items-center gap-1.5 mt-6 xl:mt-2 mb-2">
                <Image
                  src={star}
                  alt="star"
                  width={30}
                  height={30}
                  className="mb-0.5"
                />
                <p className="text-5xl xl:text-4xl md:text-3xl leading-none text-white font-bold">
                  {isFloat(user.points) ? user.points.toFixed(2) : user.points}
                </p>
              </div>
              <div className="flex md:flex-col items-center md:items-start gap-2">
                {/* <p className="text-sm xl:text-xs leading-none text-pale-slate font-medium xl:max-w-28">
                  Last update {convertTimestampToUTC(user.pointsLastUpdatedAt)}
                </p> */}
                {NEXT_PUBLIC_ENVIRONMENT === "staging" &&
                  <div className="group relative cursor-pointer flex justify-center items-center mb-1">
                    <Image
                      src={questionMarkCircle}
                      alt="question mark"
                    />
                    <div className="tooltip-text-up hidden top-8 absolute bg-white p-6 rounded-2xl w-[290px] shadow-lg group-hover:block text-black text-sm font-medium">
                      <p>
                        Points calculation updated every 24 hours. Next update {convertTimestampToUTC(user.nextRewardDistributionTime)}
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          {/* <div className="lg:hidden">
            <p className="text-lg xl:text-base leading-none text-pale-slate font-medium">
              Your Rank
            </p>
            <p className="text-5xl xl:text-4xl leading-none text-white font-bold mt-6 xl:mt-2 mb-2">
              {user.leaderboardPosition}
            </p>
            <Link
              href={path.LEADERBOARD}
              className="group flex items-center gap-1 text-sm xl:text-xs leading-none text-pale-slate font-medium"
            >
              View Leaderboard
              <Image
                src={rightCaret}
                alt="right caret"
                width={7}
                height={13}
                className="transition ease-in-out group-hover:translate-x-0.5"
              />
            </Link>
          </div> */}
        </div>
        <div className="flex flex-row items-center gap-[42px] md:gap-9">
          <Image
            src={airdrop}
            alt="airdrop"
            width={matches ? 94 : 75}
            height={matches ? 128 : 102}
          />
          {currentDate >= season2ClaimLaunchDate ?
            <div className="flex flex-col justify-between items-start gap-2.5">
              <p className="text-2xl xl:text-xl leading-none text-white font-bold">
                Claim reward for Season 1
              </p>
              <p className="text-sm text-pale-slate font-medium max-w-[254px]">
                You can claim your tokens now!
              </p>
              <button
                className="transition ease-in-out bg-primary border border-primary rounded-full xl:text-sm text-black leading-none font-semibold mt-[5px] px-9 py-4 xl:px-7 xl:py-2.5 md:px-5 hover:bg-transparent hover:text-primary"
                onClick={() => router.push(path.CLAIM)}
              >
                Claim your tokens
              </button>
            </div> :
            <div className="flex flex-col justify-between items-start gap-2.5">
              <p className="text-2xl xl:text-xl leading-none text-white font-bold">
                Reward for the Season 1 is coming
              </p>
              <p className="text-sm text-pale-slate font-medium max-w-[254px]">
                Claiming will be available very soon, we are calculating your rewards
              </p>
              <button
                className="transition ease-in-out bg-transparent border border-primary rounded-full xl:text-sm text-primary leading-none font-semibold mt-[5px] px-9 py-4 xl:px-7 xl:py-2.5 md:px-5"
                disabled
              >
                Coming Soon
              </button>
            </div>
          }
        </div>
      </div>
      {/* <div className="flex flex-col gap-8 xl:gap-6 mt-24 xl:mt-16">
        <p className="text-3xl xl:text-2xl text-white font-semibold">
          Follow Nexis on socials
        </p>
        <div className="grid grid-cols-4 xl:grid-cols-3 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-5">
          {quests.map((quest) => {
            if (quest.id === "walletAge" && !quest.completed) {
              return
            }
            if (quest.isHidden) {
              return
            }
            return (
              <Quest key={quest.title} quest={quest} />
            )
          })}
        </div>
      </div> */}
      <div className="flex flex-col gap-8 xl:gap-6 mb-24 xl:mb-16">
        <div className="flex items-center gap-2.5">
          {currentDate < season2LaunchDate &&
            <Image
              src={fireTransparent}
              alt="fire"
            />
          }
          <div className="flex md:flex-col items-end md:items-start gap-x-9">
            <p className="text-3xl xl:text-2xl text-white font-semibold">
              Explore Nexis Ecosystem projects & multiply your points
            </p>
            {(NEXT_PUBLIC_ENVIRONMENT === "staging" && isMultiplyPointNotice) &&
              <p className="text-lg text-buff">
                <span className="font-bold">Notice</span> you have 0 points to multiply! Please bridge to receive points.
              </p>
            }
          </div>
        </div>
          <div className="grid grid-cols-2 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-5">
            {ecosystemApps.map((ecosystemApp, i) => {
              if (ecosystemApp.isHidden) {
                return
              }
              return (
                <EcosystemAppItem
                  key={ecosystemApp.name}
                  ecosystemApp={{
                    background: i % 2 === 0 ? ecosystemAppBackgrounds.green.background : ecosystemAppBackgrounds.blue.background,
                    beforeBackground: i % 2 === 0 ? ecosystemAppBackgrounds.blue.beforeBackground : ecosystemAppBackgrounds.blue.beforeBackground,
                    ...ecosystemApp
                  }}
                />
              )
            })}
          </div>
      </div>
      <div className="flex flex-col gap-8 xl:gap-6">
        <p className="text-3xl xl:text-2xl text-white font-semibold">
          Start earning points
        </p>
        <div ref={earningSection} className={`transition-all ease-in-out duration-300 delay-200 flex flex-row md:flex-col gap-[30px] xl:gap-5 ${isEarningSectionIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          {/* <CardContainer containerClassName="block p-0 w-1/2 md:w-auto min-h-[283px] xl:min-h-56" className="block h-full">
            <CardBody className="bg-oslo-gray/[.22] rounded-[20px] flex md:flex-col justify-between md:gap-4 p-10 xl:p-[30px] w-auto h-full">
              <div className="flex flex-col justify-between md:gap-2">
                <div className="flex flex-col gap-4 xl:gap-3 md:gap-2">
                  <CardItem
                    as="p"
                    translateZ="50"
                    className="text-2xl xl:text-xl text-primary font-bold"
                  >
                    Bridge NZT
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-lg xl:text-base text-pale-slate font-medium max-w-[200px] md:max-w-[243px]"
                  >
                    Get 4 points daily on every $1 you bridge to Fuse
                  </CardItem>
                </div>
                <div>
                  <CardItem translateZ="80">
                    <button
                      className="transition ease-in-out border border-primary rounded-full text-primary leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 hover:bg-primary hover:text-black"
                      onClick={() => {
                        dispatch(setIsQuestModalOpen(true));
                        dispatch(setSelectedQuest({
                          id: "bridge",
                          title: "Bridge NZT",
                          heading: "Bridge to Nexis Network",
                          point: "4 point per 1 USD bridged",
                          image: bridgeFuse,
                          isActive: true,
                          button: "Go to the Bridge",
                          link: "https://console.nexis.network/bridge",
                        }));
                      }}
                    >
                      Learn More
                    </button>
                  </CardItem>
                </div>
              </div>
              <CardItem
                translateZ="40"
                className="md:m-auto"
              >
                <Image
                  src={bridgeFuse}
                  alt="bridge Fuse"
                  width={matches ? 284 : 227}
                  height={matches ? 209 : 167}
                />
              </CardItem>
            </CardBody>
          </CardContainer> */}
          <CardContainer containerClassName="block p-0 w-full md:w-auto min-h-[283px] xl:min-h-56 md:min-h-[430px]" className="block h-full md:min-h-[430px]">
            <CardBody className="bg-oslo-gray/[.22] rounded-[20px] flex flex-col justify-between md:justify-start xl:gap-2 md:gap-12 p-10 xl:p-[30px] w-auto h-full md:min-h-[430px] bg-[url('/vectors/globe.svg')] md:bg-[url('/vectors/globe-mobile.svg')] bg-no-repeat bg-right-bottom md:bg-bottom xl:bg-contain">
              <div className="flex flex-col gap-4 xl:gap-3">
                <CardItem
                  as="p"
                  translateZ="50"
                  className="text-2xl xl:text-xl text-primary font-bold"
                >
                  Invite friends
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-lg xl:text-base text-pale-slate font-medium max-w-[243px]"
                >
                  Get 20% of your friend&apos;s total points
                </CardItem>
              </div>
              <div className="flex flex-col gap-2.5 xl:gap-2">
                <CardItem
                  as="p"
                  translateZ="40"
                  className="text-sm xl:text-xs text-pale-slate font-medium"
                >
                  Invite link
                </CardItem>
                <div className="flex items-center gap-1.5 xl:gap-1">
                  <CardItem
                    as="p"
                    translateZ="70"
                    className="text-2xl xl:text-xl text-white font-bold md:max-w-[243px]"
                  >
                    {referralLink()}
                  </CardItem>
                  <CardItem translateZ="80">
                    <Copy
                      src={copyIcon}
                      text={referralLink()}
                      tooltipText="Referral link copied"
                      className="transition ease-in-out cursor-pointer hover:opacity-60"
                    />
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard;
