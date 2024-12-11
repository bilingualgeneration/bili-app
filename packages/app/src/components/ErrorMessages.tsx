import { I18nMessage } from "@/components/I18nMessage";

interface ErrorMessages {
  errors: string[] | null;
  languageSource?: "authed" | "unauthed" | undefined;
}

export const ErrorMessages: React.FC<ErrorMessages> = ({
  errors,
  languageSource,
}) => {
  if (errors === null || errors.length === 0) {
    return <></>;
  }

  return (
    <>
      {errors.map((error) => (
        <div key={error}>
          <I18nMessage id={`errors.${error}`} languageSource={languageSource} />
        </div>
      ))}
    </>
  );
};
