import { collection, doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { firestore } from "@/components/Firebase";
import { Preferences } from "@capacitor/preferences";

type ClassroomState = any;

const ClassroomContext = createContext<ClassroomState>({} as ClassroomState);

export const useClassroom = () => useContext(ClassroomContext);

export const ClassroomProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const classroomUnsubscribe = useRef<Unsubscribe | null>(null);
  const [info, setInfo] = useState<any | null | undefined>(undefined);
  const [currentId, setCurrentId] = useState<string | null | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const subscribe = (id: string) => {
    if (id !== currentId) {
      Preferences.set({
        key: "classroom",
        value: id,
      });
      setCurrentId(id);
      if (classroomUnsubscribe.current !== null) {
        classroomUnsubscribe.current();
      }

      const classroomDoc = doc(firestore, "classroom", id);
      classroomUnsubscribe.current = onSnapshot(classroomDoc, (d) => {
        // TODO: populate with classroom analytics
        setInfo({
          id,
          ...d.data(),
        });
        setIsLoading(false);
      });
    }
  };

  const unsubscribe = () => {
    if (classroomUnsubscribe.current !== null) {
      classroomUnsubscribe.current();
    }
    classroomUnsubscribe.current = null;
    setCurrentId(null);
    Preferences.remove({ key: "classroom" });
  };

  useEffect(() => {
    Preferences.get({ key: "classroom" }).then((response) => {
      if (response.value === null) {
        setInfo(null);
        setCurrentId(null);
        setIsLoading(false);
      } else {
        subscribe(response.value);
      }
    });
  }, [setInfo, subscribe]);

  return (
    <ClassroomContext.Provider
      children={children}
      value={{
        info,
        isLoading,
        subscribe,
        unsubscribe,
      }}
    />
  );
};
