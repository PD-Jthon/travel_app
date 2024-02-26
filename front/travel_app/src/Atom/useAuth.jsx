import { useUserState } from "./user";
import axios from "axios";
import getCookieValue from "../App";

const useUserAuth = () => {
  const { user, setUser } = useUserState();
  //ログイン済みか確認
  const userStatus = () => {
    const token = localStorage.getItem("token");
    console.log(localStorage);
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  const fetchUser = async () => {
    if (user) {
      return true;
    }
    try {
      const token = getCookieValue("token");
      console.log(token);
      const res = await axios({
        // url: "http://localhost:8000/dj-rest-auth/user/",
        url: `${process.env.REACT_APP_BASE_URL}/dj-rest-auth/user/`,
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
