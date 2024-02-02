import React, { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import SuccessModal from "./SuccessModal";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate(); // historyオブジェクトを取得

  const [ModalOpen, setModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const onSubmit = (data) => {
    console.log(data)
    axios({
      url: "http://localhost:8000/dj-rest-auth/registration/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: data.username,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
      },
    })
      .then(() => {
        setMessage('会員登録に成功しました。')
        setIsSuccess(true)
        setModalOpen(true);
        // navigate("/signup_success");
      })
      .catch((error) => {
        console.log(error)
        setModalOpen(true);
        setIsSuccess(false);
        setMessage('会員登録に失敗しました。')
      });
  };

  // const handleSubmit = (event) => {
  //   console.log(event);
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget); // event.currentTargetでフォームのデータを取得できる
  //   console.log({
  //     username: data.get("username"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  //   axios({
  //     url: "http://localhost:8000/dj-rest-auth/registration/",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       username: data.get("username"),
  //       email: data.get("email"),
  //       password1: data.get("password1"),
  //       password2: data.get("password2"),
  //     },
  //   })
  //     .then(() => navigate("/signup_success"))
  //     .catch((error) => console.log(error));
  // };

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
                // required
                fullWidth
                id="username"
                label="ユーザー名"
                name="username"
                autoComplete=""
                autoFocus
                {...register("username", {
                  required: {
                    value: true,
                    message: "名前を入力してください。",
                  },
                })}
                error={!!errors.username}
                // helperText={!!errors.username && "名前を入力してください。"}
                // onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <span
                  style={{ fontSize: "12px", color: "red", marginLeft: "12px" }}
                >
                  {errors.username.message}
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
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
                name="password1"
                label="パスワード"
                type="password"
                id="password1"
                autoComplete="current-password"
                error={!!errors.password1}
                {...register("password1", {
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
              {errors.password1 && (
                <span
                  style={{ fontSize: "12px", color: "red", marginLeft: "12px" }}
                >
                  {errors.password1.message}
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="パスワード(確認用)"
                type="password"
                id="password2"
                autoComplete="current-password"
                error={!!errors.password1}
                // todo: ここのパスワード確認のためのプログラムは復習しておくこと
                {...register("password2", {
                  validate: (value) =>
                    value === getValues("password1") ||
                    "パスワードが一致しません。",
                  required: true,
                })}
              />
              {errors.password2 && (
                <span
                  style={{ fontSize: "12px", color: "red", marginLeft: "12px" }}
                >
                  {errors.password2.message}
                </span>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="次回から自動的にログイン"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={(data) => handleRegistration(data)}
              >
                登録
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
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
      {/* <button onClick={() => setModalOpen(true)}>Click</button> */}
      <SuccessModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} isSuccess={isSuccess}>
        <h2>{message}</h2>
      </SuccessModal>
    </>
  );
}
