import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        className="custom-arrow custom-prev-arrow"
        onClick={onClick}
        aria-label="Previous slide"
    >
        <span><ChevronLeft size={25}/></span>
    </button>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        className="custom-arrow custom-next-arrow"
        onClick={onClick}
        aria-label="Next slide"
    >
        <span><ChevronRight size={25}/></span>
    </button>
);

function HeroSlider({ children, className }: { children: React.ReactNode, className?: string }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2.03,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
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
        <div className={`slider-container ${className}`}>
            <style jsx global>{`
                .slider-container {
                    position: relative;
                    max-width: 1500px;
                    margin: 0 auto;
                }

                /* Base spacing - maintain your current slide sizes */
                .slider-container .slick-slide > div {
                    padding: 0 10px;
                }

                .slider-container .slick-list {
                    margin: 0 155px; /* Your original margin */
                }

                /* Responsive spacing adjustments - only change gaps, not slide sizes */
                @media (min-width: 1920px) {
                    .slider-container .slick-slide > div {
                        padding: 0 20px; /* Reduce gap on very large screens */
                    }
                }

                @media (min-width: 1600px) and (max-width: 1919px) {
                    .slider-container .slick-slide > div {
                        padding: 0 20px; /* Slightly increase gap */
                    }
                }

                @media (min-width: 1440px) and (max-width: 1599px) {
                    .slider-container .slick-slide > div {
                        padding: 0 24px; /* Your current spacing */
                    }
                }

                @media (min-width: 1280px) and (max-width: 1439px) {
                    .slider-container .slick-slide > div {
                        padding: 0 18px; /* Increase gap slightly */
                    }
                }

                @media (max-width: 1279px) {
                    .slider-container .slick-list {
                        margin: 0 120px;
                    }
                    .slider-container .slick-slide > div {
                        padding: 0 15px;
                    }
                }

                @media (max-width: 1024px) {
                    .slider-container .slick-list {
                        margin: 0 80px;
                    }
                    .slider-container .slick-slide > div {
                        padding: 0 12px;
                    }
                }

                @media (max-width: 768px) {
                    .slider-container .slick-list {
                        margin: 0 60px;
                    }
                    .slider-container .slick-slide > div {
                        padding: 0 8px;
                    }
                }

                @media (max-width: 480px) {
                    .slider-container .slick-list {
                        margin: 0 40px;
                    }
                    .slider-container .slick-slide > div {
                        padding: 0 6px;
                    }
                }

                /* Custom Arrow Styles */
                .custom-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 44px;
                    width: 44px;
                    background: #fff;
                    border: none;
                    border-radius: 50%;
                    color: #000;
                    cursor: pointer;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    font-size: 24px;
                    z-index: 10;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .custom-arrow:hover {
                    background: #f8f9fa;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .custom-prev-arrow {
                    left: 80px;
                }

                .custom-next-arrow {
                    right: 80px;
                }

                /* Responsive arrow positioning to match your original setup */
                @media (min-width: 1920px) {
                    .custom-prev-arrow {
                        left: 80px;
                    }
                    .custom-next-arrow {
                        right: 80px;
                    }
                }

                @media (max-width: 1279px) {
                    .custom-prev-arrow {
                        left: 60px;
                    }
                    .custom-next-arrow {
                        right: 60px;
                    }
                }

                @media (max-width: 768px) {
                    .custom-arrow {
                        height: 36px;
                        width: 36px;
                        font-size: 20px;
                    }
                    .custom-prev-arrow {
                        left: 10px;
                    }
                    .custom-next-arrow {
                        right: 10px;
                    }
                }

                @media (max-width: 480px) {
                    .custom-arrow {
                        height: 32px;
                        width: 32px;
                        font-size: 18px;
                    }
                    .custom-prev-arrow {
                        left: 5px;
                    }
                    .custom-next-arrow {
                        right: 5px;
                    }
                }

                .custom-arrow span {
                    line-height: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }

                .custom-arrow svg {
                    display: block;
                }

                /* Hide default arrows */
                .slider-container .slick-prev,
                .slider-container .slick-next {
                    display: none !important;
                }

                /* Ensure slides maintain aspect ratio */
                .slider-container .slick-slide img {
                width: 100%;
                height: 330px;
                border-radius: 20px;
                object-fit: cover;
}
            `}</style>
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    );
}

export default HeroSlider;