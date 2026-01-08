import { cn } from "@/utils/cn";
import React, { useId } from "react";
import { CheckIcon } from "../icons";

type CheckboxProps = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  label?: string;
  onChange?: (e: boolean) => void;
};

function Checkbox({ className, label, onChange, ...props }: CheckboxProps) {
  const generatedId = useId();

  return (
    <div
      className={cn("flex cursor-pointer items-start gap-x-1",
        (props.disabled || props.readOnly) && "pointer-events-none", className)
      }
    >
      <input
        id={generatedId}
        type="checkbox"
        onChange={(e) =>
          !props.disabled && !props.readOnly && onChange && onChange(e.target.checked)
        }
        {...props}
        className={cn(
          "peer flex-none cursor-pointer appearance-none",
          "rounded-md border-2 border-black",
          "transition duration-150 ease-in-out",
          "focus:ring-gray-200",
          "checked:border-primary-500 checked:bg-primary-500 checked:focus:ring-primary-500/30",
          "relative",
          (props.disabled || props.readOnly) && "pointer-events-none"
        )}
        style={{ height: "20px", width: "20px" }}
      />

      <CheckIcon
        className={cn(
          "pointer-events-none invisible absolute transition-opacity duration-150 peer-checked:visible"
        )}
        size={20}
        stroke="white"
        strokeWidth={50}
        color="white"
      />

      {label && (
        <label htmlFor={generatedId} className={cn("cursor-pointer leading-tight", (props.disabled || props.readOnly) && "pointer-events-none")}>
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
