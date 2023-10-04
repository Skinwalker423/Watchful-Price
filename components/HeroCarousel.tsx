"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { heroImages } from "@/constants";

const HeroCarousel = () => {
  return (
    <div className='hero-carousel'>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        stopOnHover
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map(({ imgUrl, alt }) => {
          return (
            <div
              key={alt}
              className='flex w-full justify-evenly'
            >
              <Image
                src={imgUrl}
                width={484}
                height={484}
                alt={alt}
                className='object-contain'
              />
              {/* <p className='legend'>{alt}</p> */}
            </div>
          );
        })}
      </Carousel>
      <Image
        src={"assets/icons/hand-drawn-arrow.svg"}
        width={175}
        height={175}
        alt='hand drawn arrow'
        className='absolute bottom-0 -left-24 max-xl:hidden'
      />
    </div>
  );
};

export default HeroCarousel;
