import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Pagination, Navigation } from "swiper";

export default function PlanCarousel() {
  const swiperArrow = {
    color: "#fff",
    paddingRight: 40,
    paddingLeft: 40,
  };

  return (
    <>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        style={{ maxWidth: 1300, marginTop: 30 }}
        className="sample-slider"
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={3} // 追記
        spaceBetween={20} // スライド間のスペース
        slidesPerGroup={3} // 次の3つを表示する
        speed={2000} // 追記
      >
        <SwiperSlide>
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../hotel_photos/house01.jpg"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../hotel_photos/house02.jpg"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../hotel_photos/house03.jpg"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../hotel_photos/house04.jpg"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../hotel_photos/house05.jpg"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="../../hotel_photos/house06.jpg"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </SwiperSlide>
        <div className="swiper-button-next" style={swiperArrow}></div>
        <div className="swiper-button-prev" style={swiperArrow}></div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </>
  );
}
