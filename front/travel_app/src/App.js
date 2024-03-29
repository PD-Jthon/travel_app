import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Top from "./Top/Top";
import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Detail from "./Detail/Detail";
import Footer from "./Common/Footer";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchHotel from "./SearchHotel/SearchHotel";
import SignUp from "./AuthTemplates/SignUp";
import Login from "./AuthTemplates/Login";
import useUserAuth from "./Atom/useAuth";
import Hoge from "./OnlyLoggedIn/Hoge";
import { LoggedInState } from "./Atom/atom";
import { useRecoilState } from "recoil";
import DrawerAppBar from "./Common/Header";
import GlobalAlert from "./Alert/AlertComponent";
import { SearchRoutes } from "./SearchHotel/SearchRoutes";
import Reservation from "./Reservation/Reservation";
import axios from "axios";
import GetCookieValue from "./GetCookie.jsx/GetCookie";
import { DetailRoutes } from "./Detail/DetailRoutes";
import { useUserState } from "./Atom/user";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const { userStatus, fetchUser } = useUserAuth();
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedInState);
  const [authChecked, setAuthChecked] = useState(false);
  const { user, setUser } = useUserState();

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      return setAuthChecked(true);
    };
    init();
  }, []);
  const RouteAuthGuard = () => {
    //ログイン状態の確認が完了していればログインチェックさせる
    if (authChecked) {
      return userStatus() ? <Outlet /> : <Navigate to="/login" replace />;
    } else {
      return <></>;
    }
  };

  // ログインしていなかった場合自動的にログアウトする
  useEffect(() => {
    if (!isLoggedIn && !authChecked) {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/dj-rest-auth/logout`,
        method: "GET",
      })
        .then(console.log("ログアウトしました。"))
        .catch(console.log("ログアウトに失敗しました。"));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = GetCookieValue("token");
    console.log(token);
    console.log(GetCookieValue("email"));
    console.log(GetCookieValue("password"));

    axios({
      url: `${process.env.REACT_APP_BASE_URL}/top/check-login-status`,
      method: "GET",
      withCredentials: true, // Move this here
    })
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          const userStatus = GetCookieValue("user_info");
          setUser(userStatus);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLoggedIn]);

  return (
    <>
      <HashRouter>
        <Container>
          <DrawerAppBar authenticated={isLoggedIn} />
        </Container>
        <GlobalAlert />

        <div style={{ minHeight: "100vh" }}>
          <ScrollToTop />
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Top />} />
              <Route path="top/detail/:pk" element={<Detail />} />
              <Route path="top/search/:pref" element={<SearchHotel />} />
              <Route path="top/search-word" element={<SearchHotel />} />
              {SearchRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${route.path}`}
                  element={route.children}
                />
              ))}
              {DetailRoutes.map((elem) => (
                <Route
                  key={elem.path}
                  exact={elem.exact}
                  path={`${elem.path}`}
                  element={elem.children}
                />
              ))}
              <Route path="top/reservation" element={<Reservation />} />
              <Route path="sign_up/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RouteAuthGuard />}>
                <Route path="/hoge" element={<Hoge />} />
                <Route path="/reservation" element={<Reservation />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </div>
        <Footer style={{ position: "fixed" }} />
      </HashRouter>
    </>
  );
}
