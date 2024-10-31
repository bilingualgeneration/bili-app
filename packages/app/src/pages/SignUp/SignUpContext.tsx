import { auth } from "@/components/Firebase";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useInterfaceLanguage } from "@/hooks/InterfaceLanguage";
import { useLanguage } from "@/hooks/Language";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignUpDataContext = createContext({
  data: {},
  page: ["roleSelect"],
  pushPage: (value: string): void => {},
  signUp: () => {},
  signUpStatus: "idle",
  setData: (value: any): void => {},
  setPage: (value: any): void => {},
  setSignUpStatus: (value: any): void => {},
});
export const useSignUpData = () => useContext(SignUpDataContext);

export const SignUpDataProvider = ({
  children,
  entry,
}: PropsWithChildren<{ entry?: string }>) => {
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState<string[]>(entry ? [entry] : ["roleSelect"]); //set it to roleSeclect or ClassCode
  const [signUpStatus, setSignUpStatus] = useState("idle");
  const { language } = useInterfaceLanguage();
  const functions = getFunctions();
  const teacherSignupFunction = httpsCallable(functions, "teacher-signup");
  const caregiverSignupFunction = httpsCallable(functions, "caregiver-signup");

  const signUp = async () => {
    setSignUpStatus("busy");
    switch (data.role) {
      case "teacher":
        await teacherSignupFunction({
          ...data,
          language,
        });
        // @ts-ignore
        await signInWithEmailAndPassword(auth, data.email, data.password);
        setSignUpStatus("done");
        break;
      case "parent":
        await caregiverSignupFunction({
          ...data,
          language,
        });
        break;
    }
    await signInWithEmailAndPassword(auth, data.email, data.password);
    setSignUpStatus("done");
  };

  const pushPage = (newPage: string): void => {
    setPage(page.concat(newPage));
  };

  return (
    <SignUpDataContext.Provider
      value={{
        data,
        page,
        pushPage: pushPage,
        setData,
        setPage,
        setSignUpStatus,
        signUp,
        signUpStatus,
      }}
    >
      {children}
    </SignUpDataContext.Provider>
  );
};
