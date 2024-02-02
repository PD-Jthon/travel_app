// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
// import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
// SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function FadeSlider() {
  const swiper = {
    loop: true,
    speed: 2000, //追加（スライドスピード）
    effect: "fade", //追加（フェードエフェクトを適用する）
    autoplay: {
      disableOnInteraction: false,
    },
    // pagination: {
    //   el: ".swiper-pagination",
    // },
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },
  };

  const swiperArrow = {
    color: "#fff",
    paddingRight: 100,
    paddingLeft: 100,
  };

  return (
    <>
      <Swiper
        {...swiper}
        pagination={{
          el: ".swiper-pagination",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="mySlider"
        spaceBetween={30}
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        loop={true}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide className="fade-slider">
          <img src="../../hotel_photos/house01.jpg" />
        </SwiperSlide>
        <SwiperSlide className="fade-slider">
          <img src="../../hotel_photos/house02.jpg" />
        </SwiperSlide>
        <SwiperSlide className="fade-slider">
          <img src="../../hotel_photos/house03.jpg" />
        </SwiperSlide>
        <SwiperSlide className="fade-slider">
          <img src="../../hotel_photos/house04.jpg" />
        </SwiperSlide>
        <SwiperSlide className="fade-slider">
          <img src="../../hotel_photos/house05.jpg" />
        </SwiperSlide>

        <div className="swiper-button-next" style={swiperArrow}></div>
        <div className="swiper-button-prev" style={swiperArrow}></div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </>
  );
}
