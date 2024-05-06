import {DnD} from '@/components/DnD';
import a from "@/assets/icons/stories_dnd/draggable_letters/a_drag.svg";
import m from "@/assets/icons/stories_dnd/draggable_letters/m_drag.svg";
import i from "@/assets/icons/stories_dnd/draggable_letters/i_drag.svg";

export const DnDDev: React.FC = () => {
  const pieces = [
    {
      text: 'a',
      image: a
    },
    {
      text: 'm',
      image: m
    },
    {
      text: 'i',
      image: i
    },
  ];
  return <>
    <DnD
      target={'a-m-i-a-m-i'}
      pieces={pieces}
    />
  </>;
};
