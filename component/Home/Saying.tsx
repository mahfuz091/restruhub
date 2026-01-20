"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { FadeInWhenVisible } from "../shared/FadeInWhenVisible";

const Saying = () => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const testimonials = [
    {
      name: "Korin Green",
      position: "Director, ECDI Women’s Business Center",
      text: "From the very first planning call with IBAI, we knew they understood our mission. They tailored their workshop to our members, mixing clarity with enthusiasm. It was energizing, accessible for beginners and thought‑provoking for seasoned entrepreneurs..",
    },
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      text: "From the very first planning call with IBAI, we knew they understood our mission. They tailored their workshop to our members, mixing clarity with enthusiasm. It was energizing, accessible for beginners and thought‑provoking for seasoned entrepreneurs.",
    },
    {
      name: "Md. Rahman",
      position: "Founder, StartupBD",
      text: "From the very first planning call with IBAI, we knew they understood our mission. They tailored their workshop to our members, mixing clarity with enthusiasm. It was energizing, accessible for beginners and thought‑provoking for seasoned entrepreneurs.",
    },
  ];

  return (
    <div className="pt-7 lg:pt-28 overflow-hidden px-4 mf:px-0">
      <div
        className="  bg-no-repeat bg-top rounded-3xl -mx-4 md:mx-0 overflow-hidden "
        style={{ backgroundImage: "url('/Images/review-bg.png')" }}
      >
        <div className="container">
          <FadeInWhenVisible>
            <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 pt-10">
              <h2 className="title text-center md:text-left max-w-2xl">
                What Our Partners Are Saying
              </h2>

              <div className="flex gap-3 order-first md:order-last">
                <button
                  className={`swiper-prev-button cursor-pointer group h-12 w-12 md:h-12 md:w-13 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isPrevDisabled
                      ? "bg-white text-black border border-gray-300"
                      : "bg-secondary text-white hover:bg-secondary/90"
                  }`}
                >
                  <ArrowLeft
                    className={`w-6 h-6 transition-transform duration-300 cursor-pointer ${
                      !isPrevDisabled && "group-hover:-translate-x-1"
                    }`}
                  />
                </button>

                <button
                  className={`swiper-next-button cursor-pointer group h-12 w-12 md:h-12 md:w-13 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isNextDisabled
                      ? "bg-white text-black border border-gray-300"
                      : "bg-secondary text-white hover:bg-secondary/90"
                  }`}
                >
                  <ArrowRight
                    className={`w-6 h-6 transition-transform cursor-pointer duration-300 ${
                      !isNextDisabled && "group-hover:translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </FadeInWhenVisible>

          <div className="pt-60 -mx-4 md:mx-0 overflow-hidden">
             <FadeInWhenVisible delay={0.3}>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
              }}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".swiper-prev-button",
                nextEl: ".swiper-next-button",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;

                setIsPrevDisabled(swiper.isBeginning);
                setIsNextDisabled(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsPrevDisabled(swiper.isBeginning);
                setIsNextDisabled(swiper.isEnd);
              }}
              className="pb-8"
            >
              {testimonials.map((item, index) => (


                <SwiperSlide key={index}>
                  <div className="px-4 md:px-0">
                    <div
                      className="border group border-black/10 bg-white/95 backdrop-blur-sm  rounded-2xl p-6 lg:p-8 h-full flex flex-col  transition-shadow duration-300  overflow-hidden
             transition-all duration-700 ease-out
             hover:bg-white/90 hover:backdrop-blur-2xl
       
              shadow-[0px 4px 34px 0px #0000000A]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <Image
                        src="/Images/star-5.png"
                        alt="5 stars"
                        width={136}
                        height={24}
                        className="mb-5"
                      />
                      <p className="text-gray-700 text-base lg:text-lg leading-relaxed flex-row">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-4 mt-8">
                        <Image
                          src="/Images/client-img.png"
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-full ring-4 ring-white shadow-lg"
                        />
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saying;
