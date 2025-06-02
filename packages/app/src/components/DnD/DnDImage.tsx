import { useDrop } from "react-dnd";

export const DnDImage: React.FC<{
  src: string;
  x: number;
  y: number;
}> = ({ src, x, y }) => {
  const [, drop] = useDrop(
    () => ({
      accept: "piece", // oddly enough, accepting 'piece' will prevent it from landing on top
    }),
    [],
  );
  return (
    <span
      className="dnd-image-wrapper"
      ref={drop}
      style={{
        position: "absolute",
        top: y,
        left: x,
      }}
    >
      <img src={src} className="dnd-image" />
    </span>
  );
};
