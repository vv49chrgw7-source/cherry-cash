"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import ru from "../locales/ru";
import uk from "../locales/uk";
import en from "../locales/en";

type Language = "ru" | "uk" | "en";

const dictionaries = {
  ru,
  uk,
  en,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof ru;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;

    if (saved) {
      setLanguageState(saved);
    }
  }, []);

  function setLanguage(language: Language) {
    setLanguageState(language);
    localStorage.setItem("language", language);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: dictionaries[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}