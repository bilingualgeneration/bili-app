import { HeaderFooter } from "@/components/HeaderFooter";
import { I18nWrapper } from "@/components/I18nWrapper";
import {
  LanguageToggle,
  LanguageToggleProvider,
} from "@/components/LanguageToggle";
import { Redirect } from "react-router-dom";
import { useClassroom } from "@/hooks/Classroom";
import { useLanguage } from "@/hooks/Language";
import { useStudent } from "@/hooks/Student";

export const StudentLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { info: classroomInfo } = useClassroom();
  const { isLoggedIn, signOut } = useStudent();
  const { language } = useLanguage();

  /*
  if (!classroomInfo) {
    signOut();
    // how can be student if no info?
    return <Redirect to="/" />;
  }
  */

  // TODO: pull allowedLanguages from caregiver

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <I18nWrapper locale={language.slice(0, 2)}>
      <LanguageToggleProvider
        allowedLanguages={
          classroomInfo?.allowedLanguages ?? ["es", "en", "es.en"]
        }
      >
        <HeaderFooter>
          {children}
          {(classroomInfo?.allowLanguageToggle ?? true) && <LanguageToggle />}
        </HeaderFooter>
      </LanguageToggleProvider>
    </I18nWrapper>
  );
};
