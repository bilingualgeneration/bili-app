import {auth} from '@/components/Firebase';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import {
  getFunctions,
  httpsCallable
} from 'firebase/functions';
import { useLanguage } from "@/contexts/LanguageContext";
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

export const SignUpDataProvider = ({ children, entry }: PropsWithChildren<{entry?: string}>) => {
  const [data, setData] = useState({});
  const [page, setPage] = useState<string[]>([]);//set it to roleSeclect or ClassCode
  const [signUpStatus, setSignUpStatus] = useState("idle");
  const { locale } = useLanguage();
  const functions = getFunctions();
  const signupFunction = httpsCallable(functions, "user-signup");
  useEffect(() => {
    if (entry) {
      setPage([entry]);
    } else {
      setPage(["roleSelect"]);
    }
  }, [entry]);
  const signUp = async () => {
    setSignUpStatus("busy");
    await signupFunction({
      ...data,
      settingsLanguage: locale,
    });
    // @ts-ignore
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
