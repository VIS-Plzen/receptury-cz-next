import { cn } from "@/utils/cn";
import { forwardRef, useId } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
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
  type?: "text" | "email" | "tel" | "url" | "number" | "password";
  label?: string;
  variant?: "gray" | "white";
  helperText?: string | boolean | undefined | null;
  errorText?: string | boolean | undefined | null;
  className?: string;
  isLoading?: boolean;
};

const variantClasses = {
  gray: "bg-primary-50 text-gray-900",
  white: "bg-white text-gray-900",
};

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      type = "text",
      label,
      variant = "white",
      helperText,
      errorText,
      className = "",
      isLoading = false,
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = useId();

    return (
      <div
        className={cn(
          "relative flex w-full flex-col items-start justify-start gap-1 py-1",
          props.disabled && "cursor-not-allowed opacity-70",
          className
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
          type={type}
          name={name}
          className={cn(
            "mb-4 block w-full appearance-none px-3 py-2.5 focus:outline-none",
            "rounded-lg border-2 border-primary-200",
            variantClasses[variant],
            "text-base text-gray-900",
            "placeholder:text-gray-700/60",
            "focus:border-primary focus:ring-primary/50",
            "transition duration-150",
            errorText &&
              "border-error-500/70 focus:border-error-600 focus:ring-error-600/50",
            props.disabled && "pointer-events-none"
          )}
          {...props}
        />
        {isLoading && <LoadingSpinner className="absolute left-2.5 top-1/2" />}

        {/* Error text */}
        {errorText && (
          <ErrorText className="absolute bottom-[5px]">{errorText}</ErrorText>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";
export default InputField;
