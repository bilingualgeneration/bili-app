import { HeaderFooter } from "@/components/HeaderFooter";
import { StoryHeaderFooter } from "@/components/HeaderFooter/StoryHeaderFooter";
import { I18nWrapper } from "@/components/I18nWrapper";
import {
  LanguageToggle,
  LanguageToggleProvider,
} from "@/components/LanguageToggle";
import { Redirect } from "react-router-dom";
import { useClassroom } from "@/hooks/Classroom";
import { useLanguage } from "@/hooks/Language";
import { useStudent } from "@/hooks/Student";

type HeaderSize = "default" | "minimal";

export const StudentLayout: React.FC<
  React.PropsWithChildren<{ headerSize?: HeaderSize }>
> = ({ children, headerSize = "default" }) => {
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

  const Wrapper = headerSize === "minimal" ? StoryHeaderFooter : HeaderFooter;

  return (
    <I18nWrapper locale={language.slice(0, 2)}>
      <LanguageToggleProvider
        allowedLanguages={
          classroomInfo?.allowedLanguages ?? ["es", "en", "es.en"]
        }
      >
        <Wrapper>
          {children}
          {headerSize === "default"}
          {(classroomInfo?.allowLanguageToggle ?? true) && <LanguageToggle />}
        </Wrapper>
      </LanguageToggleProvider>
    </I18nWrapper>
  );
};
