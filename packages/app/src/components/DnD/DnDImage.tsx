import {useDrop} from 'react-dnd';

export const DnDImage: React.FC<{
  src: string
}> = ({src}) => {
  const [, drop] = useDrop(
    () => ({
      accept: 'piece', // oddly enough, accepting 'piece' will prevent it from landing on top
    }),
    []
  );
  return <span ref={drop}>
    <img src={src} className='dnd-image' />
  </span>;
};
