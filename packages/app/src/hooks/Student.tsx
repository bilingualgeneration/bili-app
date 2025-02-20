import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { firestore } from "@/components/Firebase";

import { Preferences } from "@capacitor/preferences";

type StudentState = any;

const StudentContext = createContext<StudentState>({} as StudentState);

export const useStudent = () => useContext(StudentContext);

type StudentInfo = {
  firstName: string | null;
  lastName: string | null;
  id: string | null;
};

export const StudentProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const unsubscribe = useRef<Unsubscribe | null>(null);

  const docRef = doc(firestore, "student", "PZChsC22RCJqqZWtCAIo");

  useEffect(() => {
    if (id !== null) {
      const docRef = doc(firestore, "student", id);
      const unsub = onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          unsubscribe.current = unsub;
        } else {
          unsub();
          signOut();
        }
      });
    }
  }, [id]);

  const setInfo = useCallback(
    (info: StudentInfo) => {
      setFirstName(info.firstName);
      setLastName(info.lastName);
      setId(info.id);
      Preferences.set({
        key: "student",
        value: JSON.stringify(info),
      });
    },
    [setFirstName, setLastName, setId],
  );

  const signOut = useCallback(() => {
    setFirstName(null);
    setLastName(null);
    setId(null);
    setIsLoading(false);
    Preferences.remove({ key: "student" });
    if (unsubscribe.current !== null) {
      unsubscribe.current();
      unsubscribe.current = null;
    }
  }, [setFirstName, setLastName, setId, setIsLoading]);

  useEffect(() => {
    Preferences.get({ key: "student" }).then((response) => {
      // todo: get name dynamically
      if (response.value === null) {
        setIsLoading(false);
      } else {
        setInfo(JSON.parse(response.value));
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <StudentContext.Provider
      children={children}
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        id,
        isLoggedIn: id !== null && id !== undefined,
        setId,
        setInfo,
        signOut,
        isLoading,
      }}
    />
  );
};
