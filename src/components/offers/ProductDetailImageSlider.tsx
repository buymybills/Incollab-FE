import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetailImageSlider({ children, className }: { children: React.ReactNode, className?: string }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className={`slider-container relative ${className}`}>
            <Slider {...settings}>
                {children}
            </Slider>
            <style jsx global>
                {
                    `
                    .slider-container .slick-dots {
                        bottom: 10px;
                    }
                    .slider-container .slick-dots li {
                        margin: -2px;
                    }
                   .slider-container .slick-dots li button:before {
                        content: '';
                        background-color: #999;
                        opacity: 1;
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .slider-container .slick-dots li.slick-active button:before {
                        content: '';
                        background-color: #282828;
                        opacity: 1;
                        width: 15px;
                        height: 6px;
                        border-radius: 3px;
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    `
                }
            </style>
        </div>
    );
}

export default ProductDetailImageSlider;