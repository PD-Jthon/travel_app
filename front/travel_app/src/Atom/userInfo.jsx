import { atom, useRecoilState } from "recoil";

const userInfoState = atom({
  key: "userInfo",
  default: [],
});

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  return { userInfo, setUserInfo };
}