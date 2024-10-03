import {
  FirestoreCollectionProvider,
  useFirestoreCollection,
} from "@/hooks/FirestoreCollection";
import { Redirect } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import { useStudent } from "@/hooks/Student";

export const StudentLoader: React.FC = () => {
  const { user } = useProfile();
  return (
    <FirestoreCollectionProvider
      collection="student"
      filters={[["caregiver", "array-contains", user.uid]]}
    >
      <StudentLoaderInternal />
    </FirestoreCollectionProvider>
  );
};

const StudentLoaderInternal: React.FC = () => {
  const { data, status } = useFirestoreCollection();
  const { setInfo } = useStudent();
  switch (status) {
    case "loading":
      return <></>;
      break;
    case "error":
      return <>error</>;
      break;
    case "ready":
      // TODO: assume there is always at least 1 student
      setInfo(data[0]);
      return <Redirect to="/student-dashboard" />;
      break;
    default:
      return <>default case</>;
      break;
  }

  return <></>;
};
