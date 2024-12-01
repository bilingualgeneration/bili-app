import avatar1 from "@/assets/avatars/avatar01.png";
import avatar2 from "@/assets/avatars/avatar02.png";
import avatar3 from "@/assets/avatars/avatar03.png";
import avatar4 from "@/assets/avatars/avatar04.png";
import avatar5 from "@/assets/avatars/avatar05.png";
import avatar6 from "@/assets/avatars/avatar06.png";
import avatar7 from "@/assets/avatars/avatar07.png";
import avatar8 from "@/assets/avatars/avatar08.png";
import avatar9 from "@/assets/avatars/avatar09.png";
import avatar10 from "@/assets/avatars/avatar10.png";
import avatar11 from "@/assets/avatars/avatar11.png";
import avatar12 from "@/assets/avatars/avatar12.png";
import avatar13 from "@/assets/avatars/avatar13.png";
import avatar14 from "@/assets/avatars/avatar14.png";
import avatar15 from "@/assets/avatars/avatar15.png";
import avatar16 from "@/assets/avatars/avatar16.png";
import avatar17 from "@/assets/avatars/avatar17.png";
import avatar18 from "@/assets/avatars/avatar18.png";
import avatar19 from "@/assets/avatars/avatar19.png";
import avatar20 from "@/assets/avatars/avatar20.png";
import avatar21 from "@/assets/avatars/avatar21.png";
import avatar22 from "@/assets/avatars/avatar22.png";
import avatar23 from "@/assets/avatars/avatar23.png";
import avatar24 from "@/assets/avatars/avatar24.png";
import classnames from "classnames";
import { hashString } from "@/lib/utils";

import "./Avatar.css";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
  avatar20,
  avatar21,
  avatar22,
  avatar23,
  avatar24,
];

export type AvatarSize = "xs" | "sm" | "md" | "lg" | undefined;

export interface AvatarProps {
  id: string;
  size: AvatarSize;
}

export const Avatar: React.FC<AvatarProps> = ({ id, size = "md" }) => {
  return (
    <>
      <img
        className={classnames("avatar", size)}
        src={avatars[hashString(id, avatars.length)]}
      />
    </>
  );
};
