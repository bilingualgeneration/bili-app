import { createContext, useContext, useEffect, useRef, useState } from "react";

export interface AudioManager {
  addAudio: any;
  callback: any;
  setCallback: any;
  clearAudio: any;
}

const defaultState: AudioManager = {
  addAudio: () => {},
  callback: () => {},
  clearAudio: () => {},
  setCallback: () => {},
};

const AudioManagerContext = createContext<AudioManager>(defaultState);

export const useAudioManager = () => useContext(AudioManagerContext);

export const AudioManagerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [audios, setAudios] = useState<any[]>([]);
  const [callback, setCallback] = useState<any>(() => {});
  const audiosRef = useRef(audios);

  useEffect(() => {
    audiosRef.current = audios;
  }, [audios]);

  useEffect(() => {
    if (audios.length > 0) {
      audios[0].onended = () => {
        if (audios.length === 1) {
          // last one played
          callback();
        }
        setAudios(audios.slice(1));
      };
      audios[0].play();
    }
  }, [audios]);
  const addAudio = (inputAudios: any[]) => {
    // silence existing audio
    // todo: probably not working
    audios.forEach((a) => {
      a.pause();
    });
    setAudios(inputAudios.map((a) => new Audio(a)));
  };

  const clearAudio = () => {
    // todo: not working
    audiosRef.current.forEach((a) => {
      a.pause();
    });
    setAudios([]);
  };
  return (
    <AudioManagerContext.Provider
      value={{
        addAudio,
        callback,
        setCallback,
        clearAudio,
      }}
    >
      {children}
    </AudioManagerContext.Provider>
  );
};
