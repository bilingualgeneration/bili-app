import classnames from "classnames";
import StoriesIcon from "@/assets/icons/stories.svg?react";
import PlayIcon from "@/assets/icons/play.svg?react";
import WellnessIcon from "@/assets/icons/wellness.svg?react";
import CommunityIcon from "@/assets/icons/community.svg?react";
import "./CategoryTag.scss";

export const CategoryTag: React.FC<{
  category: string;
  className?: string;
}> = ({ category, className }) => {
  let bgColor;
  let icon;
  switch (category) {
    case "stories":
      bgColor = "#0045a1";
      icon = <StoriesIcon />;
      break;
    case "wellness":
      bgColor = "#ac217b";
      icon = <WellnessIcon />;
      break;
    case "play":
      bgColor = "#ff5708";
      icon = <PlayIcon />;
      break;
    case "community":
      bgColor = "#22beb9";
      icon = <CommunityIcon />;
      break;
    case "affirmation":
      bgColor = "#AC217B";
      icon = <WellnessIcon />;
      break;
    case "yoga":
      bgColor = "#AC217B";
      icon = <WellnessIcon />;
      break;
    case "other_wellness":
      bgColor = "#AC217B";
      icon = <WellnessIcon />;
      break;
  }

  return (
    <div
      className={classnames("category-tag", className)}
      style={{ backgroundColor: bgColor }}
    >
      {icon}
    </div>
  );
};
