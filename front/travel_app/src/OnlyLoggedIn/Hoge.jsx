import { Container } from "@mui/material";
import React from "react";

export default function Hoge() {
  return (
    <Container sx={{top: 200}}>
      <h1>ログインしていないとアクセスできないページです。</h1>
    </Container>
  );
}
