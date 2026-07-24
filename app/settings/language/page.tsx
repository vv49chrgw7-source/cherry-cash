"use client";

import { Check, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <main className="page-padding min-h-screen pb-40">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-2xl bg-white p-3 shadow-md transition hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <h1 className="text-4xl font-black">
            🌍 Язык
          </h1>

          <p className="mt-1 text-gray-500">
            Выберите язык приложения
          </p>
        </div>
      </div>

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