const REFRESH_THRESHOLD_IN_DAYS = 1;

import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { differenceInDays } from "date-fns";
import { firestore } from "@/components/Firebase";
import useSWR from "swr";

interface NamesState {
  getName: ({ id, type }: NameProps) => Promise<NameRecord | null>;
  names: NamesLookup;
}

interface NamesLookup {
  [key: string]: NameRecord;
}

interface NameRecord {
  first: string;
  last?: string;
  timestamp: Date;
}

export type UserType = "user" | "student";

const NamesContext = createContext<NamesState>({} as NamesState);

export const useNames = () => useContext(NamesContext);

export const NamesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [names, setNames] = useState<NamesLookup>({});
  const getName = async ({ id, type }: NameProps) => {
    if (
      names[id] &&
      differenceInDays(new Date(), names[id].timestamp) <
        REFRESH_THRESHOLD_IN_DAYS
    ) {
      return names[id];
    } else {
      const snapshot = await getDoc(doc(firestore, type, id));
      if (snapshot.exists()) {
        const data = snapshot.data();
        const record = {
          first: type === "student" ? data.firstName : data.name,
          last: type === "student" ? data.lastName : "",
          timestamp: new Date(),
        };
        setNames({
          ...names,
          id: record,
        });
        return record;
      } else {
        return null;
      }
    }
  };
  return (
    <NamesContext.Provider
      children={children}
      value={{
        getName,
        names,
      }}
    />
  );
};

interface NameProps {
  id: string;
  type: UserType;
}

export const FirstName: React.FC<NameProps> = (props) => {
  const { getName } = useNames();
  const { data, error, isLoading } = useSWR(props, getName);
  if (isLoading) {
    return "...";
  }
  switch (data) {
    case undefined:
      break;
    case null:
      return "firstname"; // error
      break;
    default:
      return data.first;
  }
  return "";
};

export const LastName: React.FC<NameProps> = (props) => {
  const { getName } = useNames();
  const { data, error, isLoading } = useSWR(props, getName);
  if (isLoading) {
    return "...";
  }
  switch (data) {
    case undefined:
      break;
    case null:
      return "lastname"; // error
      break;
    default:
      return data.last ?? "";
  }
  return "";
};

export const FullName: React.FC<NameProps> = (props) => {
  const { getName } = useNames();
  const { data, error, isLoading } = useSWR(props, getName);
  if (isLoading) {
    return "...";
  }
  switch (data) {
    case undefined:
      return "...";
      break;
    case null:
      return "fullname"; // error
      break;
    default:
      return data.first + (data.last ? ` ${data.last}` : "");
  }
  return "";
};
