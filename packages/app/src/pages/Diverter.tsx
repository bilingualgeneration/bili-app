import { Redirect } from "react-router-dom";
import { useClassroom } from "@/hooks/Classroom";
import { useStudent } from "@/hooks/Student";
import { useProfile } from "@/hooks/Profile";

export const Diverter: React.FC = () => {
  const { isLoggedIn: isUserLoggedIn, profile } = useProfile();
  const { isLoggedIn: isStudentLoggedIn } = useStudent();
  const { info: classroomInfo } = useClassroom();

  if (!isUserLoggedIn && !isStudentLoggedIn) {
    return <Redirect to={`/splash`} />;
  }

  if (isUserLoggedIn && !isStudentLoggedIn) {
    switch (profile.role) {
      case "teacher":
        return <Redirect to="/teacher/dashboard" />;
        break;
      case "caregiver":
        return <Redirect to="/caregiver/dashboard" />;
        break;
      default:
        // TODO: something
        return <Redirect to="/classlink" />;
        break;
    }
  }

  if (classroomInfo && !isStudentLoggedIn) {
    return <Redirect to={`/classrooms/${classroomInfo.id}`} />;
  }

  if (isStudentLoggedIn) {
    return <Redirect to="student-dashboard" />;
  }

  // TODO: show loading image
  return <></>;
};
