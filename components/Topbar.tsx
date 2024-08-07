import { useEffect, useState } from "react";
import fuseLogo from "@/assets/fuse-logo.svg";
import NavMenu from "./NavMenu";
import NavButton from "./NavButton";
import { useAppSelector } from "@/store/store";
import { selectNavbarSlice } from "@/store/navbarSlice";
import Image from "next/image";
import { selectUserSlice } from "@/store/userSlice";
import { currentDate, season2ClaimLaunchDate } from "@/lib/helpers";

const visitorMenuItems = [
  {
    title: "Dashboard",
    link: "/",
  },
  {
    title: "Bridge",
    link: "https://bridge.nexis.network",
  },
  {
    title: "Docs",
    link: "https://docs.nexis.network",
  },
  {
    title: "Community",
    link: "https://docs.nexis.network",
  },
]

const userMenuItems = [
  {
    title: "Airdrop",
    link: "/",
  },
  {
    title: "Leaderboard",
    link: "/leaderboard",
  },
]

const userSeason2MenuItems = [
  {
    title: "Airdrop",
    link: "/",
  },
  {
    title: "Claim",
    link: "/claim",
  },
  {
    title: "Leaderboard",
    link: "/leaderboard",
  },
]

const Topbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { selected } = useAppSelector(selectNavbarSlice);
  const { isUser, user } = useAppSelector(selectUserSlice);
  const [menuItems, setMenuItems] = useState(visitorMenuItems);

  useEffect(() => {
      setMenuItems(visitorMenuItems);
  }, [isUser, user.createdAt]);

  return (
    <nav className="w-full h-20 top-0 flex justify-center py-7 md:h-[32px] md:mt-2 z-[60]">
      <div className="flex justify-between h-full items-center w-[100%] px-8 relative">
        <span>
          <a href="/">
            <Image
              src={fuseLogo}
              alt="Fuse logo"
              width={86}
              height={24}
              className="z-50"
            />
          </a>
        </span>
        <NavMenu menuItems={menuItems} isOpen={isOpen} selected={selected} liClassName="w-fit whitespace-nowrap px-4 py-2.5" />
        <NavButton isOpen={isOpen} setOpen={setOpen} />
      </div>
    </nav>
  );
};

export default Topbar;
