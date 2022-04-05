const SUPPORTED_LANGUAGES = (
  import.meta.env.VITE_SUPPORTED_LANGUAGES || "en,vi"
).toString();
const DEFAULT_LANGUAGE = (
  import.meta.env.VITE_DEFAULT_LANGUAGE || "vi"
).toString();
const config = {
  supportedLanguages: SUPPORTED_LANGUAGES.split(","),
  defaultLanguage: DEFAULT_LANGUAGE,
};

export default config;
