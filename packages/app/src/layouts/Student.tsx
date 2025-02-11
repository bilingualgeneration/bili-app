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
  const { id } = useStudent();
  const { language } = useLanguage();
  if (id === null) {
    return <Redirect to="/" />;
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
        {children}
        {info.allowLanguageToggle && <LanguageToggle />}
      </LanguageToggleProvider>
    </I18nWrapper>
  );
};
