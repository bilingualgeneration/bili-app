import LockIcon from "@/assets/icons/lock.svg?react";

import "./ContentLock.scss";

interface ContentLock {
  borderRadius?: string;
  showLock?: boolean;
}

export const ContentLock: React.FC<ContentLock> = ({
  borderRadius,
  showLock = true,
}) => {
  return (
    <div
      className="content-lock"
      style={borderRadius ? { borderRadius: borderRadius ?? 0 } : {}}
    >
      {showLock && <LockIcon />}
    </div>
  );
};
