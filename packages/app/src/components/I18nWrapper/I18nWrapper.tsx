import { IntlProvider } from "react-intl";
import { PropsWithChildren, useEffect, useState } from "react";

import { createIntl, createIntlCache, IntlShape } from "react-intl";

// import default from start
// instead of waiting for it to load
import en from "./lang/en.json";
import es from "./lang/es.json";

const translations: { [key: string]: any } = {
  en,
  es,
};

export const I18nWrapper = ({
  children,
  locale = "es",
}: PropsWithChildren<{
  locale?: string;
}>) => {
  return (
    <>
      <IntlProvider locale={locale} messages={translations[locale]}>
        {children}
      </IntlProvider>
    </>
  );
};
