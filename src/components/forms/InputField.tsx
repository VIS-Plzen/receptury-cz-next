import { cn } from "@/utils/cn";
import { forwardRef, useId } from "react";
import ErrorText from "./ErrorText";
import Label from "./Label";

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

    const handleKeyPress = (event: any) => {
      if (event.keyCode !== 13 && event.keyCode !== 27) return;
      // Enter
      if (event.keyCode === 13) {
        event.target.blur();
      }
      // Escape
      else if (event.keyCode === 27) {
        event.target.blur();
      }
    };

    return (
      <div className={cn("relative w-full py-3", className)}>
        <div className="relative">
          <input
            ref={forwardedRef}
            id={generatedId}
            type={type}
            name={name}
            onKeyDown={handleKeyPress}
            placeholder=""
            className={cn(
              "block h-14 w-full appearance-none px-3 pt-2.5",
              "rounded-lg border-2 border-primary-200",
              "bg-white text-base text-gray-900",
              "placeholder-transparent",
              "focus:border-primary focus:ring-primary/50",
              "peer transition duration-150",
              errorText &&
                "border-error-500/70 focus:border-error-600 focus:ring-error-600/50",
              props.disabled && "pointer-events-none"
            )}
            {...props}
          />
          {label && (
            <Label
              htmlFor={generatedId}
              className={cn("pb-1", props.disabled && "pointer-events-none")}
            >
              {label}
              {props.required && <span className="ml-1 text-error-500">*</span>}
            </Label>
          )}
          {errorText && <ErrorText>{errorText}</ErrorText>}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
