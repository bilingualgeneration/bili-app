import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";

export interface AudioManager {
  addAudio: any;
  onended: any;
  clearAudio: any;
}

const AudioManagerContext = createContext<AudioManager>({} as AudioManager);

export const useAudioManager = () => useContext(AudioManagerContext);

export const AudioManagerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [audios, setAudios] = useState<any[]>([]);
  const [onended] = useState<any>(new Subject());
  const audiosRef = useRef<any[]>(audios);

  useEffect(() => {
    if (audios.length > 0) {
      audios[0].onended = () => {
        if (audios.length === 1) {
          // last one played
          onended.next();
        }
        setAudios(audios.slice(1));
        audiosRef.current = audios.slice(1);
      };
      if (audiosRef.current[0]) {
        audiosRef.current[0].play();
      }
    }
  }, [audios]);

  const addAudio = (inputAudios: any[]) => {
    // silence existing audio
    // todo: probably not working
    audiosRef.current.forEach((a) => {
      a.pause();
    });
    const filteredAudios = inputAudios.filter((a) => a);
    const newAudios = filteredAudios.map((a) => new Audio(a));
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
    onended.next();
  };
  return (
    <AudioManagerContext.Provider
      value={{
        addAudio,
        clearAudio,
        onended,
      }}
    >
      {children}
    </AudioManagerContext.Provider>
  );
};
