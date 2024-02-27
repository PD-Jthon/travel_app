import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import "./style.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid, Link } from "@mui/material";
import { Pagination, Navigation } from "swiper";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useSwiper } from "swiper/react";

// icon
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function PlanCarousel() {

  const section = {
    // minHeight: "100px",
    padding: 40,
    // paddingTop: 5,
    backgroundColor: "rgb(247, 247, 247)",
    display: "flex",
    justifyContent: "center",
  };



  const gridItemStyle = {
    display: {
      xs: 'flex',
    },
    justifyContent: {
      xs: "center",
    },
    marginBottom: 2
  };


  return (
    <>
      <h2 style={{ marginTop: 50, marginBottom: 50 }}>
        SAMURAI Travelでお得に泊まる
      </h2>
      <Container>
        <Grid
          container
          alingItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12} lg={3} md={4} sx={gridItemStyle}>
            <CardActionArea href="">
              <Paper elevation={3} style={section}>
                <AccountCircleOutlinedIcon style={{ marginRight: 5 }} />
                会員限定プラン
              </Paper>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} lg={3} md={4} sx={gridItemStyle}>
            <CardActionArea href="">
              <Paper elevation={3} style={section}>
                <AccessAlarmsOutlinedIcon style={{ marginRight: 5 }} />
                タイムセール
              </Paper>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} lg={3} md={4} sx={gridItemStyle}>
            <CardActionArea href="">
              <Paper elevation={3} style={section}>
                <CalendarTodayIcon />
                <ScheduleIcon style={{ paddin: 2, marginRight: 5 }} />
                直前割
              </Paper>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} lg={3} md={4} sx={gridItemStyle}>
            <CardActionArea href="">
              <Paper elevation={3} style={section}>
                <EventAvailableIcon style={{ marginRight: 5 }} />
                早期割
              </Paper>
            </CardActionArea>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
