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

type NotificationMethod = "email" | "flyer" | "both" | undefined;

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
  language: string | undefined; // TODO: better typing
  name: string;
  notificationMethod: NotificationMethod;
  setAllowLanguageToggle: Dispatch<SetStateAction<boolean>>;
  setGrades: Dispatch<SetStateAction<string[]>>;
  setIsInclusive: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<string | undefined>>;
  setName: Dispatch<SetStateAction<string>>;
  setNotificationMethod: Dispatch<SetStateAction<NotificationMethod>>;
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
  const [language, setLanguage] = useState<string | undefined>();
  const [name, setName] = useState<string>("");
  const [notificationMethod, setNotificationMethod] =
    useState<NotificationMethod>();
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
