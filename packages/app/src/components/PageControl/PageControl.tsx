import { IonImg } from "@ionic/react";

import "./PageControl.scss";

import forward from "@/assets/icons/carousel_forward.svg";
import backward from "@/assets/icons/carousel_backward.svg";

const imgs = {
  backward: backward,
  forward: forward,
};

export interface PageControlProps {
  direction: "backward" | "forward";
  onClick: any;
  style?: any;
}

export const PageControl: React.FC<PageControlProps> = ({
  direction,
  onClick,
  style,
}) => {
  return (
    <IonImg
      className="page-control"
      onClick={onClick}
      src={imgs[direction]}
      style={style}
    />
  );
};
