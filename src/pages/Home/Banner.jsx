import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

// img
import bannerImg1 from '../../assets/banner/banner1.png';
import bannerImg2 from '../../assets/banner/banner2.png';
import bannerImg3 from '../../assets/banner/banner3.png';

import { FiArrowUpRight } from 'react-icons/fi';

const Banner = () => {
  return (
    <header className="relative w-full my-8 ">
      <div className="relative">
        <Carousel autoPlay={true} infiniteLoop={true}>
          <div className="relative">
            <img src={bannerImg1} />
            <div className=""></div>
          </div>
          <div>
            <img src={bannerImg2} />
          </div>
          <div>
            <img src={bannerImg3} />
          </div>
        </Carousel>
        {/* btn  */}
        <div
          className="absolute 
          bottom-25
          left-10"
        >
          <button
            className="
          btn bg-secondary text-primary px-6 py-3 rounded-full border-0 shadow-lg z-10"
          >
            Track Your Parcel
          </button>
          <button className="btn bg-primary text-white rounded-full">
            <FiArrowUpRight />
          </button>
          <button className="btn btn-outline hover:btn-primary ml-3 rounded-full">
            Be A Rider
          </button>
        </div>
      </div>
    </header>
  );
};

export default Banner;
