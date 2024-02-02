import { atom, useRecoilState } from "recoil";

const userState = atom({
  key: "user",
  default: null,
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);

  return { user, setUser };
};
