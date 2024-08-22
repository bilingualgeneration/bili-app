import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Preferences } from "@capacitor/preferences";

type ClassroomState = any;

const ClassroomContext = createContext<ClassroomState>({} as ClassroomState);

export const useClassroom = () => useContext(ClassroomContext);

type ClassroomInfo = {
  name: string | null;
  schoolId: string | null;
  id: string | null;
};

export const ClassroomProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [name, setName] = useState<string | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setInfo = useCallback(
    (info: ClassroomInfo) => {
      setName(info.name);
      setSchoolId(info.schoolId);
      setId(info.id);
      Preferences.set({
        key: "classroom",
        value: JSON.stringify(info),
      });
    },
    [setName, setSchoolId, setId],
  );

  useEffect(() => {
    Preferences.get({ key: "classroom" }).then((response) => {
      console.log(response);
      // todo: get name dynamically
      if (response.value === null) {
        setIsLoading(false);
      } else {
        setInfo(JSON.parse(response.value));
        setIsLoading(false);
      }
    });
  }, [setInfo, setIsLoading]);

  return (
    <ClassroomContext.Provider
      children={children}
      value={{
        name,
        setName,
        id,
        setId,
        schoolId,
        setSchoolId,
        setInfo,
        isLoading,
      }}
    />
  );
};
