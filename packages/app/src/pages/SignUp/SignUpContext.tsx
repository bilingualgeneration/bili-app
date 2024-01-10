import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useAuth, useFunctions } from "reactfire";
import { signInWithEmailAndPassword } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

const SignUpDataContext = createContext({
  data: {},
  page: "roleSelect",
  signUp: () => {},
  signUpStatus: "idle",
  setData: (value: any): void => {},
  setPage: (value: any): void => {},
  setSignUpStatus: (value: any): void => {},
});
export const useSignUpData = () => useContext(SignUpDataContext);

export const SignUpDataProvider = ({ children }: PropsWithChildren<{}>) => {
  const [data, setData] = useState({});
  const [page, setPage] = useState("roleSelect");
  const [signUpStatus, setSignUpStatus] = useState("idle");
  const auth = useAuth();
  const functions = useFunctions();
  const signupFunction = httpsCallable(functions, "user-signup");
  const signUp = async () => {
    setSignUpStatus("busy");
    await signupFunction(data);
    // @ts-ignore
    await signInWithEmailAndPassword(auth, data.email, data.password);
    setSignUpStatus("done");
  };
  return (
    <SignUpDataContext.Provider
      value={{
        data,
        page,
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
