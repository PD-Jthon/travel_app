import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, Container, CssBaseline, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import LogInModal from "./LogInModal";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoggedInState } from "../Atom/atom";
import { useUserState } from "../Atom/user";
import { useUserInfo } from "../Atom/userInfo";
import GetUserInfo from "./GetUserInfo";

const defaultTheme = createTheme();
// export const tokenState = atom({
//   key: 'token',
//   default: '',
// })

export default function Login() {
  const [login, setLogin] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useRecoilState(LoggedInState);
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedInState);
  const { user, setUser } = useUserState();
  const { userInfo, setUserInfo } = useUserInfo();

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const HoverLink = styled.a`
    text-decoration: none;
    color: #3ca3ba;
    transition: color 0.2s;
    font-size: 14px;
    &:hover {
      color: #317585;
    }
  `;

  const cookie = document.cookie;

  const onSubmit = (data) => {
    console.log(data.email, data.password);
    setUser({
      email: data.email,
      password: data.password,
    });
    // document.cookie = `email=${data.email};`
    // document.cookie = `password=${data.password};`

    axios({
      // url: "http://localhost:8000/dj-rest-auth/login/",
      url: `${process.env.REACT_APP_BASE_URL}/dj-rest-auth/login`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "withCredentials": true,
      },
      data: {
        username: "",
        email: data.email,
        password: data.password,
      },
      withCredentials: true,
    })
      // todo: login失敗時と成功時でメッセージの切り替えを行う必要がある
      .then((res) => {
        setIsSuccess(true);
        setLoggedIn(true);
        setMessage("ログインに成功しました。");
        setModalOpen(true);
        const token = res.data["key"];
        console.log(token);
        localStorage.setItem("token", token);
        document.cookie = `token=${token};`;
        console.log(cookie);

        // ここでユーザーの情報を紹介してsetUserでuserにデータを登録している
        axios({
          // url: "http://localhost:8000/dj-rest-auth/user/",
          url: `${process.env.REACT_APP_BASE_URL}/dj-rest-auth/user`,
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
      })
      .catch((error) => {
        console.log(error);
        setIsSuccess(false);
        setMessage("ログインに失敗しました。");
        setModalOpen(true);
        // navigate("/fail_login")
      });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: {
                    value: true,
                    message: "メールアドレスを入力して下さい。",
                  },
                  pattern: {
                    value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                    message: "入力形式がメールアドレスではありません。",
                  },
                })}
                error={!!errors.email}
                // helperText={
                //   !!errors.email && "メールアドレスを入力してください。"
                // }
                // autoFocus
              />
              {errors.email && (
                <span
                  style={{ fontSize: "12px", color: "red", marginLeft: "12px" }}
                >
                  {errors.email.message}
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                {...register("password", {
                  required: {
                    value: true,
                    message: "パスワードを入力してください。",
                  },
                  minLength: {
                    value: 8,
                    message: "パスワードは最低８文字以上で入力してください。",
                  },
                })}
              />
              {errors.password && (
                <span
                  style={{ fontSize: "12px", color: "red", marginLeft: "12px" }}
                >
                  {errors.password.message}
                </span>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={(data) => handleRegistration(data)}
              >
                ログイン
              </Button>
              <Grid container>
                <Grid item xs>
                  <HoverLink href="#" variant="body2">
                    パスワードを忘れましたか？
                  </HoverLink>
                </Grid>
                {/* <Grid item>
                <HoverLink to="sign_up/">{"ユーザー登録はまだですか？"}</HoverLink>
              </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <button onClick={() => setModalOpen(true)}>Click</button>
      <LogInModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        isSuccess={isSuccess}
      >
        <h2>{message}</h2>
      </LogInModal>
    </>
  );
}
