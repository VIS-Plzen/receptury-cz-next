"use client";
import Checkbox from "@/components/forms/Checkbox";
import MyCombobox from "@/components/forms/Combobox";
import {
  CancelIcon,
  CheckSmallIcon,
  CloseIcon,
  ExpandMoreIcon,
  TuneIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Paginator from "@/components/ui/Paginator";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import ToggleGridButton from "@/components/ui/ToggleGridButton";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useId, useMemo, useState } from "react";

export default function Receptury({
  title = "Receptury",
  initialData = [
    {
      Vlastnosti: {
        Nazev: "Smažené kuřecí řízečky, bramborové placičky",
        badges: ["Dieta", "Ryba a mořské plody"],
      },
    },
    {
      Vlastnosti: {
        Nazev: "Fusilli s mediteránskou omáčkou a smaženým sumečkem",
        badges: ["Dieta", "Ryba a mořské plody"],
      },
    },
    {
      Vlastnosti: {
        Nazev: "Smažené kuřecí řízečky, bramborové placičky",
        badges: ["Dieta", "Ryba a mořské plody"],
      },
    },
    {
      Vlastnosti: {
        Nazev: "Fusilli s mediteránskou omáčkou a smaženým sumečkem",
        badges: ["Dieta", "Ryba a mořské plody"],
      },
    },
    {
      Vlastnosti: {
        Nazev: "Smažené kuřecí řízečky, bramborové placičky",
        badges: ["Dieta", "Ryba a mořské plody"],
      },
    },
    {
      Vlastnosti: {
        Nazev: "Fusilli s mediteránskou omáčkou a smaženým sumečkem",
        badges: ["Dieta", "Ryba a mořské plody"],
      },
    },
  ],
  className = "",
  urlPreQuery = "",
}: {
  title?: string;
  initialData?: any;
  className?: string;
  urlPreQuery?: string;
}) {
  const [data, setData] = useState<any>(initialData);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const toggleId = useId();
  const [gridView, setGridView] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const paramsHook = useSearchParams();
  const urlParams = decodeURIComponent(
    paramsHook.toString().replaceAll("+", " ")
  );
  const urlParamsSplitted = urlParams.split("&");

  const [sideBarValues, setSideBarValues] = useState(() => {
    const holder = [
      {
        title: "Obecné",
        name: "obecne",
        options: [
          { title: "Moje oblíbené", name: "moje", checked: false },
          { title: "Nutričně ověřeno", name: "nutricni", checked: false },
          { title: "Stáhnout do skladu", name: "sklad", checked: false },
          {
            title: "Videorecepty",
            name: "videorecepty",
            checked: false,
          },
        ],
      },
      {
        title: "Speciální strava",
        name: "special",
        options: [
          { title: "Bezlepková", name: "bezlepkova", checked: false },
          { title: "Bezmléčná", name: "bezmlecna", checked: false },
          { title: "Šetřící", name: "setrici", checked: false },
        ],
      },
      {
        title: "Způsob přípravy",
        name: "priprava",
        options: [
          { title: "Vařené", name: "varene", checked: false },
          { title: "Dušené", name: "dusene", checked: false },
          { title: "Pečené", name: "pecene", checked: false },
          { title: "Zapečené", name: "zapecene", checked: false },
          { title: "Smažené", name: "smazene", checked: false },
          { title: "Ostatní", name: "ostatni", checked: false },
        ],
      },
    ];
    // Načte hodnoty z URL
    urlParamsSplitted.forEach((param) => {
      const [key, values] = splitUrlParams(param);
      const box = holder.find((b) => b.name === key);
      if (box && Array.isArray(values)) {
        values.forEach((v) => {
          const option = box.options.find((o) => o.name === v);
          if (option) {
            option.checked = true;
          }
        });
      }
    });

    return holder;
  });
  const [pageState, setPageState] = useState<number>(
    (() => {
      const urlParam = paramsHook.get("stranka");
      if (urlParam) return parseInt(urlParam);
      return 1;
    })()
  );

  function updateSideBarValue(
    boxIndex: number,
    checkboxIndex: number,
    checked: boolean
  ) {
    setSideBarValues((prev: any) => {
      let objHolder = prev;
      objHolder[boxIndex].options[checkboxIndex].checked = checked;
      return objHolder;
    });
    setRefresh(!refresh);
  }

  function splitUrlParams(param: string) {
    const [key, prevalues] = param.split("=");
    const values = prevalues ? prevalues.split(",") : "";
    return [key, values, prevalues];
  }

  const comboBoxValues = useMemo(() => {
    const holder = [
      {
        title: "Dle receptury",
        name: "receptura",
        value: "",
        options: ["Receptura 1", "Receptura 2"],
      },
      {
        title: "Dle suroviny",
        name: "surovina",
        value: "",
        options: ["Surovina 1", "Surovina 2"],
      },
    ];
    // Načte hodnoty z URL
    urlParamsSplitted.forEach((param) => {
      const [key, values] = splitUrlParams(param);
      const comboBox = holder.find((b) => b.name === key);
      if (comboBox) {
        comboBox.value = values[0];
      }
    });
    return holder;
  }, [urlParamsSplitted]);

  function resetFilters() {
    sideBarValues.forEach((box) => {
      box.options.forEach((option) => {
        option.checked = false;
      });
    });

    comboBoxValues.forEach((combo) => {
      combo.value = "";
    });
  }

  function updateCombobox(index: number, value: string) {
    comboBoxValues[index].value = value;
  }

  // vytvoří url parametry podle comboBoxů, pak podle checkboxů, pak přidá stránku a nahraje do routeru, pak refreshne vše
  async function getDataAndSetQuery(page: number) {
    let query = urlPreQuery;

    comboBoxValues.forEach((combo) => {
      if (combo.value === "") return;
      if (query === "") query += combo.name + "=" + combo.value;
      else query += "&" + combo.name + "=" + combo.value;
    });

    let hasBox = false;
    sideBarValues.forEach((box) => {
      let hasOption = false;
      box.options.forEach((option) => {
        if (!option.checked) return;
        if (!hasBox) {
          hasBox = true;
          if (!hasOption) {
            if (query !== "") {
              query += "&";
            }
            query += box.name + "=" + option.name;
          } else {
            query += "," + option.name;
          }
          hasOption = true;
        } else {
          if (!hasOption) {
            query += "&" + box.name + "=" + option.name;
          } else {
            hasOption = true;
            query += "," + option.name;
          }
        }
      });
    });

    if (page !== 1) {
      if (query === "") {
        query = "stranka=" + page;
      } else {
        query += "&stranka=" + page;
      }
    }

    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          Sid: "12345VIS",
          Funkce: "ObecnyDotaz",
          Parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
            Limit: 15,
            Offset: (page - 1) * 15,
            Vlastnosti: ["Nazev", "Identita", "Obrazek"],
          },
        }),
      })
    ).json();

    setTimeout(() => {
      setData(result);
    }, 5000);

    router.replace("?" + query, { scroll: false });

    return setRefresh(!refresh);
  }

  function changePage(page: number) {
    setPageState(page);
    getDataAndSetQuery(page);
  }

  return (
    <Container className={`py-6 ${className}`}>
      <TopRow
        comboBoxValues={comboBoxValues}
        data={initialData}
        gridView={gridView}
        setGridView={setGridView}
        setSideBarOpen={setSideBarOpen}
        sideBarOpen={sideBarOpen}
        title={title}
        toggleId={toggleId}
        updateCombobox={updateCombobox}
      />
      <div className="block lg:grid lg:grid-cols-5 xl:grid-cols-6">
        <MobileFilters
          comboBoxValues={comboBoxValues}
          resetFilters={resetFilters}
          setSideBarOpen={setSideBarOpen}
          sideBarOpen={sideBarOpen}
          sideBarValues={sideBarValues}
          updateCombobox={updateCombobox}
          updateSideBarValue={updateSideBarValue}
          getDataAndSetQuery={() => getDataAndSetQuery(pageState)}
        />
        <Suspense fallback={<h1>LOADING</h1>}>
          <RecipeCardsGrid
            className="col-span-4 pt-0 xl:col-span-5"
            gridView={gridView}
            isLoading={false}
            data={data}
          />
        </Suspense>
      </div>
      <Paginator
        currentPage={pageState}
        totalPages={25}
        changePage={(page) => changePage(page)}
      />
    </Container>
  );
}

