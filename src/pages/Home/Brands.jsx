import React from 'react';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// logo import
import amazon from '../../assets/brands/amazon.png';
import amazon_vector from '../../assets/brands/amazon_vector.png';
import casio from '../../assets/brands/casio.png';
import moonstar from '../../assets/brands/moonstar.png';
import randstad from '../../assets/brands/randstad.png';
import star from '../../assets/brands/star.png';
import start_people from '../../assets/brands/start_people.png';

const brandLogos = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

const Brands = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">
        We've helped thousands of sales teams
      </h2>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper mb-8"
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
