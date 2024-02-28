import Slider, { Settings } from "react-slick";
import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";

interface CarouselProps extends React.PropsWithChildren<{
    height: number;
    slidesToShow?: number;
    slideMargin?: number;
    infinite?: boolean;
}> {}

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

export const Carousel: React.FC<CarouselProps> = ({ 
  children, 
  height, 
  slidesToShow = 1, 
  slideMargin = 4,
  infinite = false,
}) => {
  
  const settings: Settings = {
    draggable: false,
    infinite,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="forward" height={height} />,
    prevArrow: <Arrow direction="backward" height={height} />,
    variableWidth: true,
  };

  return (
    <div className="carousel-container" style={{ height }}>
      <style>
        {`
          .slick-track > * {
            margin: 0 ${slideMargin}px; /* Set margin dynamically */
          }
        `}
      </style>
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};
