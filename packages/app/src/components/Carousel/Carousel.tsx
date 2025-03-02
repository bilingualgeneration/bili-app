import { IonImg } from "@ionic/react";
import { useEffect, useState, useRef } from "react";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";
import "./Carousel.scss";

interface CarouselProps
  extends React.PropsWithChildren<{
    height: string | number;
    slidesToShow?: number;
    slideMargin?: number;
    infinite?: boolean;
  }> {}

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
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  const carouselBackward = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // @ts-ignore
    const items = container.querySelectorAll(".content-card");

    let prevItem = null;
    for (let i = items.length - 1; i >= 0; i--) {
      const rect = items[i].getBoundingClientRect();
      // @ts-ignore
      if (rect.left < container.getBoundingClientRect().left) {
        prevItem = items[i];
        break;
      }
    }

    if (prevItem) {
      prevItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const carouselForward = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // @ts-ignore
    const items = container.querySelectorAll(".content-card");

    let nextItem = null;
    for (let i = 0; i < items.length; i++) {
      const rect = items[i].getBoundingClientRect();
      // @ts-ignore
      if (rect.left >= container.getBoundingClientRect().left) {
        nextItem = items[i + 1];
        break;
      }
    }
    if (nextItem) {
      nextItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    updateScrollState(); // Run once on mount to set initial button visibility
  }, []);

  return (
    <div className="carousel-wrapper">
      {canScrollLeft && (
        <IonImg
          className="carousel-control backward"
          src={backward}
          onClick={carouselBackward}
        />
      )}
      <div className="carousel" ref={containerRef} onScroll={updateScrollState}>
        {children}
      </div>
      {canScrollRight && (
        <IonImg
          className="carousel-control forward"
          src={forward}
          onClick={carouselForward}
        />
      )}
    </div>
  );
};
