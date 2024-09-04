import { cn } from "@/utils/cn";
import clsx from "clsx";
import { forwardRef, useId, useState } from "react";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";
import ErrorText from "./ErrorText";
import HelperText from "./HelperText";
import Label from "./Label";

// Features:
// - [x] custom generated id for input and label
// - [x] Required input - add asterisk to label
// - [x] Helper text
// - [x] Disabled state
// - [x] Error state and error text

type Props = React.ComponentPropsWithoutRef<"input"> & {
  name: string;
  label?: string;
  variant?: "gray" | "white";
  helperText?: string | boolean | undefined | null;
  errorText?: string | boolean | undefined | null;
  className?: string;
};

const variantClasses = {
  gray: "bg-primary-50 text-gray-900",
  white: "bg-white text-gray-900",
};

const PasswordField = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      variant = "white",
      helperText,
      errorText,
      className = "",
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = useId();

    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={clsx("relative w-full", className)}>
        <div
          className={cn(
            "relative mb-4 flex w-full flex-col items-start justify-start gap-1 overflow-clip pr-6",
            "rounded-lg border-2 border-primary-200",
            variantClasses[variant],
            "focus-within:border-primary focus-within:ring-primary/50",
            errorText &&
              "border-error-500/70 focus-within:border-error-600 focus-within:ring-error-600/50",
            props.disabled && "cursor-not-allowed opacity-70"
          )}
        >
          {/* Label */}
          {label && (
            <Label
              htmlFor={generatedId}
              className={`font-semibold ${
                props.disabled && "pointer-events-none"
              }`}
            >
              {label}{" "}
              {props.required && <span className="text-error-500">*</span>}
            </Label>
          )}
          {/* Helper text */}
          {helperText && <HelperText>{helperText}</HelperText>}
          {/* Input */}
          <input
            ref={forwardedRef}
            id={generatedId}
            type={showPassword ? "text" : "password"}
            name={name}
            className={cn(
              "block w-full appearance-none px-3 py-2.5",
              "rounded-lg",
              "text-base text-gray-900",
              variantClasses[variant],
              "focus:outline-none",
              "placeholder:text-gray-700/60",
              "transition duration-150",
              props.disabled && "pointer-events-none"
            )}
            {...props}
          />

          {/* Toggle password visibility */}
          <ToggleButton
            className="absolute right-2.5 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            type="button"
          />
        </div>
        {/* Error text */}
        {errorText && (
          <ErrorText className="absolute bottom-[-15px]">{errorText}</ErrorText>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";
export default PasswordField;

function ToggleButton({
  showPassword,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  showPassword: boolean;
}) {
  return (
    <button {...props}>
      {showPassword ? (
        <VisibilityIcon size={22} />
      ) : (
        <VisibilityOffIcon size={22} />
      )}
    </button>
  );
}
