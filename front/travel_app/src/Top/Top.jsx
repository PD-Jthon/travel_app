import Button from "@mui/material/Button";

import { Box, Container, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import FadeSlider from "../Common/FadeSlider";
import Header from "../Common/Header";
import PopularHotels from "../PopularHotels";
import SubCarousel from "./SubCarousel";
import PlanGrid from "../PlanGrid";
import { MarginTwoTone } from "@mui/icons-material";
import Calendar from "../Calendar/Calendar";
import Prefecture from "../TopListDisplay/Prefecture";
import AlertTitle from "@mui/material/AlertTitle";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Top() {
  const container = {
    // marginBottom: 80,
    paddingTop: 40,
    paddingBottom: 120,
  };

  const planContainer = {
    paddingTop: 60,
    marginBottom: 80,
  };

  const calendarContainer = {
    maxWidth: "800px",
    marginTop: 60,
  };

  const location = useLocation();
  useEffect(() => {
    const targetPath = "/";

    const currentPath = location.pathname;
    console.log(currentPath);

    if (currentPath === targetPath) {
      sessionStorage.removeItem("searchResult", "searchWord");
    }
  }, []);

  // console.log(sessionStorage.getItem("searchResult", "searchWord"));

  return (
    <>
      <AlertTitle />
      <FadeSlider />
      <Container>
        <Calendar />   {/* カレンダーでなくインプット */}
      </Container>

      <Container>
        <Header />
      </Container>

      <Container style={planContainer}>
        <SubCarousel />
        <PlanGrid />
      </Container>

      <Container
        style={container}
        sx={{ background: "#F4F4F4", minWidth: "100vw" }}
      >
        <Container>
          <PopularHotels />
        </Container>
      </Container>
      <Container style={container}>
        <Prefecture />
      </Container>
    </>
  );
}
