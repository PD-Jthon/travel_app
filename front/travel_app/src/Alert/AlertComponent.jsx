import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { alertState, useAlert } from "./Alert";
import { Container } from "@mui/system";
import { useRecoilValue } from "recoil";

export default function GlobalAlert() {
  const { alert, hideAlert, setAlert } = useAlert();
  const value = useRecoilValue(alertState);
  console.log(value);
  return (
    <>
      <Container sx={{ top: 80, position: "fixed", zIndex: 99, left: 20, right: 20 }}>
        {alert && (
          <Alert severity={alert.severity} onClose={hideAlert}>
            {alert.message}
          </Alert>
        )}
      </Container>
    </>
  );
}
