import clsx from "clsx";
import React from "react";

type RadioButtonProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
  animateDot: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  label,
  checked,
  onChange,
  animateDot,
}) => {
  return (
    <div className={clsx("flex items-center space-x-2 py-2")}>
      <div
        className={clsx(
          "cursor-pointer rounded-full border-2 border-transparent transition-all duration-500",
          checked ? "hover:border-primary-500/30" : "hover:border-gray-300"
        )}
      >
        <div
          className={clsx(
            "rounded-full border-2 transition-all duration-500",
            checked ? "border-primary-500" : "border-black"
          )}
          onClick={() => onChange(id)}
        >
          <div
            className={clsx(
              "m-0.5 h-4 w-4 rounded-full bg-primary-500",
              "transition-all duration-300",
              animateDot
            )}
            style={{
              transform: checked ? "scale(1)" : "scale(0)",
            }}
          />
        </div>
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default RadioButton;
