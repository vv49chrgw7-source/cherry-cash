"use client";

import Link from "next/link";
import {
  Palette,
  Bell,
  Coins,
  Download,
  Upload,
  Trash2,
  ChevronRight,
  Languages,
} from "lucide-react";

type SettingItem = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  danger?: boolean;
  href?: string;
};

const settings: SettingItem[] = [
  {
    icon: Palette,
    title: "Внешний вид",
    subtitle: "Тема и цвет приложения",
  },
  {
    icon: Languages,
    title: "Язык",
    subtitle: "Русский",
    href: "/settings/language",
  },
  {
    icon: Coins,
    title: "Валюта",
    subtitle: "₴ Гривна",
  },
  {
    icon: Bell,
    title: "Уведомления",
    subtitle: "Настроить уведомления",
  },
  {
    icon: Download,
    title: "Экспорт данных",
    subtitle: "Сохранить резервную копию",
  },
  {
    icon: Upload,
    title: "Импорт данных",
    subtitle: "Восстановить данные",
  },
  {
    icon: Trash2,
    title: "Очистить данные",
    subtitle: "Удалить все операции",
    danger: true,
  },
];

export default function SettingsPage() {
  return (
    <main className="page-padding min-h-screen pb-40">
      <h1 className="text-4xl font-black">
        ⚙️ Настройки
      </h1>

      <p className="mt-2 text-gray-500">
        Настройте Cherry Cash под себя
      </p>

      <div className="mt-8 space-y-4">
        {settings.map((item) => {
          const Icon = item.icon;

          const content = (
            <div className="glass card-hover flex w-full items-center justify-between rounded-3xl p-5 text-left">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl p-3 ${
                    item.danger
                      ? "bg-red-100 text-red-500"
                      : "bg-pink-100 text-pink-600"
                  }`}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3
                    className={`font-bold ${
                      item.danger ? "text-red-500" : ""
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight className="text-gray-400" />
            </div>
          );

          return item.href ? (
<Link
  key={item.title}
  href={item.href}
  className="block"
>
  {content}
</Link>
          ) : (
            <button
              key={item.title}
              className="w-full text-left"
            >
              {content}
            </button>
          );
        })}
      </div>
    </main>
  );
}