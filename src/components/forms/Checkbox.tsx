import { cn } from "@/utils/cn";
import { clsx } from "clsx";
import React, { useId } from "react";
import { CheckIcon } from "../icons";

type CheckboxProps = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  label?: string;
  onChange?: (e: boolean) => void;
};

function Checkbox({ className, label, onChange, ...props }: CheckboxProps) {
  const generatedId = useId();
  {
    console.log(label, props.checked);
  }

  return (
    <div className={cn("flex cursor-pointer gap-2", className)}>
      <input
        id={generatedId}
        type="checkbox"
        onChange={(e) => onChange && onChange(e.target.checked)}
        {...props}
        className={clsx(
          "peer cursor-pointer appearance-none",
          "h-5 w-5 rounded-md border-2 border-black",
          "transition duration-150 ease-in-out",
          "focus:ring-gray-200",
          "checked:border-primary-500 checked:bg-primary-500 checked:focus:ring-primary-500/30",
          "relative"
        )}
      />

      <CheckIcon
        className={clsx(
          "pointer-events-none invisible absolute transition-opacity duration-150 peer-checked:visible"
        )}
        size={20}
        stroke="white"
        strokeWidth={50}
        color="white"
      />

      {label && (
        <label htmlFor={generatedId} className="cursor-pointer pt-0.5">
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
