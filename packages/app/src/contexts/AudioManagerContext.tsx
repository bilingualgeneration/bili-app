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
  const audiosRef = useRef<any[]>(audios);

  useEffect(() => {
    if (audios.length > 0) {
      audios[0].onended = () => {
        if (audios.length === 1 && callback) {
          // last one played
          callback();
        }
        setAudios(audios.slice(1));
	audiosRef.current = audios.slice(1);
      };
      //audios[0].play();
      if(audiosRef.current[0]){
	audiosRef.current[0].play();
      }
    }
  }, [audios, callback]);

  const addAudio = (inputAudios: any[]) => {
    // silence existing audio
    // todo: probably not working
    audiosRef.current.forEach((a) => {
      a.pause();
    });
    const newAudios = inputAudios.map((a) => new Audio(a));
    audiosRef.current = newAudios;
    setAudios(newAudios);
  };

  const clearAudio = () => {
    // todo: not working
    audiosRef.current.forEach((a) => {
      a.pause();
    });
    //setAudios([]);
    audiosRef.current = [];
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
