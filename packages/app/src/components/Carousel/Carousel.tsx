import Slider, { Settings } from "react-slick";
import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";

interface CarouselProps
  extends React.PropsWithChildren<{
    height: string | number;
    slidesToShow?: number;
    slideMargin?: number;
    infinite?: boolean;
  }> {}

//style={{ top: height / 2 }}

const Arrow: React.FC<any> = ({ className, style, onClick, direction }) => {
  return (
    <div {...{ onClick }} className={`${direction} ${className}`}>
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
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="forward" />,
    prevArrow: <Arrow direction="backward" />,
    variableWidth: true,
  };

  return (
    <div className="carousel-container">
      <style>
        {`
          .slick-track {
            > * {
            margin: 0 ${slideMargin}px; /* Set margin dynamically */
            } 
          }
        `}
      </style>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
