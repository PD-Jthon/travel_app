import { Container } from "@mui/material";
import FadeSlider from "../Common/FadeSlider";
import Header from "../Common/Header";
import PopularHotels from "../PopularHotels";
import SubCarousel from "./SubCarousel";
import PlanGrid from "../PlanGrid";
import Calendar from "../Calendar/Calendar";
import Prefecture from "../TopListDisplay/Prefecture";
import AlertTitle from "@mui/material/AlertTitle";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  useEffect(() => {
    const targetPath = "/";

    const currentPath = location.pathname;
    console.log(currentPath);

    if (currentPath === targetPath) {
      sessionStorage.removeItem("searchResult", "searchWord");
    }
  }, []);

  useEffect(() => {
    sessionStorage.clear();
  })

  return (
    <>
      <AlertTitle />
      <FadeSlider />
      <Container>
        <Calendar />
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
