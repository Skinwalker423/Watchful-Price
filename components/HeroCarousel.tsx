"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { heroImage } from "@/constants";

const HeroCarousel = () => {
  return (
    <div>
      <Carousel>
        {heroImage.map(({ imgUrl, alt }) => {
          return (
            <div className='flex w-full justify-evenly'>
              <Image
                src={imgUrl}
                width={20}
                height={20}
                alt={alt}
              />
              <p className='legend'>{alt}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
