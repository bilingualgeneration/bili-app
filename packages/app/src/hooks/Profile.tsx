import {
  auth,
  firestore,
} from '@/components/Firebase';
import {
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  Unsubscribe,
  where,
} from 'firebase/firestore';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

type ProfileState = any;

const ProfileContext = createContext<ProfileState>({} as ProfileState);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<any>(undefined);
  const [activeChildProfile, setActiveChildProfile] = useState<any>(undefined);
  const [activeChildId, setActiveChildId] = useState<string | undefined>(undefined);
  const userRef = useRef<any>(user);
  const [profile, setProfile] = useState<any>(undefined);
  const [childProfiles, setChildProfiles] = useState<any>(undefined);
  const profileUnsubscribe = useRef<Unsubscribe>();
  const childProfilesUnsubscribe = useRef<Unsubscribe>();
  useEffect(() => {
    onAuthStateChanged(auth, (userState) => {
      if(userState && userRef.current === null){
	// logging in
	setProfile(undefined);
      }
      setUser(userState);
      userRef.current = userState;
    });
  }, []);

  useEffect(() => {
    if(user){
      const userDoc = doc(firestore, 'users', user.uid);
      const unsub = onSnapshot(userDoc, (d) => {
	const data = d.data();
	if(data){
	  setProfile(data);
	}
      });
      profileUnsubscribe.current = unsub;

      const childrenCollection = collection(firestore, 'users');
      const childrenQuery = query(
	childrenCollection,
	where(
	  'parentId',
	  '==',
	  user.uid
	)
      );
      const childProfilesUnsub = onSnapshot(childrenQuery, (snapshot) => {
	const childProfs = Object.fromEntries(snapshot.docs.map((doc) => {
	  return [doc.id, {
	    id: doc.id,
	    ...doc.data()
	  }]
	}));
	setChildProfiles(childProfs);
	const aci = snapshot.docs[0].id;
	setActiveChildId(aci);
	setActiveChildProfile(childProfs[aci]);
      });
      childProfilesUnsubscribe.current = childProfilesUnsub;
      // todo: set active child profile
    }else{
      if(user !== undefined){
	if(profileUnsubscribe.current){
	  profileUnsubscribe.current();
	}
	setProfile(null);
	setActiveChildProfile(null);
      }
    }
  }, [user]);

  
  const signout = () => {
    setUser(undefined);
    userRef.current = undefined;
    signOut(auth).then(() => {
      console.log('signed out');
    });
  };

  //console.log(profile);
//  console.log(profileRef.current);

  
  const isLoading =
    user === undefined
    || profile === undefined
    || activeChildProfile === undefined;
  return <ProfileContext.Provider
	   children={children}
	   value={{
	     activeChildId,
	     activeChildProfile,
	     isLoading,
	     isLoggedIn: user !== undefined && user !== null,
	     profile,
	     childProfiles,
	     signout,
	     user
	   }} />;
};