function Comboboxes({
  className = "",
  comboBoxValues,
  updateCombobox,
}: {
  className: string;
  comboBoxValues: {
    title: string;
    name: string;
    options: any[];
    value: string;
  }[];
  updateCombobox: (index: number, value: string) => void;
}) {
  return (
    <div className={`${className}`}>
      {comboBoxValues.map((combo, index) => (
        <MyCombobox
          key={"cbvmy" + index}
          label={combo.title}
          name={combo.name}
          options={combo.options}
          selectedOption={combo.value}
          onChange={(value: string) => updateCombobox(index, value)}
          aria-label={"Vyhledat " + combo.title}
          z={100 - index}
        />
      ))}
    </div>
  );
}

function TopRow({
  title,
  data,
  comboBoxValues,
  gridView,
  setGridView,
  toggleId,
  sideBarOpen,
  setSideBarOpen,
  updateCombobox,
}: {
  title: string;
  data: any;
  comboBoxValues: {
    title: string;
    name: string;
    options: any[];
    value: string;
  }[];
  gridView: boolean;
  setGridView: (grid: boolean) => void;
  toggleId: any;
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
  updateCombobox: (index: number, value: string) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-between py-7">
      <div className="flex flex-col">
        <Heading>{title}</Heading>
        <p className="pt-3 font-bold text-black">
          Našli jsme pro vás {data.length} receptů
        </p>
      </div>
      <Comboboxes
        className="hidden grid-cols-2 gap-x-1 lg:grid lg:gap-x-5"
        comboBoxValues={comboBoxValues}
        updateCombobox={updateCombobox}
      />
      <div className="flex items-center gap-x-4">
        <ToggleGridButton
          className="hidden md:block"
          gridView={gridView}
          setGridView={setGridView}
          id={toggleId}
        />
        <Button
          variant="black"
          className="h-min lg:hidden"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          Filtry <TuneIcon />
        </Button>
      </div>
    </div>
  );
}

