"use";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { CheckIcon, SearchIcon } from "../icons";

type Props = {
  id?: string;
  label?: string;
  options: string[];
  selectedOption?: string;
  z?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: any;
  onEnter?: any;
  error?: string | false;
  [x: string]: any;
};

export default function MyCombobox({
  id,
  label,
  options,
  selectedOption = "",
  z,
  isDisabled = false,
  isRequired = false,
  onChange,
  onEnter,
  error,
  ...rest
}: Props) {
  const [selectedValue, setSelectedValue] = useState(selectedOption);
  const [query, setQuery] = useState("");

  const filteredValues =
    query === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={`w-full`} style={{ zIndex: z }}>
      <Combobox value={selectedValue} disabled={isDisabled}>
        <div
          className={clsx("relative mt-1", isDisabled && "cursor-not-allowed")}
        >
          <div className={`relative ${error && "mb-3"}`}>
            <Combobox.Label className="sr-only">{label}</Combobox.Label>
            <Combobox.Input
              className={clsx(
                "flex h-full w-full items-start justify-start rounded-xl border-2 border-primary-300 bg-primary-50 outline-none ring-0",
                "py-2.5 pl-9 pr-5",
                "focus:outline-none focus:ring-0",
                "transition-colors duration-200",
                isDisabled && "cursor-not-allowed",
                error && "ring-1 ring-error focus:ring-2"
              )}
              tabIndex={isDisabled ? -1 : undefined}
              id={id}
              placeholder={label}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={(e: any) => {
                if (e.key !== "Enter") return;
                const active = document.querySelectorAll(
                  '[data-headlessui-state="active"]'
                )[0];
                if (active) {
                  const activeValue = active.id;
                  setQuery(activeValue);
                  setSelectedValue(activeValue);
                  onChange(activeValue);
                  onEnter && onEnter();
                }
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
          >
            <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl border-2 border-primary-300 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {query.length > 0 && <Option value={query} onClick={onChange} />}
              {filteredValues.map((value, key) => (
                <Option value={value} onClick={onChange} key={"iiik" + key} />
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

function Option({
  id,
  value,
  onClick,
}: {
  id?: string;
  value: string;
  onClick: (value: string) => void;
}) {
  return (
    <Combobox.Option
      id={value}
      className={({ active }) =>
        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
          active && "bg-primary-200"
        }`
      }
      value={value}
      onClick={() => onClick(value)}
    >
      {({ selected, active }) => (
        <>
          <button
            className={`block truncate ${
              selected ? "font-medium" : "font-normal"
            }`}
          >
            {value}
          </button>
          {selected && (
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                active ? "text-white" : "text-teal-600"
              }`}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Combobox.Option>
  );
}
