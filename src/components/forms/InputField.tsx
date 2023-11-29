import { cn } from "@/utils/cn";
import { forwardRef, useId } from "react";
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
  type?: "text" | "email" | "tel" | "url" | "number";
  label?: string;
  helperText?: string | boolean | undefined | null;
  errorText?: string | boolean | undefined | null;
  className?: string;
  [key: string]: any;
};

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      type = "text",
      label,
      helperText,
      errorText,
      className = "",
      ...props
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    return (
      <div
        className={cn(
          "flex w-full flex-col items-start justify-start gap-1",
          props.disabled && "cursor-not-allowed opacity-70",
          className
        )}
      >
        {/* Label */}
        {label && (
          <Label
            htmlFor={generatedId}
            className={cn("pb-1", props.disabled && "pointer-events-none")}
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
            "block w-full appearance-none px-3 py-2",
            "rounded-lg border-2 border-primary-200",
            "bg-white text-base text-gray-900",
            "placeholder:text-gray-700/60",
            "focus:border-primary focus:ring-primary/50",
            "transition duration-150",
            errorText &&
              "border-error-500/70 focus:border-error-600 focus:ring-error-600/50",
            props.disabled && "pointer-events-none"
          )}
          {...props}
        />
        {/* Error text */}
        {errorText && <ErrorText>{errorText}</ErrorText>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
