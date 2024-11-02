import { Redirect, useLocation } from "react-router-dom";
import { useProfile } from "@/hooks/Profile";
import { useStudent } from "@/hooks/Student";
import { LanguageToggle, useLanguageToggle } from "@/components/LanguageToggle";
import { I18nWrapper } from "@/components/I18nWrapper";

export const AuthedLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { profile } = useProfile();
  const { id: studentId } = useStudent();
  const { language } = useLanguageToggle();
  const { pathname } = useLocation();
  if (
    profile.role === "caregiver" &&
    studentId === null &&
    pathname !== "/caregiver/student-loader"
  ) {
    return <Redirect to="/caregiver/student-loader" />;
  }
  // implied else
  return (
    <>
      <I18nWrapper locale={language.slice(0, 2)}>
        {children}
        <LanguageToggle />
      </I18nWrapper>
    </>
  );
};