function MobileFilters({
  sideBarOpen,
  setSideBarOpen,
  resetFilters,
  sideBarValues,
  comboBoxValues,
  updateCombobox,
  updateSideBarValue,
  getDataAndSetQuery,
}: {
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
  resetFilters: () => void;
  sideBarValues: { title: string; options: any[] }[];
  comboBoxValues: {
    title: string;
    name: string;
    options: any[];
    value: string;
  }[];
  updateCombobox: (index: number, value: string) => void;
  updateSideBarValue: (
    boxIndex: number,
    optionIndex: number,
    value: boolean
  ) => void;
  getDataAndSetQuery: () => void;
}) {
  return (
    <>
      <Dialog.Root
        defaultOpen={false}
        open={sideBarOpen}
        onOpenChange={() => setSideBarOpen(false)}
        modal
      >
        <AnimatePresence initial={false}>
          <Dialog.Portal>
            {sideBarOpen && (
              <motion.div
                key="modal"
                className="lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <SideBar
                    comboBoxValues={comboBoxValues}
                    resetFilters={resetFilters}
                    setSideBarOpen={setSideBarOpen}
                    sideBarValues={sideBarValues}
                    updateCombobox={updateCombobox}
                    updateSideBarValue={updateSideBarValue}
                    getDataAndSetQuery={getDataAndSetQuery}
                  />
                </Dialog.Content>
              </motion.div>
            )}
          </Dialog.Portal>
        </AnimatePresence>
      </Dialog.Root>
      <div className="hidden lg:block">
        <SideBar
          comboBoxValues={comboBoxValues}
          resetFilters={resetFilters}
          setSideBarOpen={setSideBarOpen}
          sideBarValues={sideBarValues}
          updateCombobox={updateCombobox}
          updateSideBarValue={updateSideBarValue}
          getDataAndSetQuery={getDataAndSetQuery}
        />
      </div>
    </>
  );
}

