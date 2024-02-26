import * as React from "react";
import UnstyledInputIntroduction from "./Input";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

export default function Calendar() {
  return (
    <>
      <Container
        sx={{
          width: '100%',
          display: "flex",
          justifyContent: 'center',
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          zIndex: 8
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Grid item xs='auto'>
            <UnstyledInputIntroduction />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
