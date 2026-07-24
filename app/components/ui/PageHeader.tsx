import { ReactNode } from "react";

interface PageHeaderProps {
  subtitle: string;
  title: string;
  action?: ReactNode;
}

export default function PageHeader({
  subtitle,
  title,
  action,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/40 bg-white/70 px-5 py-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>

          <h1 className="text-3xl font-bold">
            {title}
          </h1>
        </div>

        {action}
      </div>
    </header>
  );
}