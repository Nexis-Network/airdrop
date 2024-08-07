```
  // const [ecosystemApps] = useState<EcosystemApps>([
  //   {
  //     name: "Voltage",
  //     description: "Trade, invest, and earn with just a few clicks",
  //     image: voltageColor,
  //     quests: [
  //       {
  //         id: "liquidityVoltage",
  //         title: "Provide Liquidity to Voltage v3",
  //         heading: "Multiply your points by providing liquidity on Voltage DEX",
  //         point: "8 points per $1 in pool daily",
  //         description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Nexis Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by putting bridged funds in any V3 liquidity pool on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
  //         isActive: true,
  //         button: "Go to Voltage",
  //         link: "https://voltage.finance/pool?filter=v3",
  //       },
  //       {
  //         id: "staking-sFuse",
  //         title: "Stake NZT to get s(NZT)",
  //         heading: "Multiply your points by staking NZT token on Voltage DEX",
  //         point: "8 points per $1 staked daily",
  //         description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Nexis Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a NZT token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
  //         isActive: true,
  //         button: "Go to Voltage",
  //         link: "https://app.voltage.finance/stake/sFUSE",
  //       },
  //       {
  //         id: "staking-veVolt",
  //         title: "Stake VOLT for veVOLT",
  //         heading: "Multiply your points by staking VOLT token on Voltage DEX",
  //         point: "8 points per $1 staked daily",
  //         description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Nexis Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a VOLT token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
  //         isActive: true,
  //         button: "Go to Voltage",
  //         link: "https://app.voltage.finance/stake/veVOLT",
  //       },
  //     ]
  //   },
  //   {
  //     name: "Meridian",
  //     description: "Lending and borrowing have never been so easy",
  //     image: meridianColor,
  //     quests: [
  //       {
  //         id: "meridian",
  //         title: "Lend on Meridian",
  //         point: "8 points per $1 in pool daily",
  //         heading: "Multiply your points by lend your funds on Meridian",
  //         description: "Lend on Meridian & Multiply your points easily with these quick steps  \n**Step 1**\nBridge funds to Nexis Network using the Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nVisit the Meridian Finance lending markets  \n**Step 3**\nDouble your points by lending bridged funds in any market = 8 points per $1 of the bridged funds, available once per day.",
  //         isActive: true,
  //         button: "Go to Meridian Lend",
  //         link: "https://lend.meridianfinance.net/markets/",
  //       },
  //       {
  //         id: "borrowOnMeridian",
  //         title: "Borrow on Meridian",
  //         point: "12 points per $1 borrowed",
  //         heading: "Triple your points by borrowing funds on Meridian",
  //         description: "Borrow any asset on Meridian to get 12 points per $1 borrowed every day.  \n**Points will begin to accrue 24 hours after the borrow transaction.**",
  //         isActive: true,
  //         button: "Go to Meridian Borrow",
  //         link: "https://lend.meridianfinance.net/borrow/",
  //       },
  //     ]
  //   },
  //   {
  //     name: "Volt Wallet",
  //     description: "Discover the best non-custodial smart-contract wallet",
  //     image: voltWalletColor,
  //     quests: [
  //       {
  //         id: "exploreVoltWallet",
  //         title: "Explore Volt wallet",
  //         heading: "Explore Volt mobile wallet",
  //         point: "200 points",
  //         description: "The Volt wallet is the best mobile solution for interacting with the Nexis Network, as it is built and developed by the Fuse team. Explore its features and get 200 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
  //         isActive: true,
  //         button: "Go to Quest",
  //         link: "https://app.layer3.xyz/quests/discover-volt-wallet",
  //         buttonTwo: "Verify Quest",
  //         isFunctionTwo: true,
  //         endpointTwo: "explore-volt-wallet",
  //       },
  //       {
  //         id: "depositInVoltApp",
  //         title: "Top-up Volt with $10",
  //         point: "500 points",
  //         heading: "Top-up Volt with 10 USDC using fiat-on-ramp",
  //         description: "Get 500 points by topping up your Volt wallet directly from your bank account or credit card  \n**Verify the quest 1 hour after completing it on Layer3**",
  //         isActive: true,
  //         button: "Go to Quest",
  //         link: "https://app.layer3.xyz/quests/deposit-10-usdc-on-volt-app",
  //         buttonTwo: "Verify Quest",
  //         isFunctionTwo: true,
  //         endpointTwo: "deposit-in-volt-app",
  //       },
  //       {
  //         id: "stakeFuseOnVolt",
  //         title: "Stake NZT on Volt",
  //         heading: "Stake NZT on Volt wallet",
  //         point: "2 points per $1 staked daily",
  //         description: "Get an additional benefits by participating in the Airdrop with the Volt wallet  \n**Step 1**\nJoin the Airdrop with Volt app  \n**Step 2**\nGo to Earn tab  \n**Step 3**\nStake any amount of NZT tokens to get 2 points per $1 staked every day",
  //         isActive: true,
  //         button: "Go to Volt",
  //         link: "https://get.voltage.finance/ThLA",
  //       },
  //     ]
  //   },
  //   {
  //     name: "LogX",
  //     description: "Seamless perpetual trading",
  //     image: logxColor,
  //     quests: [
  //       {
  //         id: "exploreLogXOnFuse",
  //         title: "Explore LogX on Fuse",
  //         heading: "Explore LogX on Nexis Network",
  //         point: "200 points",
  //         description: "Explore the earning and trading capabilities of LogX DEX and get 200 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
  //         isActive: true,
  //         button: "Go to Quest",
  //         link: "https://app.layer3.xyz/quests/logx-on-fuse",
  //         buttonTwo: "Verify Quest",
  //         isFunctionTwo: true,
  //         endpointTwo: "explore-logx-on-fuse",
  //       },
  //       {
  //         id: "provideLogXLiquidity",
  //         title: "Provide Liquidity on LogX",
  //         heading: "Multiply your points by providing Liquidity on LogX",
  //         point: "8 points per $1 in pool daily",
  //         description: "Follow these steps:  \n**Step 1**\nBridge USDT to the Nexis Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nGo to LogX and buy LLP tokens  \n**Step 3**\nDouble your points by staking LLP on LogX Liquidity Pool.  \n**Bonus**\nEarn protocol income and claimable USDT rewards.",
  //         isActive: true,
  //         button: "Go to LogX",
  //         link: "https://app.logx.trade/liquidity",
  //       },
  //     ]
  //   },
  //   {
  //     name: "Mirakle",
  //     description: "Spot and perpetual futures trading for traders",
  //     image: mirakleColor,
  //     quests: [
  //       {
  //         id: "exploreMirakle",
  //         title: "Explore Mirakle on Fuse",
  //         heading: "Explore Mirakle on Nexis Network",
  //         point: "100 points",
  //         description: "Explore Mirakle DEX capabilities and get 100 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
  //         isActive: true,
  //         button: "Go to Quest",
  //         link: "https://app.layer3.xyz/quests/explore-mirakle-on-fuse-network",
  //         buttonTwo: "Verify Quest",
  //         isFunctionTwo: true,
  //         endpointTwo: "mirakle",
  //       },
  //     ]
  //   },
  //   {
  //     name: "Demented Games",
  //     description: "Play, win WFUSE and get unlimited points",
  //     image: dementedGamesColor,
  //     quests: [
  //       {
  //         id: "dementedRoulette",
  //         title: "Play Demented Roulette",
  //         point: "Play to earn unlimited points",
  //         pointModal: "The more play, the more points get",
  //         description: "Earn tons of points and win WFUSE by playing the Demented Roulette!  \n**Step 1**\nGo to Demented Roulette  \n**Step 2**\nWin WFUSE and earn unlimited points by playing every round  \n**Step 3**\nPoints earned in roulette are added to Airdrop points in a 1:10 ratio - 1 airdrop point for every 10 roulette points.  \n**You can claim your points from roulette at any time**",
  //         isActive: true,
  //         button: "Let's Play",
  //         link: "https://demented.games/",
  //         buttonTwo: "Claim points",
  //         successButtonTwo: "Successfully claimed",
  //         isFunctionTwo: true,
  //         endpointTwo: "demented-roulette",
  //       },
  //     ]
  //   },
  //   {
  //     name: "GoodDollar",
  //     description: "Meet one of the largest communities at Fuse",
  //     image: goodDollarColor,
  //     quests: [
  //       {
  //         id: "goodDollar",
  //         title: "Claim G$ on GoodDapp",
  //         heading: "Get points daily for G$ claiming",
  //         point: "30 points per claim",
  //         description: "To get 30 points daily, you need to take 6 steps:  \n**Step 1:**\nGo to quest on the Layer3 platform  \n**Step 2:**\nConnect to Layer3 a wallet participating in the airdrop  \n**Step 3:**\nGo to GoodDapp  \n**Step 4:**\nClaim G$ token on Nexis Network  \n**Step 5:**\nVerify quest completion on the Layer3  \n**Step 6:**\nRepeat every day. After 5 claims, the quest will renew automatically and allow you to claim more and more.  \n**Verify the quest 1 hour after completing it on Layer3**",
  //         isActive: true,
  //         button: "Go to Quest",
  //         link: "https://app.layer3.xyz/streaks/claim-dollarg",
  //         buttonTwo: "Verify Quest",
  //         isFunctionTwo: true,
  //         endpointTwo: "gooddollar",
  //       },
  //     ]
  //   },
  // ])
```