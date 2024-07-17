import { path } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { retrieve, selectUserSlice, setCurrentComponent, setHydrate, setInviteCode } from "@/store/userSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react"
import { useAccount } from "wagmi";

const Init = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentComponent,isAuthenticating, isRetrieving, isCreating, isUser, user } = useAppSelector(selectUserSlice);
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  const twitterConnectedKey = 'twitter-connected';
  const twitterConnected = searchParams.get(twitterConnectedKey);
  const pathname = usePathname()

  useEffect(() => {
    dispatch(setHydrate());
  }, [dispatch])

  useEffect(() => {
    if (isUser) {
      dispatch(retrieve());
    }
  }, [dispatch, isUser])

  useEffect(() => {
    const authenticatedRoutes = [
      "/leaderboard",
      "/claim"
    ];

    if (isUser) {
      if (
        twitterConnected === "false"
      ) {
        dispatch(setCurrentComponent("dashboard"));
      } else {
        dispatch(setCurrentComponent("signup"));
      }
    } else {
      if (authenticatedRoutes.includes(pathname)) {
        router.push(path.HOME);
      } else if (twitterConnected) {
        dispatch(setCurrentComponent("signup"));
      } else if (currentComponent !== "landing") {
        dispatch(setCurrentComponent("dashboard"));
      }
    }
  }, [currentComponent, dispatch, isAuthenticating, isConnected, isCreating, isRetrieving, isUser, pathname, router, twitterConnected, user.createdAt, user.twitterAccountId])

  return (
    <></>
  )
}

export default Init;
