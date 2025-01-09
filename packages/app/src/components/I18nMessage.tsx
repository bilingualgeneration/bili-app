import { useI18n } from "@/hooks/I18n";

interface I18nMessage {
  id: string;
  languageSource?: "authed" | "unauthed";
  level?: number;
  wrapper?: any;
}

export const I18nMessage: React.FC<I18nMessage> = ({
  id,
  languageSource = "authed",
  level = 1,
  wrapper,
}) => {
  const { getLanguage, getText } = useI18n();
  const language = getLanguage(level, languageSource);
  const text = getText(id, level, languageSource);
  if (text === null) {
    return <></>;
  }
  if (text === undefined) {
    return (
      <span className="i18n-error">{`missing ${language} key for ${id}`}</span>
    );
  }
  if (wrapper) {
    return wrapper(text);
  } else {
    return text;
  }
};
