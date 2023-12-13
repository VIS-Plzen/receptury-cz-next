import clsx from "clsx";
import { forwardRef, useId } from "react";

type CheckboxProps = {
  name: string;
  label?: React.ReactNode | string;
  isRequired?: boolean;
  isDisabled?: boolean;
  toastText?: string;
  error?: string;
  className?: string;
  parentClassName?: string;
  checkBoxClassName?: string;
  [x: string]: any;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name = "checkbox_name",
      label,
      isRequired = false,
      isDisabled = false,
      toastText,
      error = "",
      className = "",
      parentClassName = "",
      checkBoxClassName,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    return (
      <div
        className={clsx(
          "relative w-full",
          isDisabled && "cursor-not-allowed",
          className
        )}
      >
        <div
          className={clsx(
            "flex w-full items-center justify-start gap-2.5",
            parentClassName
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={id}
            name={name}
            {...rest}
            onClick={(e: any) => {
              if (isDisabled) {
                e.preventDefault();
              }
            }}
            tabIndex={isDisabled ? -1 : undefined}
            className={clsx(
              "form-checkbox h-[1.375rem] w-[1.375rem] rounded-md border-0 border-none outline-none",
              "bg-gray-75 dark:bg-gray-975",
              "checked:bg-primary checked:text-primary dark:checked:bg-primary dark:checked:text-primary/50",
              isDisabled
                ? "cursor-not-allowed focus:ring-transparent"
                : "cursor-pointer",
              // Focus styly aplikované pouze pro klávesnici (ne pro myš)
              error && "ring-1 ring-error",
              checkBoxClassName
            )}
          />
          {label && (
            <label
              htmlFor={id}
              className={clsx(
                isDisabled ? "cursor-not-allowed" : "cursor-pointer"
              )}
            >
              {isRequired && !isDisabled && (
                <span className="mr-2 text-error">*</span>
              )}
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="absolute bottom-[-1.125rem] left-0 block text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "CheckboxInput";
export default Checkbox;
