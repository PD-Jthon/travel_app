import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Box } from "@mui/system";
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
