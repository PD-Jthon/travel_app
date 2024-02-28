import axios from "axios";
import { useUserState } from "../Atom/user";

export default function GetUserInfo() {
  const { user, setUser } = useUserState();

  // ここでユーザーの情報を紹介してsetUserでuserにデータを登録している
  axios({
    url: `${process.env.REACT_APP_BASE_URL}/dj-rest-auth/user/`,
    method: "GET",
    withCredentials: true,
  })
    .then((res) => {
      console.log(res.data);
      setUser(res.data);
      const data = JSON.stringify(res.data);
      document.cookie = `user_info=${data}`;
    })
    .catch((error) => console.log(error));
}
