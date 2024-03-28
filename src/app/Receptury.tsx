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
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Paginator from "@/components/ui/Paginator";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import Selector from "@/components/ui/Selector";
import ToggleGridButton from "@/components/ui/ToggleGridButton";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";

const groupsData = [
  {
    value: "bezmase_sladke",
    title: "Bezmasé sladké pokrmy",
    options: [
      { value: "pecene", title: "Pečené a smažené" },
      { value: "varene", title: "Vařené" },
      { value: "kase", title: "Kaše" },
    ],
  },
  {
    value: "bezmase_slane",
    title: "Bezmasé slané pokrmy",
    options: [
      {
        value: "zeleninove",
        title: "Zeleninové",
      },
      {
        value: "lusteniny",
        title: "Luštěninové",
      },
      {
        value: "moucne",
        title: "Moučné a obilninové",
      },
      { value: "testovinove", title: "Těstovinové" },
      { value: "bramborove", title: "Bramborové" },
      { value: "houbove", title: "Houbové" },
      { value: "salaty", title: "Saláty" },
      { value: "ostatni", title: "Ostatní" },
    ],
  },
  {
    value: "doplnky",
    title: "Doplňky",
    options: [
      {
        value: "salaty_zeleninove",
        title: "Saláty zeleninové",
      },
      {
        value: "salaty_ovocne",
        title: "Saláty ovocné",
      },
      {
        value: "kompoty",
        title: "Kompoty",
      },
      {
        value: "moucniky",
        title: "Moučníky",
      },
      {
        value: "mlecne_dezerty",
        title: "Mléčné dezerty",
      },
      {
        value: "zelenina_cerstva",
        title: "Zelenina čerstvá",
      },
      {
        value: "ovoce_cerstve",
        title: "Ovoce čerstvé",
      },
      {
        value: "ostatni",
        title: "Ostatní",
      },
    ],
  },
  {
    value: "masite",
    title: "Masité pokrmy",
    options: [
      { value: "veprove", title: "Vepřové" },
      { value: "kureci", title: "Kuřecí" },
      { value: "kruti", title: "Krůtí" },
      { value: "kralici", title: "Králičí" },
      { value: "hovezi", title: "Hovězí" },
      { value: "zverina", title: "Zvěřina" },
      { value: "teleci", title: "Telecí" },
      { value: "vnitrnosti", title: "Vnitřnosti" },
      { value: "husi_a_kachni", title: "Husí a kachní" },
      { value: "ostatni", title: "Ostatní" },
      {
        value: "mleta_masa_a_masove_smesi",
        title: "Mletá masa a masové směsi",
      },
    ],
  },
  {
    value: "napoje",
    title: "Nápoje",
    options: [],
  },
  { value: "nezadano", title: "Nezadáno", options: [] },
  {
    value: "polevky",
    title: "Polévky",
    options: [
      {
        value: "zeleninove",
        title: "Zeleninové",
      },
      {
        value: "lusteninove",
        title: "Luštěninové",
      },
      {
        value: "masove_a_rybi",
        title: "Masové a rybí",
      },
      {
        value: "obilninove",
        title: "Obilninové",
      },
      { value: "bramborove", title: "Bramborové" },
      { value: "vyvary", title: "Vývary" },
      { value: "houbove", title: "Houbové" },
      {
        value: "ostatni",
        title: "Ostatní",
      },
    ],
  },
  {
    value: "prilohy_a_prikrmy",
    title: "Přílohy a příkrmy",
    options: [
      { value: "bramborove", title: "Bramborové" },
      { value: "testovinove", title: "Těstovinové" },
      { value: "obilninove", title: "Obilninové" },
      { value: "knedliky", title: "Knedlíky" },
      { value: "zelenina", title: "Zelenina" },
      { value: "omacky", title: "Omáčky" },
      { value: "pecivo", title: "Pečivo" },
      { value: "ostatni", title: "Ostatní" },
      { value: "lusteninove", title: "Luštěninové" },
    ],
  },
  {
    value: "rybi_pokrmy",
    title: "Rybí pokrmy",
    options: [],
  },
  {
    value: "svaciny",
    title: "Svačiny",
    options: [
      {
        value: "pomazanky_syrove_a_tvarohove",
        title: "Pomazánky sýrové a tvarohové",
      },
      {
        value: "pomazanky_masove",
        title: "Pomazánky masové",
      },
      {
        value: "pomazanky_vajecne",
        title: "Pomazánky vaječné",
      },
      {
        value: "pomazanky_rybi",
        title: "Pomazánky rybí",
      },
      {
        value: "mlecne_vyrobky",
        title: "Mléčné výrobky",
      },
      {
        value: "kase",
        title: "Kaše",
      },
      {
        value: "pecivo",
        title: "Pečivo",
      },
      {
        value: "moucniky",
        title: "Moučníky",
      },
      {
        value: "ostatni",
        title: "Ostatní",
      },
      {
        value: "pomazanky_zeleninove/ovocne",
        title: "Pomazánky zeleninové/ovocné",
      },
      {
        value: "pomazanky_lusteninove",
        title: "Pomazánky luštěninové",
      },
      {
        value: "pomazanky_ostatni",
        title: "Pomazánky ostatní",
      },
    ],
  },
  {
    value: "zavarky",
    title: "Zavářky",
    options: [],
  },
];

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
  const [selectedGroup, setSelectedGroup] = useState("nezadano");
  const [selectedSubgroup, setSelectedSubgroup] = useState("");

  const [saveDisabled, setSaveDisabled] = useState(true);
  const [cancelDisabled, setCancelDisabled] = useState(true);

  // loading tlačítek a karet
  const [loading, setLoading] = useState(false);

  // initial load pro výběr gridu z local storage
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const local = localStorage.getItem("gridView");
    setGridView(local === "true");
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(paramsHook);
    if (params && params.skupina) {
      const group = groupsData.find((group) => group.value === params.skupina);
      if (!group) return;
      setSelectedGroup(group.value);

      if (
        params.podskupina &&
        group.options.some((subgroup) => subgroup.value === params.podskupina)
      ) {
        setSelectedSubgroup(params.podskupina);
      } else if (group.options.length !== 0) {
        setSelectedSubgroup(group.options[0].value);
      }
    }
  }, [paramsHook]);

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
      {
        title: "Partner",
        name: "partner",
        options: [
          { title: "Bidfood", name: "bidfood", checked: false },
          { title: "Bonduelle", name: "bonduelle", checked: false },
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

  useEffect(() => {
    const foundItem = groupsData.find(
      (item: any) => item.value === selectedGroup
    );
    if (foundItem && foundItem.options.length !== 0) {
      setSelectedSubgroup(foundItem.options[0].value);
    } else {
      setSelectedSubgroup("");
    }
  }, [selectedGroup]);

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
  });

  function resetFilters() {
    sideBarValues.forEach((box) => {
      box.options.forEach((option) => {
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
  async function getDataAndSetQuery(page: number) {
    setLoading(true);
    let query = urlPreQuery;

    comboBoxValues.forEach((combo) => {
      if (combo.value === "") return;
      if (query === "") query += combo.name + "=" + combo.value;
      else query += "&" + combo.name + "=" + combo.value;
    });

    if (selectedGroup !== "nezadano") {
      if (query === "") query += "skupina=" + selectedGroup;
      else query += "&skupina=" + selectedGroup;
      if (selectedSubgroup) query += "&podskupina=" + selectedSubgroup;
    }

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

    const group = groupsData.find((item: any) => item.value === selectedGroup);
    const subGroup = group?.options.find(
      (item: any) => item.value === selectedSubgroup
    );

    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          Sid: "12345VIS",
          Funkce: "ObecnyDotaz",
          Parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
            Podminka:
              group?.value === "nezadano"
                ? ""
                : `Druh="${group?.title + " " + subGroup?.title}"`,
            Limit: 15,
            Offset: (page - 1) * 15,
            Vlastnosti: ["Nazev", "Identita", "Obrazek"],
          },
        }),
      })
    ).json();
    setData(result);

    router.replace("?" + query, { scroll: false });

    setSaveDisabled(true);
    setLoading(false);
    return setRefresh(!refresh);
  }

  return (
    <Container className={`py-6 ${className}`}>
      <TopRow
        comboBoxValues={comboBoxValues}
        data={initialData}
        gridView={initialLoad === true ? undefined : gridView}
        setGridView={(grid: boolean) => {
          setGridView(grid);
          localStorage.setItem("gridView", grid.toString());
        }}
        setSideBarOpen={setSideBarOpen}
        sideBarOpen={sideBarOpen}
        title={title}
        toggleId={toggleId}
        updateCombobox={updateCombobox}
        refresh={refresh}
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
          groupsData={groupsData}
          selectedGroup={selectedGroup}
          setSelectedGroup={(val: string) => {
            setSelectedGroup(val);
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
        />

        {initialLoad ? (
          <div className="relative col-span-4 h-full py-20">
            <LoadingSpinner
              size="xl"
              className={`absolute left-1/2 top-16 z-10 -translate-x-1/2`}
            />
          </div>
        ) : !data || !data.Vety || data.Vety.length === 0 ? (
          <p className="col-span-4 mx-auto mt-16">
            {!data
              ? "Nepodařilo se připojit na backend receptur"
              : "Nepodařilo se najít žádné recepty na základě vyplněných filtrů"}
          </p>
        ) : (
          <RecipeCardsGrid
            className="col-span-4 pt-0 xl:col-span-5"
            gridView={gridView}
            isLoading={loading}
            data={data}
          />
        )}
      </div>
      <Paginator
        currentPage={pageState}
        totalPages={25}
        changePage={(page) => {
          setPageState(page);
          getDataAndSetQuery(page);
        }}
      />
    </Container>
  );
}

function Comboboxes({
  className = "",
  comboBoxValues,
  updateCombobox,
  refresh,
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
  refresh,
}: {
  title: string;
  data: any;
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
        refresh={refresh}
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
}: {
  sideBarOpen: boolean;
  groupsData: any;
  selectedGroup: any;
  setSelectedGroup: (selectedGroup: any) => void;
  selectedSubgroup: any;
  setSelectedSubgroup: (selectedSubgroup: any) => void;
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
  saveDisabled: boolean;
  cancelDisabled: boolean;
  loading: boolean;
  refresh: boolean;
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
                    groupsData={groupsData}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    selectedSubgroup={selectedSubgroup}
                    setSelectedSubgroup={setSelectedSubgroup}
                    saveDisabled={saveDisabled}
                    cancelDisabled={cancelDisabled}
                    loading={loading}
                    refresh={refresh}
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
}: {
  setSideBarOpen: (open: boolean) => void;
  resetFilters: () => void;
  selectedGroup: any;
  setSelectedGroup: (selectedGroup: any) => void;
  selectedSubgroup: any;
  setSelectedSubgroup: (selectedSubgroup: any) => void;
  groupsData: any;
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
  saveDisabled: boolean;
  cancelDisabled: boolean;
  loading: boolean;
  refresh: boolean;
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
        />
        <div className="flex flex-col-reverse overflow-x-visible lg:flex-col">
          <div className="flex w-full flex-col-reverse items-center justify-center gap-2 max-lg:border-t max-lg:border-t-primary-200 max-lg:pt-4 sm:flex-row-reverse lg:flex-col">
            <Button
              className="relative mb-2 w-full"
              variant="black"
              size="sm"
              onClick={() => getDataAndSetQuery()}
              disabled={saveDisabled || loading}
            >
              <LoadingSpinner
                className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${
                  !loading && "opacity-0"
                }`}
              />
              <span className={`flex flex-row ${loading && "opacity-0"}`}>
                <CheckSmallIcon className="shrink-0" /> Potvrdit výběr
              </span>
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
                setSelected={(item: any) => {
                  setSelectedGroup(item);
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
              />
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
        </div>
      </Container>
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
    <div className="border-t border-primary-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        aria-label={!open ? "Zobrazit" : "Skrýt"}
        className="w-full rounded-lg"
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
            className="mt-2 space-y-2 overflow-x-visible"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.25 }}
          >
            {options.map((o: any, oIndex: number) => (
              <motion.li
                key={"sbbo" + oIndex}
                className={`cursor-pointer overflow-x-visible`}
              >
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
