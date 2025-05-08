import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { directus, getProfile } from "@/lib/directus";

type ProfileState = any;

const ProfileContext = createContext<ProfileState>({} as ProfileState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [profile, setProfile] = useState<any | null | undefined>(undefined);

  useEffect(() => {
    getProfile()
      .then((response) => {
        console.log(response);
        setIsLoggedIn(true);
        setProfile(response);
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }, [setIsLoggedIn, setProfile]);

  const logout = useCallback(() => {
    directus.logout().then(() => {
      setIsLoggedIn(false);
      setProfile(null);
    });
  }, [setIsLoggedIn, setProfile]);

  return (
    <ProfileContext.Provider
      children={children}
      value={{
        isLoggedIn,
        logout,
        profile,
      }}
    />
  );
};
