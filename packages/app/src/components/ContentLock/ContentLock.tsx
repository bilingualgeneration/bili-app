import LockIcon from "@/assets/icons/lock.svg?react";

import "./ContentLock.scss";

interface ContentLock {
  borderRadius?: string;
}

export const ContentLock: React.FC<ContentLock> = ({ borderRadius }) => {
  return (
    <div className="content-lock" style={{ borderRadius: borderRadius ?? 0 }}>
      <LockIcon />
    </div>
  );
};
