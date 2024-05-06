import {
  DragPreviewImage,
  DragSourceMonitor,
  useDrag,
} from 'react-dnd';

export interface PieceProps {
  dropped: boolean,
  id: string,
  image: string,
  left: number,
  text: string,
  top: number,
}

export const Piece: React.FC<PieceProps> = ({
  dropped,
  id,
  image,
  left,
  text,
  top,
}) => {
  const [{isDragging}, drag, preview] = useDrag(() => ({
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {id, image, left, text, top},
    type: 'piece',
  }),
  [id, image, left, text, top]);
  if(isDragging || dropped){
    return <span ref={drag}></span>;
  }
  return <>
    <DragPreviewImage connect={preview} src={image} />
    <span ref={drag} style={{
      left,
      position: 'absolute',
      top,
    }}>
      <img src={image} />
    </span>
  </>;
}
