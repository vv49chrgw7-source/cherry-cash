"use client";

import { Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const languages = [
  {
    code: "ru",
    flag: "🇷🇺",
    name: "Русский",
  },
  {
    code: "uk",
    flag: "🇺🇦",
    name: "Українська",
  },
  {
    code: "en",
    flag: "🇬🇧",
    name: "English",
  },
] as const;

export default function LanguagePage() {
  const { language, setLanguage } = useLanguage();

  return (
    <main className="page-padding min-h-screen pb-40">
      <h1 className="text-4xl font-black">
        🌍 Язык
      </h1>

      <p className="mt-2 text-gray-500">
        Выберите язык приложения
      </p>

      <div className="mt-8 space-y-4">
        {languages.map((item) => (
          <button
            key={item.code}
            onClick={() => setLanguage(item.code)}
            className="glass card-hover flex w-full items-center justify-between rounded-3xl p-5"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">
                {item.flag}
              </div>

              <span className="text-lg font-semibold">
                {item.name}
              </span>
            </div>

            {language === item.code && (
              <Check
                size={24}
                className="text-pink-600"
              />
            )}
          </button>
        ))}
      </div>
    </main>
  );
}