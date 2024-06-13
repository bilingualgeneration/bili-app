import {
  createContext,
  useContext,
}
import {
  useState
} from 'react';

type AdultState = any;

const AdultContext = createContext<AdultState>({} as AdultState);

export const useAdult = () => useContext(AdultContext);

export const AdultProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [language, setLanguage] = useState<string>('es');
  const [userType, setUserType] = useState<any>('teacher'); // parent or teacher
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<Date>(new Date());
  const [country, setCountry] = useState<string>('');
  const [grades, setGrades] = useState<string[]>([]);
  const [role, setRole] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  //const [billingPlan, setBillingPlan] = useState<string>('');
  //const [billingLastUpdated, setBillingLastUpdated] = useState<Date>(new Date());

  

  //const [, set] = useState<>();
  
  return <AdultContext.Provider
  children={children}
  value={{
    name,
    setName,
    id,
    setId,
    language,
    setLanguage,
    userType,
    setUserType,
    phone,
    setPhone,
    email,
    setEmail,
    dob,
    setDob,
    country,
    setCountry
  }} />;
};
