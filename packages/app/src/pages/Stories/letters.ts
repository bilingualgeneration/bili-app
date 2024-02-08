// background/dropzone letters
import a_bg from "@/assets/icons/stories_dnd/background_letters/a_bg.svg";
import e_bg from "@/assets/icons/stories_dnd/background_letters/e_bg.svg";
import i_bg from "@/assets/icons/stories_dnd/background_letters/i_bg.svg";
import g_bg from "@/assets/icons/stories_dnd/background_letters/g_bg.svg";
import m_bg from "@/assets/icons/stories_dnd/background_letters/m_bg.svg";
import s_bg from "@/assets/icons/stories_dnd/background_letters/s_bg.svg";
import u_bg from "@/assets/icons/stories_dnd/background_letters/u_bg.svg";

// draggable/forefround letters
import a_drag from "@/assets/icons/stories_dnd/draggable_letters/a_drag.svg";
import e_drag from "@/assets/icons/stories_dnd/draggable_letters/e_drag.svg";
import i_drag from "@/assets/icons/stories_dnd/draggable_letters/i_drag.svg";
import g_drag from "@/assets/icons/stories_dnd/draggable_letters/g_drag.svg";
import m_drag from "@/assets/icons/stories_dnd/draggable_letters/m_drag.svg";
import s_drag from "@/assets/icons/stories_dnd/draggable_letters/s_drag.svg";
import u_drag from "@/assets/icons/stories_dnd/draggable_letters/u_drag.svg";

interface LettersDictionary {
  draggable_letters: { [key: string]: string };
  background_letters: { [key: string]: string };
}

export const letters: LettersDictionary = {
  draggable_letters: {
    a: a_drag,
    e: e_drag,
    i: i_drag,
    g: g_drag,
    m: m_drag,
    s: s_drag,
    u: u_drag,
  },
  background_letters: {
    a: a_bg,
    e: e_bg,
    i: i_bg,
    g: g_bg,
    m: m_bg,
    s: s_bg,
    u: u_bg,
  },
};
