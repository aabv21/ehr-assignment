import { MouseEventHandler, ReactNode } from "react";
import { Button } from "./ui/button";

type ActionsType = {
  label: string;
  onClick: MouseEventHandler;
};

interface PageViewProps {
  title: string;
  actions: Array<ActionsType>;
  children?: ReactNode;
  subtitle?: string;
  mode?: "subpage" | null;
}

const PageView = ({
  children,
  title,
  actions,
  mode,
  subtitle,
}: PageViewProps) => {
  return (
    <div className="space-y-6 m-24 h-full">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <p
            className={`font-bold ${
              mode === "subpage" ? "text-xl" : "text-3xl"
            }`}
          >
            {title}
          </p>
          {subtitle && <p className={`text-md text-semibold`}>{subtitle}</p>}
        </div>
        <div className="ml-auto flex gap-x-2">
          {actions.map(({ label, onClick }, index) => {
            return (
              <Button
                className="w-full p-6"
                onClick={onClick}
                key={`${label}-${index}`}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageView;
