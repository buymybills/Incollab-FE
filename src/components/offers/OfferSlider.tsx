import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function OfferSlider({ children, className }: { children: React.ReactNode, className?: string }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    return (
        <div className={`slider-container relative ${className}`}>
            <Slider {...settings}>
                {children}
            </Slider>
            <style jsx global>
                {
                    `
                    .slider-container .slick-dots li {
                        margin: 0px;
                    }
                    .slider-container .slick-dots li button:before {
                        opacity: 1;
                        color: #999;
                    }
                    .slider-container .slick-dots li.slick-active button:before {
                        opacity: 1;
                        color: #000;
                    }
                    
                    /* Dark theme styles */
                    .dark .slider-container .slick-dots li button:before {
                        opacity: 1;
                        color: #999;
                    }
                    .dark .slider-container .slick-dots li.slick-active button:before {
                        opacity: 1;
                        color: #fff;
                    }
                    `
                }
            </style>
        </div>
    );
}

export default OfferSlider;