function SideBar({
  setSideBarOpen,
  resetFilters,
  sideBarValues,
  comboBoxValues,
  updateCombobox,
  updateSideBarValue,
  getDataAndSetQuery,
}: {
  setSideBarOpen: (open: boolean) => void;
  resetFilters: () => void;
  sideBarValues: { title: string; options: any[] }[];
  comboBoxValues: {
    title: string;
    name: string;
    options: any[];
    value: string;
  }[];
  updateCombobox: (index: number, value: string) => void;
  updateSideBarValue: (
    boxIndex: number,
    optionIndex: number,
    value: boolean
  ) => void;
  getDataAndSetQuery: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-fixed flex flex-col overflow-y-auto rounded-xl border-2 border-primary-200 bg-white px-7 py-5 lg:static lg:z-fixed-below lg:mr-5 lg:block lg:py-3 lg:pl-3 lg:pr-3`}
    >
      <div className=" flex flex-row items-center justify-between lg:hidden">
        <Heading size="sm">Co hledáte?</Heading>
        <div className="flex space-x-8">
          <button onClick={() => setSideBarOpen(false)}>
            <CloseIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      <Comboboxes
        className="my-8 flex flex-col gap-y-5 lg:hidden"
        comboBoxValues={comboBoxValues}
        updateCombobox={updateCombobox}
      />
      <div className="">
        <Button
          className="mb-2 w-full max-w-sm"
          variant="black"
          size="sm"
          onClick={() => getDataAndSetQuery()}
          disabled
        >
          <CheckSmallIcon className="shrink-0" />
          Potvrdit výběr
        </Button>
        <Button
          className="mb-2 w-full max-w-sm"
          variant="black"
          size="sm"
          onClick={() => resetFilters()}
          disabled
        >
          <CancelIcon className="shrink-0" />
          Zrušit vše
        </Button>
      </div>
      {sideBarValues.map((box, index) => (
        <SideBarBox
          key={"ffsbb" + index}
          title={box.title}
          options={box.options}
          bIndex={index}
          updateSideBarValue={updateSideBarValue}
        />
      ))}
    </div>
  );
}

function SideBarBox({
  title,
  bIndex,
  options,
  updateSideBarValue,
}: {
  title: string;
  bIndex: number;
  options: any[];
  updateSideBarValue: (
    boxIndex: number,
    optionIndex: number,
    value: boolean
  ) => void;
}) {
  const [open, setOpen] = useState(true);

  const variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.15, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <div className="border-t border-primary-200 py-2">
      <div>
        <button
          onClick={() => setOpen(!open)}
          aria-label={!open ? "Zobrazit" : "Skrýt"}
          className="mb-4 w-full rounded-lg"
        >
          <div className="flex w-full flex-row items-center justify-between text-center">
            <Heading as="h3" size="inherit">
              {title}
            </Heading>
            <ExpandMoreIcon
              className={`${!open && "translate rotate-180 duration-100"}`}
            />
          </div>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="space-y-2"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.25 }}
          >
            {options.map((o: any, oIndex: number) => (
              <motion.li key={"sbbo" + oIndex} className={`cursor-pointer`}>
                <Checkbox
                  checked={o.checked}
                  label={o.title}
                  onChange={(e: any) => updateSideBarValue(bIndex, oIndex, e)}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
