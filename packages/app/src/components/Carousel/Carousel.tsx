import Slider from "react-slick";
import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";
import "slick-carousel/slick/slick-theme.css";

import "./Carousel.scss";

const Arrow: React.FC<any> = ({
  className,
  style,
  onClick,
  height,
  direction,
}) => {
  return (
    <div
      {...{ onClick }}
      className={`${direction} ${className}`}
      style={{ top: height / 2 }}
    >
      <img src={direction === "forward" ? forward : backward} />
    </div>
  );
};

export const Carousel: React.FC<
  React.PropsWithChildren<{
    height: number;
    slidesToShow?: number;
  }>
> = ({ children, height, slidesToShow = 1 }) => {

  
  return (
    <div className="carousel-container" style={{ height }}>
      <Slider
        className="slider variable-width"
        draggable={false}
        infinite={false}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        nextArrow={<Arrow direction="forward" height={height} />}
        prevArrow={<Arrow direction="backward" height={height} />}
        variableWidth={true}
      >
        {children}
      </Slider>
    </div>
  );
};
