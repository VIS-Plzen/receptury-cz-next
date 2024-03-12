"use client";

import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ExpandLessIcon, ExpandMoreIcon } from "../icons";

type Props = {
  data: any;
  selected: any;
  setSelected: (selected: any) => void;
  className?: string;
  updateFunction?: any;
};

function Selector({
  data,
  selected,
  setSelected,
  className,
  updateFunction,
}: Props) {
  return (
    <div className={clsx("relative w-full space-y-4", className)}>
      <Listbox
        value={selected}
        onChange={(newValue: any) => {
          setSelected(
            data.find((tab: any) => tab.value === newValue).value ||
              data[0].value
          );
        }}
      >
        <div className="relative">
          <Listbox.Button className="w-full rounded-2xl border-2 border-primary-200 bg-white focus:border-primary/50 focus:ring-0">
            <div className="flex items-center justify-between p-2.5">
              <span className="block truncate">
                {data.find((tab: any) => tab.value === selected)?.title}
              </span>

              <div>
                <ExpandLessIcon className="-mb-2.5 opacity-50" size={18} />
                <ExpandMoreIcon className="-mt-2.5 opacity-50" size={18} />
              </div>
            </div>
          </Listbox.Button>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-2 w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-primary-200 bg-white">
              {data.map((tab: any) => (
                <Listbox.Option
                  key={tab.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "text-amber-900 bg-primary-300/30"
                        : "text-gray-900"
                    }`
                  }
                  value={tab.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-normal"
                        }`}
                      >
                        {tab.title}
                      </span>
                      {selected ? (
                        <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default Selector;
