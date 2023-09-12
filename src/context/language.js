import react from "react";

export const languageContext = react.createContext();

// we use this as a layer
export const LanguageProvider = languageContext.Provider;
