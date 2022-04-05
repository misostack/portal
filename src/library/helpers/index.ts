export const getUserLanguage = (
  supportedLanguages: string[],
  defaultLanguage: string
) => {
  const navigatorLanguage = window.navigator.language || defaultLanguage;
  // browser navigator language format "language-CountryCode"
  const language = navigatorLanguage.includes("-")
    ? navigatorLanguage.split("-")[0]
    : navigatorLanguage;
  return supportedLanguages.includes(language) ? language : defaultLanguage;
};
