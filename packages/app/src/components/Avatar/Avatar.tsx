import avatar1 from "@/assets/avatars/avatar1.png";
import avatar2 from "@/assets/avatars/avatar2.png";
import classnames from "classnames";
import { hashString } from "@/lib/utils";

import "./Avatar.css";

const avatars = [avatar1, avatar2];

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
