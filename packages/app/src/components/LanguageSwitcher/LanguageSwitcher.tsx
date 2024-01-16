import { FC, useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { locales } from "@/components/I18nWrapper";
import type { locale } from "@/components/I18nWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select } from "@/components/Select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toggle } from "@/components/Toggle";
import { useForm, useWatch } from "react-hook-form";

export const LanguageSwitcher: FC = () => {
  const intl = useIntl();
  const { locale, setLocale } = useLanguage();
  const schema = z.object({
    isSpanish: z.boolean(),
  });
  type schemaType = z.infer<typeof schema>;
  const { control } = useForm<schemaType>({
    defaultValues: {
      isSpanish: locale === "es",
    },
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const isSpanish: boolean = useWatch({
    control,
    name: "isSpanish",
  });

  useEffect(() => {
    setLocale(isSpanish ? "es" : "en");
  }, [isSpanish]);

  return (
    <>
      <Toggle
        checked={isSpanish}
        control={control}
        label={intl.formatMessage({
          id: "languageMode",
          defaultMessage: "English Mode",
          description: "Label for language mode toggle",
        })}
        name="isSpanish"
      />
    </>
  );
};
