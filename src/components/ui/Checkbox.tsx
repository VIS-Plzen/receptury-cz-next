import { cn } from "@/utils/cn";
import clsx from "clsx";
import React from "react";
import { CheckIcon } from "../icons";

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className={clsx("flex items-center space-x-2 py-2")}>
      <div
        className={cn(
          "h-6 w-6 cursor-pointer rounded-md border-2 border-transparent transition-all duration-500",
          checked ? "hover:border-primary-500/30" : "hover:border-gray-300",
          "hover:border-primary-300/30"
        )}
        onClick={() => {
          onChange(id);
        }}
      >
        <div
          className={clsx(
            "h-5 w-5 rounded-md border-2 transition-all duration-500",
            checked ? "border-primary-500 bg-primary-500" : "border-black"
          )}
        >
          <div
            className={clsx(
              "intems-center flex transform items-center justify-center transition-all duration-300"
            )}
          >
            <CheckIcon className="text-white" size={16} />
          </div>
        </div>
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Checkbox;
