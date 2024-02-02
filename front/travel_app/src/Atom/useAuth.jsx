import { useUserState } from "./user";
import { LoggedInState } from "./atom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import getCookieValue from "../App";

const useUserAuth = () => {
  const { user, setUser } = useUserState();
  // const token = useRecoilValue(tokenState);
  // console.log(token);
  //ログイン済みか確認
  const userStatus = () => {
    const token = localStorage.getItem("token");
    console.log(localStorage);
    if (token) {
      return true;
    } else {
      return false;
    }
    // return token ? true : false;
  };
  //Laravel側にログイン状態を確認
  const fetchUser = async () => {
    if (user) {
      return true;
    }
    try {
      // console.log(token);
      // const token = localStorage.getItem('token')
      const token = getCookieValue('token')
      console.log(token);
      const res = await axios({
        url: "http://localhost:8000/dj-rest-auth/user/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (!res.data) {
        setUser(null);
        return false;
      }
      setUser(res.data);
      return true;
    } catch {
      return false;
    }
  };

  return { userStatus, fetchUser };
};
export default useUserAuth;
