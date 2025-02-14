import { HeaderFooter } from "@/components/HeaderFooter";
import { I18nWrapper } from "@/components/I18nWrapper";
import {
  LanguageToggle,
  LanguageToggleProvider,
} from "@/components/LanguageToggle";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Redirect } from "react-router-dom";
import { useClassroom } from "@/hooks/Classroom";
import { useEffect } from "react";
import { useLanguage } from "@/hooks/Language";
import { useParams } from "react-router";
import { useStudent } from "@/hooks/Student";

export const StudentSelectLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const { info, subscribe } = useClassroom();
  const { language } = useLanguage();

  useEffect(() => {
    subscribe(classroomId);
  }, [classroomId]);

  if (info === null) {
    return <LoadingIndicator />;
  } else {
    return (
      <I18nWrapper locale={language.slice(0, 2)}>
        <LanguageToggleProvider allowedLanguages={info.allowedLanguages}>
          <HeaderFooter>
            {children}
            {info?.allowLanguageToggle && <LanguageToggle />}
          </HeaderFooter>
        </LanguageToggleProvider>
      </I18nWrapper>
    );
  }
};
