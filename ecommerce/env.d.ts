declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_URL: string; // this is the line you want
    }
  }
}
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
