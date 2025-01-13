import { I18nMessage } from "@/components/I18nMessage";

interface ErrorMessages {
  className?: string;
  errors: string[] | null;
  languageSource?: "authed" | "unauthed" | undefined;
}

export const ErrorMessages: React.FC<ErrorMessages> = ({
  className,
  errors,
  languageSource,
}) => {
  if (errors === null || errors.length === 0) {
    return <></>;
  }

  return (
    <>
      {errors.map((error) => (
        <div className={className} key={error}>
          <I18nMessage id={`errors.${error}`} languageSource={languageSource} />
        </div>
      ))}
    </>
  );
};
