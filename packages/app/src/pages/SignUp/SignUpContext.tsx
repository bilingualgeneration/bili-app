import {auth} from '@/components/Firebase';
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useFunctions } from "reactfire";
import { useLanguage } from "@/contexts/LanguageContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

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

export const SignUpDataProvider = ({ children }: PropsWithChildren<{}>) => {
  const [data, setData] = useState({});
  const [page, setPage] = useState<string[]>(["roleSelect"]);
  const [signUpStatus, setSignUpStatus] = useState("idle");
  const { locale } = useLanguage();
  const functions = useFunctions();
  const signupFunction = httpsCallable(functions, "user-signup");
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
