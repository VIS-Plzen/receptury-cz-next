"use";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef, useState } from "react";
import { CheckIcon, SearchIcon } from "../icons";

type Props = {
  id?: string;
  name?: string;
  label?: string;
  options: string[];
  selectedOption?: string;
  z?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: any;
  error?: string | false;
  [x: string]: any;
};

export default function MyCombobox({
  id,
  name,
  label,
  options,
  selectedOption = "",
  z,
  isDisabled = false,
  isRequired = false,
  onChange,
  error,
  ...rest
}: Props) {
  const [selectedValue, setSelectedValue] = useState(selectedOption);
  const [query, setQuery] = useState(selectedOption);

  const ref: any = useRef(null);

  const filteredValues =
    query === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase());
        });
  if (isDisabled) {
    return (
      <div className={`relative h-16 w-full ${error && "mb-3"}`}>
        <div
          className={clsx(
            "flex h-full w-full items-start justify-start rounded-2xl border-0 outline-none ring-0",
            "h-16 px-5 py-2.5",
            "text-default",
            "focus:outline-none focus:ring-0",
            "transition-colors duration-200",
            isDisabled && "cursor-not-allowed",
            error && "ring-1 ring-error focus:ring-2",
            label && "pt-7"
          )}
          tabIndex={isDisabled ? -1 : undefined}
          id={id}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {selectedValue}
        </div>
        {error && (
          <p className="absolute bottom-[-1.125rem] left-0 block text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full max-w-sm`} style={{ zIndex: z }}>
      <Combobox
        name={name}
        value={selectedValue ? selectedValue : ""}
        onChange={(e: any) => {
          setSelectedValue(e);
          onChange(e);
        }}
      >
        <div
          className={clsx("relative mt-1", isDisabled && "cursor-not-allowed")}
        >
          <div className={`relative h-10 ${error && "mb-3"}`}>
            <Combobox.Label className="sr-only">{label}</Combobox.Label>
            <Combobox.Input
              className={clsx(
                "flex h-full w-full items-start justify-start rounded-xl border border-primary-400 bg-primary-50 outline-none ring-0",
                "h-16 py-2.5 pl-9 pr-5",
                "bg-gray-75 text-default dark:bg-gray-975 hover:bg-gray-100 focus:bg-gray-100",
                "focus:outline-none focus:ring-0",
                "transition-colors duration-200",
                isDisabled && "cursor-not-allowed",
                error && "ring-1 ring-error focus:ring-2"
              )}
              tabIndex={isDisabled ? -1 : undefined}
              name={name}
              id={id}
              placeholder={label}
              ref={ref}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              onChange={(e) => {
                if (isDisabled) return;
                setSelectedValue(e.target.value);
                setQuery(e.target.value);
              }}
              autoComplete="off"
              {...rest}
            />
            <Combobox.Button
              className={clsx(
                "absolute inset-y-0 flex items-center pl-2",
                isDisabled && "cursor-not-allowed"
              )}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                }
              }}
              aria-label="Vyhledávat"
            >
              <SearchIcon
                className="h-5 w-5 text-primary-500"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => onChange(query)}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredValues.length === 0 && query !== "" ? (
                <button
                  className="relative select-none px-4 py-2 text-gray-700"
                  onClick={() => onChange(query)}
                >
                  Nenalezeno, přesto vyhledat.
                </button>
              ) : (
                filteredValues.map((value, key) => (
                  <Combobox.Option
                    key={key}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary text-white" : "text-muted"
                      }`
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <button
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                          onClick={() => onChange(value)}
                        >
                          {value}
                        </button>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
