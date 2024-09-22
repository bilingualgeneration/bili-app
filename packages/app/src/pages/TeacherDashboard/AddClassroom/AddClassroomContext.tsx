import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useProfile } from "@/hooks/Profile";

export interface Student {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail: string;
}

interface AddClassroomState {
  addClassroom: () => void;
  addClassroomStatus: string; // TODO: better typing
  allowLanguageToggle: boolean;
  grades: string[];
  isInclusive: boolean;
  language: string; // TODO: better typing
  name: string;
  notificationMethod: string; // TODO: better typing
  setAllowLanguageToggle: Dispatch<SetStateAction<boolean>>;
  setGrades: Dispatch<SetStateAction<string[]>>;
  setIsInclusive: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  setNotificationMethod: Dispatch<SetStateAction<string>>;
  setStudents: Dispatch<SetStateAction<Student[]>>;
  students: Student[];
}

const AddClassroomContext = createContext<AddClassroomState>(
  {} as AddClassroomState,
);

export const useAddClassroom = () => useContext(AddClassroomContext);

export const AddClassroomProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [addClassroomStatus, setAddClassroomStatus] = useState<string>("idle");
  const [allowLanguageToggle, setAllowLanguageToggle] =
    useState<boolean>(false);
  const [grades, setGrades] = useState<string[]>([]);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("es");
  const [name, setName] = useState<string>("");
  const [notificationMethod, setNotificationMethod] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const functions = getFunctions();
  const addClassroomFunction = httpsCallable(functions, "classroom-add");
  const addClassroom = async () => {
    setAddClassroomStatus("busy");
    await addClassroomFunction({
      allowLanguageToggle,
      grades,
      isInclusive,
      language,
      name,
      notificationMethod,
      students,
    });
    setAddClassroomStatus("done");
  };
  return (
    <AddClassroomContext.Provider
      children={children}
      value={{
        addClassroom,
        addClassroomStatus,
        allowLanguageToggle,
        grades,
        isInclusive,
        name,
        notificationMethod,
        language,
        setAllowLanguageToggle,
        setIsInclusive,
        setGrades,
        setLanguage,
        setName,
        setNotificationMethod,
        setStudents,
        students,
      }}
    />
  );
};
