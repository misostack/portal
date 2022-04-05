/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: number;
  readonly VITE_APP_COOKIE: string;
  readonly VITE_APP_COOKIE_EXPIRED_DAYS: string;
  readonly VITE_SUPPORTED_LANGUAGES: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
