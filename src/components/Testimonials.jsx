import themeUrl from "../utils/themeUrl"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';

import { Scrollbar } from 'swiper/modules';

import { testimonialsData } from "../data/testimonialsData";


export default function Testimonials() {
  return (
    <>
        <style>
            {`
                #Testimonials .swiper-scrollbar.swiper-scrollbar-horizontal {
                    background: #F8F7FF1F;
                }
                #Testimonials .swiper-scrollbar-drag{
                    background: linear-gradient(90deg,#5999FF,#A55CFF,#F25DEA);
                }
                #Testimonials .testimonial-item{
                    background-image: url('${themeUrl}/assets/home/testimonials-bg.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            `}
        </style>
        <div className="container max-w-full p-0 m-0">
            <div className='py-4'>
                <div className="block__title text-center mb-8">
                    <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl leading-normal">
                        <span className="gradient-text  text-3xl lg:text-5xl xl:text-6xl">آراء </span>
                        <span className="text-3xl lg:text-5xl xl:text-6xl">عملائنا</span>
                    </h2>
                </div>
                <Swiper
                scrollbar={{
                    hide: false,
                }}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2
                    },
                    1200: {
                        slidesPerView: 3
                    }
                }}
                spaceBetween={30}
                modules={[Scrollbar]}
                className="mySwiper py-8!"
                >
                    {
                        testimonialsData.map((testimonial)=>(
                            <SwiperSlide className='testimonial-item'>
                                <div className="testimonial-content h-80 p-4 flex justify-center items-center flex-col text-center gap-4">
                                    <h2 className='client-name font-bold text-3xl'>{testimonial.clientName}</h2>
                                    <p className='client-opinion leading-normal text-xl'>{testimonial.clientOpinion}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    </>
  );
}