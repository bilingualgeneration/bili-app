import { AdultCheckProvider } from "@/contexts/AdultCheckContext";
import { Redirect, useLocation } from "react-router-dom";
import { useClassroom } from "@/hooks/Classroom";
import { useLanguage } from "@/hooks/Language";
import { useProfile } from "@/hooks/Profile";
import { useStudent } from "@/hooks/Student";
import {
  LanguageToggle,
  LanguageToggleProvider,
} from "@/components/LanguageToggle";
import { I18nWrapper } from "@/components/I18nWrapper";

export const AuthedLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { info: classroomInfo } = useClassroom();
  const { profile } = useProfile();
  const { id: studentId } = useStudent();
  const { language } = useLanguage();
  const { pathname } = useLocation();

  if (!profile) {
    return <Redirect to="/" />;
  }

  if (
    profile.role === "caregiver" &&
    studentId === null &&
    pathname !== "/caregiver/student-loader"
  ) {
    //return <Redirect to="/caregiver/student-loader" />;
  }
  // implied else

  // if user doesn't have classroom selected, need to load defaults
  const info = classroomInfo ?? {
    allowedLanguages: ["es", "en", "es.en"],
    allowLanguageToggle: true,
  };

  return (
    <I18nWrapper locale={language.slice(0, 2)}>
      <LanguageToggleProvider allowedLanguages={info.allowedLanguages}>
        <AdultCheckProvider>
          {children}
          {info.allowLanguageToggle && <LanguageToggle />}
        </AdultCheckProvider>
      </LanguageToggleProvider>
    </I18nWrapper>
  );
};
