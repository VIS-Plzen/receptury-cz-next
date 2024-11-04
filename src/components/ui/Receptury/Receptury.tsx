"use client";
import Checkbox from "@/components/forms/Checkbox";
import MyCombobox from "@/components/forms/Combobox";
import Radio from "@/components/forms/Radio";
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
import Selector from "@/components/ui/Selector";
import ToggleGridButton from "@/components/ui/ToggleGridButton";
import { toast } from "@/hooks/useToast";
import { returnExpirationTime } from "@/utils/shorties";
import { suroviny } from "@/utils/static";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import Cookies from "universal-cookie";
import { recipesPerPage } from "./Ssr";

export default function Receptury({
  title = "Receptury",
  className = "",
  urlPreQuery = "",
  boxSettings,
  initialData,
  groupsData,
  isGridView,
  logged,
  paid,
}: {
  title?: string;
  initialData?: any;
  className?: string;
  urlPreQuery?: string;
  boxSettings?: {
    hiddenBoxes?: string[];
    disabledValues?: string[];
    initialTrue?: string[];
  };
  groupsData: any;
  isGridView?: boolean;
  logged?: string | boolean;
  paid?: string | boolean;
}) {
  const [data, setData] = useState<any>(initialData);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const toggleId = useId();
  const [gridView, setGridView] = useState(isGridView);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const paramsHook = useSearchParams();
  const urlParams = decodeURIComponent(
    paramsHook.toString().replaceAll("+", " ")
  );
  const urlParamsSplitted = urlParams.split("&");
  const paramsObjects = Object.fromEntries(paramsHook);

  const cookie = new Cookies();

  const urlGroup =
    paramsObjects &&
    paramsObjects.skupina &&
    groupsData.find((group: any) => group.value === paramsObjects.skupina);

  const [selectedGroup, setSelectedGroup] = useState(
    urlGroup ? urlGroup.value : "nezadano"
  );

  const urlSubGroup =
    paramsObjects &&
    urlGroup &&
    paramsObjects.podskupina &&
    urlGroup.options.find(
      (subgroup: any) => subgroup.value === paramsObjects.podskupina
    );

  const [selectedSubgroup, setSelectedSubgroup] = useState(
    urlSubGroup
      ? urlSubGroup.value
      : urlGroup
        ? urlGroup.options.length !== 0
          ? urlGroup.options[0].value
          : ""
        : ""
  );

  const [saveDisabled, setSaveDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(true);

  // loading tlačítek a karet
  const [loading, setLoading] = useState<boolean>(initialData ? false : true);

  const [sideBarValues, setSideBarValues] = useState(() => {
    let holder: {
      title: string;
      name: string;
      backend: string;
      options: {
        title: string;
        name: string;
        checked: boolean;
        disabled?: boolean;
        backend?: string;
      }[];
    }[] = [
      {
        title: "Obecné",
        name: "obecne",
        backend: "Obecne",
        options: [
          {
            title: "Moje oblíbené",
            name: "moje",
            backend: "Oblíbené",
            checked: false,
          },
          {
            title: "Nutričně ověřeno",
            name: "nutricni",
            backend: "SchvalenoNT",
            checked: false,
          },
          {
            title: "Stáhnout do skladu",
            name: "sklad",
            backend: "MSklad",
            checked: false,
          },
          {
            title: "Videoreceptury",
            name: "videoreceptury",
            checked: false,
            backend: "Video",
          },
        ],
      },
      {
        title: "Speciální strava",
        name: "special",
        backend: "Dieta",
        options: [
          {
            title: "Bezlepková",
            name: "bezlepkova",
            backend: "Dieta1",
            checked: false,
          },
          {
            title: "Bezmléčná",
            name: "bezmlecna",
            backend: "Dieta2",
            checked: false,
          },
          {
            title: "Šetřící",
            name: "setrici",
            backend: "Dieta3",
            checked: false,
          },
        ],
      },
      {
        title: "Způsob přípravy",
        name: "priprava",
        backend: "TepelnaUprava",
        options: [
          {
            title: "Vařené",
            name: "varene",
            backend: "Vařené",
            checked: false,
          },
          {
            title: "Dušené",
            name: "dusene",
            backend: "Dušené",
            checked: false,
          },
          {
            title: "Pečené",
            name: "pecene",
            backend: "Pečené",
            checked: false,
          },
          {
            title: "Zapečené",
            name: "zapecene",
            backend: "Zapečené",
            checked: false,
          },
          {
            title: "Smažené",
            name: "smazene",
            backend: "Smažené",
            checked: false,
          },
          {
            title: "Ostatní",
            name: "ostatni",
            backend: "Ostatní",
            checked: false,
          },
        ],
      },
      {
        title: "Partner",
        name: "partner",
        backend: "Receptar",
        options: [
          {
            title: "Bidfood",
            name: "bidfood",
            backend: "1",
            checked: false,
          },
          {
            title: "Bonduelle",
            name: "bonduelle",
            backend: "2",
            checked: false,
          },
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

    if (boxSettings) {
      holder.forEach((box) =>
        box.options.forEach((boxValue) => {
          const valueName = boxValue.name;
          if (boxSettings.initialTrue?.includes(valueName))
            boxValue.checked = true;
          if (boxSettings.disabledValues?.includes(valueName))
            boxValue.disabled = true;
        })
      );
    }
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
    checked: boolean,
    radio?: boolean
  ) {
    if (radio) {
      setSideBarValues((prev: any) => {
        let objHolder = prev;
        objHolder[boxIndex].options.forEach(
          (option: any) => (option.checked = false)
        );
        objHolder[boxIndex].options[checkboxIndex].checked = checked;
        return objHolder;
      });
    } else {
      setSideBarValues((prev: any) => {
        let objHolder = prev;
        objHolder[boxIndex].options[checkboxIndex].checked = checked;
        return objHolder;
      });
    }
    setSaveDisabled(false);
    setCancelDisabled(false);
    setRefresh(!refresh);
  }

  function splitUrlParams(param: string) {
    const [key, prevalues] = param.split("=");
    const values = prevalues ? prevalues.split(",") : "";
    return [key, values, prevalues];
  }

  const [comboBoxValues, setComboBoxValues] = useState(() => {
    const holder = [
      {
        title: "Dle receptury",
        name: "receptura",
        value: "",
        options: [],
      },
      {
        title: "Dle suroviny",
        name: "surovina",
        value: "",
        options: suroviny,
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
  });

  function resetFilters() {
    sideBarValues.forEach((box) => {
      box.options.forEach((option) => {
        if (
          !boxSettings?.initialTrue?.includes(option.name) ||
          !boxSettings?.disabledValues?.includes(option.name)
        )
          option.checked = false;
      });
    });

    setComboBoxValues((prev) => {
      prev.forEach((combo) => (combo.value = ""));
      return prev;
    });

    setSelectedGroup("nezadano");
    setSelectedSubgroup("");

    setCancelDisabled(true);
    setSaveDisabled(false);
    setRefresh(!refresh);
  }

  function updateCombobox(index: number, value: string) {
    setComboBoxValues((prev) => {
      prev[index].value = value;
      return prev;
    });
    setCancelDisabled(false);
    setSaveDisabled(false);
    setRefresh(!refresh);
  }

  // vytvoří url parametry podle comboBoxů, pak podle checkboxů, pak přidá stránku a nahraje do routeru, pak refreshne vše
  async function getDataAndSetQuery(newPage: number | undefined) {
    setLoading(true);
    const page = newPage ? newPage : pageState;
    let query = urlPreQuery;

    comboBoxValues.forEach((combo) => {
      if (combo.value === "") return;
      if (query === "") query += combo.name + "=" + combo.value;
      else query += "&" + combo.name + "=" + combo.value;
    });

    if (selectedGroup !== "nezadano") {
      if (query === "") query += "skupina=" + selectedGroup;
      else query += "&skupina=" + selectedGroup;
      if (selectedSubgroup && selectedSubgroup !== "vse")
        query += "&podskupina=" + selectedSubgroup;
    }

    sideBarValues.forEach((box) => {
      let hasBox = false;
      let hasOption = false;
      box.options.forEach((option) => {
        if (!option.checked || option.disabled) return;
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

    router.replace("?" + query, { scroll: false });
    setData(await getData(page));

    setSaveDisabled(true);
    setLoading(false);
    return setRefresh(!refresh);
  }

  async function getData(page: number) {
    //Filtrování
    let podminka = "";
    let stitek = "";

    //Skupina podskupina
    const group = groupsData.find((item: any) => item.value === selectedGroup);
    if (group && group.value !== "nezadano") {
      podminka += `DruhSkupina='${group.title}'`;

      const subGroup = group.options.find(
        (item: any) => item.value === selectedSubgroup
      );
      if (subGroup && subGroup.value !== "vse") {
        podminka += ` AND DruhPodskupina='${subGroup.title}'`;
      }
    }

    //Comboboxy
    if (comboBoxValues[0].value !== "") {
      if (podminka !== "") podminka += " AND ";
      podminka += `Nazev LIKE '%${comboBoxValues[0].value}%'`;
    }

    //Boxiky
    sideBarValues.forEach((box) => {
      let boxPodminka = "";
      box.options.forEach((option) => {
        if (option.checked && option.backend) {
          switch (box.name) {
            case "partner":
              if (boxPodminka !== "") boxPodminka += " OR ";
              boxPodminka += `${box.backend}='${option.backend}'`;
              break;
            case "priprava":
              if (boxPodminka !== "") boxPodminka += " OR ";
              boxPodminka += `${box.backend}='${option.backend}'`;
              break;
            case "special":
              if (boxPodminka !== "") boxPodminka += " AND ";
              boxPodminka += `${option.backend}='Ano'`;
              break;
            case "obecne":
              if (option.name === "moje" || option.name === "sklad") {
                stitek = option.backend;
              } else {
                if (boxPodminka !== "") boxPodminka += " AND ";
                boxPodminka += `${option.backend}<>''`;
                break;
              }
          }
        }
      });
      if (boxPodminka !== "") {
        if (podminka !== "") podminka += ` AND `;
        podminka += `(${boxPodminka})`;
        boxPodminka = "";
      }
    });

    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          Sid: logged ? logged : "12345VIS",
          Funkce: "Receptury",
          Parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
            Podminka: podminka,
            Limit: recipesPerPage,
            Offset: (page - 1) * recipesPerPage,
            Vlastnosti: [
              "Veta",
              "Nazev",
              "Identita",
              "Obrazek",
              "DruhSkupina",
              "DruhPodskupina",
              "Dieta1",
              "Dieta2",
              "Dieta3",
              "TepelnaUprava",
            ],
            Stitek: stitek,
            Surovina: comboBoxValues[1].value.toLowerCase(),
          },
        }),
      })
    ).json();
    return result;
  }

  useEffect(() => {
    if (initialData) return;
    (async () => {
      setData(await getData(pageState));
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function zmenStitek(
    veta: number,
    stitek: "Oblíbené" | "MSklad",
    hodnota: boolean
  ) {
    if (!logged || !paid) {
      return toast({
        intent: "warning",
        title: `Pro použití této funkce je potřeba ${
          logged
            ? "mít aktivní předplacené členství."
            : "být přihlášen a mít předplacené členství."
        }`,
      });
    }
    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          Sid: logged,
          Funkce: "Stitek",
          Parametry: {
            Tabulka: "Receptury",
            Operace: hodnota ? "Pridat" : "Smazat",
            Stitek: stitek,
            Vety: [veta],
          },
        }),
      })
    ).json();
    if (result.Status) {
      let vetaStringed = veta.toString();
      setData((prev: any) => {
        let objHolder = prev;
        const curr = objHolder.Vety.find(
          (veta: any) => veta.Vlastnosti.Veta === vetaStringed
        );

        if (hodnota) curr.Stitky.push(stitek);
        else {
          var index = curr.Stitky.indexOf(stitek);
          if (index !== -1) {
            curr.Stitky.splice(index, 1);
          }
        }

        return objHolder;
      });

      setRefresh(!refresh);
    }
  }

  return (
    <Container className={`py-6 ${className}`}>
      <TopRow
        comboBoxValues={comboBoxValues}
        pocet={data && data.CelkovyPocet}
        gridView={gridView}
        setGridView={(grid: boolean) => {
          setGridView(grid);
          cookie.set("gridView", grid.toString(), {
            expires: returnExpirationTime(24 * 30),
          });
          localStorage.setItem("gridView", grid.toString());
        }}
        setSideBarOpen={setSideBarOpen}
        sideBarOpen={sideBarOpen}
        title={title}
        toggleId={toggleId}
        updateCombobox={updateCombobox}
        refresh={refresh}
        initialData={initialData}
        loading={loading}
        getData={getDataAndSetQuery}
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
          getDataAndSetQuery={() => {
            setSideBarOpen(false);
            getDataAndSetQuery(pageState);
          }}
          groupsData={groupsData}
          selectedGroup={selectedGroup}
          setSelectedGroup={(val: string) => {
            setSelectedGroup(val);
            const foundItem = groupsData.find(
              (item: any) => item.value === selectedGroup
            );
            if (foundItem && foundItem.options.length !== 0) {
              setSelectedSubgroup(foundItem.options[0].value);
            } else {
              setSelectedSubgroup("");
            }
            setCancelDisabled(false);
            setSaveDisabled(false);
          }}
          selectedSubgroup={selectedSubgroup}
          setSelectedSubgroup={(val: string) => {
            setSelectedSubgroup(val);
            setCancelDisabled(false);
            setSaveDisabled(false);
          }}
          saveDisabled={saveDisabled}
          cancelDisabled={cancelDisabled}
          loading={loading}
          refresh={refresh}
          hideBoxes={boxSettings?.hiddenBoxes}
        />

        {!initialData && loading ? (
          <RecipeCardsGrid
            className="col-span-4 pt-0 xl:col-span-5"
            gridView={gridView}
            isLoading={true}
            data={(() => ({ Status: true, Vety: Array.from({ length: 6 }) }))()}
          />
        ) : !data || !data.Vety || data.Vety.length === 0 ? (
          <p className="col-span-4 mx-auto mt-16">
            {!data
              ? "Nepodařilo se připojit na backend receptur"
              : "Nepodařilo se najít žádné receptury na základě vyplněných filtrů"}
          </p>
        ) : (
          <RecipeCardsGrid
            className="col-span-4 pt-0 xl:col-span-5"
            gridView={gridView}
            isLoading={loading}
            data={data}
            zmenStitek={zmenStitek}
            logged={logged}
          />
        )}
      </div>
      <Paginator
        currentPage={pageState}
        totalPages={
          data?.CelkovyPocet
            ? Math.ceil(data.CelkovyPocet / recipesPerPage)
            : pageState
        }
        changePage={(page) => {
          if (loading) return null;
          setPageState(page);
          getDataAndSetQuery(page);
        }}
        loading={loading}
      />
    </Container>
  );
}

function Comboboxes({
  className = "",
  comboBoxValues,
  updateCombobox,
  refresh,
  getData,
}: {
  className: string;
  comboBoxValues: {
    title: string;
    name: string;
    options: any[];
    value: string;
  }[];
  updateCombobox: (index: number, value: string) => void;
  refresh: boolean;
  getData: () => void;
}) {
  return (
    <div className={`${className}`}>
      {comboBoxValues.map((combo, index) => (
        <MyCombobox
          key={"cbvmy" + index + refresh}
          label={combo.title}
          name={combo.name}
          options={combo.options}
          selectedOption={combo.value}
          onChange={(value: string) => updateCombobox(index, value)}
          aria-label={"Vyhledat " + combo.title}
          z={100 - index}
          onEnter={getData}
        />
      ))}
    </div>
  );
}

function TopRow({
  title,
  pocet,
  comboBoxValues,
  gridView,
  setGridView,
  toggleId,
  sideBarOpen,
  setSideBarOpen,
  updateCombobox,
  refresh,
  getData,
  initialData,
  loading,
}: {
  title: string;
  pocet: number;
  comboBoxValues: {
    title: string;
    name: string;
    options: any[];
    value: string;
  }[];
  gridView: any;
  setGridView: (grid: any) => void;
  toggleId: any;
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
  updateCombobox: (index: number, value: string) => void;
  refresh: boolean;
  getData: (page?: number) => void;
  initialData: any;
  loading: boolean;
}) {
  return (
    <div className="flex flex-row items-center justify-between py-7">
      <div className="flex flex-col">
        <Heading>{title}</Heading>
        <p className="pt-3 font-bold text-black">
          {!initialData && loading
            ? "Vyhledávám receptury"
            : pocet !== 0
              ? `Našli jsme pro vás ${pocet ? pocet : "0"} receptur`
              : "Nenašli jsme žádná data"}
        </p>
      </div>
      <Comboboxes
        className="hidden grid-cols-2 gap-x-1 lg:grid lg:gap-x-5"
        comboBoxValues={comboBoxValues}
        updateCombobox={updateCombobox}
        refresh={refresh}
        getData={() => getData()}
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
  groupsData,
  updateCombobox,
  updateSideBarValue,
  getDataAndSetQuery,
  selectedGroup,
  setSelectedGroup,
  selectedSubgroup,
  setSelectedSubgroup,
  saveDisabled,
  cancelDisabled,
  loading,
  refresh,
  hideBoxes,
}: {
  sideBarOpen: boolean;
  groupsData: any;
  selectedGroup: any;
  setSelectedGroup: (selectedGroup: any) => void;
  selectedSubgroup: any;
  setSelectedSubgroup: (selectedSubgroup: any) => void;
  setSideBarOpen: (open: boolean) => void;
  resetFilters: () => void;
  sideBarValues: { title: string; name: string; options: any[] }[];
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
  saveDisabled: boolean;
  cancelDisabled: boolean;
  loading: boolean;
  refresh: boolean;
  hideBoxes?: string[];
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
                /* initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} */
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
                    groupsData={groupsData}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    selectedSubgroup={selectedSubgroup}
                    setSelectedSubgroup={setSelectedSubgroup}
                    saveDisabled={saveDisabled}
                    cancelDisabled={cancelDisabled}
                    loading={loading}
                    refresh={refresh}
                    hideBoxes={hideBoxes}
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
          groupsData={groupsData}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          selectedSubgroup={selectedSubgroup}
          setSelectedSubgroup={setSelectedSubgroup}
          saveDisabled={saveDisabled}
          cancelDisabled={cancelDisabled}
          loading={loading}
          refresh={refresh}
          hideBoxes={hideBoxes}
        />
      </div>
    </>
  );
}

function SideBar({
  setSideBarOpen,
  resetFilters,
  sideBarValues,
  groupsData,
  comboBoxValues,
  updateCombobox,
  selectedGroup,
  setSelectedGroup,
  selectedSubgroup,
  setSelectedSubgroup,
  updateSideBarValue,
  getDataAndSetQuery,
  saveDisabled,
  cancelDisabled,
  loading,
  refresh,
  hideBoxes = [],
}: {
  setSideBarOpen: (open: boolean) => void;
  resetFilters: () => void;
  selectedGroup: any;
  setSelectedGroup: (selectedGroup: any) => void;
  selectedSubgroup: any;
  setSelectedSubgroup: (selectedSubgroup: any) => void;
  groupsData: any;
  sideBarValues: { title: string; name: string; options: any[] }[];
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
  saveDisabled: boolean;
  cancelDisabled: boolean;
  loading: boolean;
  refresh: boolean;
  hideBoxes?: string[];
}) {
  return (
    <div
      className={`fixed inset-0 z-fixed flex flex-col rounded-xl bg-white py-5 max-lg:overflow-y-auto lg:static lg:z-fixed-below lg:mr-5 lg:block lg:bg-transparent lg:py-3`}
    >
      <Container className="overflow-x-visible lg:!px-0">
        <div className=" flex flex-row items-center justify-between lg:hidden">
          <Heading size="sm">Co hledáte?</Heading>
          <div className="flex space-x-8">
            <button onClick={() => setSideBarOpen(false)}>
              <CloseIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
        <Comboboxes
          className="my-8 flex flex-col justify-center gap-y-5 sm:flex-row sm:space-x-2 lg:hidden"
          comboBoxValues={comboBoxValues}
          updateCombobox={updateCombobox}
          refresh={refresh}
          getData={getDataAndSetQuery}
        />
        <div className="flex flex-col-reverse overflow-x-visible lg:flex-col">
          <div className="flex w-full flex-col-reverse items-center justify-center gap-2 max-lg:border-t max-lg:border-t-primary-200 max-lg:pt-4 sm:flex-row-reverse lg:flex-col">
            <Button
              className="relative mb-2 w-full"
              variant="black"
              size="sm"
              onClick={() => getDataAndSetQuery()}
              disabled={saveDisabled}
              isLoading={loading}
            >
              <CheckSmallIcon className="shrink-0" /> Potvrdit výběr
            </Button>
            <Button
              className="mb-2 w-full"
              variant="black"
              size="sm"
              onClick={() => resetFilters()}
              disabled={cancelDisabled}
            >
              <CancelIcon className="shrink-0" />
              Zrušit vše
            </Button>
          </div>
          <div className="overflow-x-visible">
            <div className="space-y-2 border-t border-primary-200 pb-4 pt-2">
              <p className="font-bold">Skupina</p>
              <Selector
                data={groupsData}
                selected={selectedGroup}
                setSelected={(val: any) => {
                  setSelectedGroup(val);
                  const foundItem = groupsData.find(
                    (item: any) => item.value === val
                  );
                  if (foundItem && foundItem.options.length !== 0) {
                    setSelectedSubgroup(foundItem.options[0].value);
                  } else {
                    setSelectedSubgroup("");
                  }
                }}
              />
              <p className="font-bold">Podskupina</p>
              <Selector
                data={
                  groupsData.find((item: any) => item.value === selectedGroup)
                    ?.options
                }
                selected={selectedSubgroup}
                setSelected={(item: any) => {
                  setSelectedSubgroup(item);
                }}
                disabled={
                  groupsData.find((item: any) => item.value === selectedGroup)
                    ?.options?.length <= 1
                }
              />
            </div>
            {sideBarValues.map(
              (box, index) =>
                !hideBoxes.includes(box.name) && (
                  <SideBarBox
                    key={"ffsbb" + index}
                    title={box.title}
                    name={box.name}
                    options={box.options}
                    bIndex={index}
                    updateSideBarValue={updateSideBarValue}
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

function SideBarBox({
  title,
  name,
  bIndex,
  options,
  updateSideBarValue,
}: {
  title: string;
  name: string;
  bIndex: number;
  options: any[];
  updateSideBarValue: (
    boxIndex: number,
    optionIndex: number,
    value: boolean,
    radio?: boolean
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
      <button
        onClick={() => setOpen(!open)}
        aria-label={!open ? "Zobrazit" : "Skrýt"}
        className={clsx(open && "mb-2", "w-full rounded-lg")}
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

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="space-y-2 overflow-x-visible"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.15 }}
          >
            {options.map((o: any, oIndex: number) => (
              <motion.li
                key={"sbbo" + oIndex}
                className={`cursor-pointer overflow-x-visible`}
              >
                {name === "obecne" ? (
                  <Radio
                    checked={o.checked}
                    label={o.title}
                    disabled={o.disabled}
                    id={o.name}
                    name={name}
                    onClick={() =>
                      updateSideBarValue(bIndex, oIndex, !o.checked, true)
                    }
                  />
                ) : (
                  <Checkbox
                    checked={o.checked}
                    label={o.title}
                    disabled={o.disabled}
                    onChange={(e: any) => updateSideBarValue(bIndex, oIndex, e)}
                  />
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
