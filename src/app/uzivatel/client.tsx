"use client";

import Checkbox from "@/components/forms/Checkbox";
import {
  default as InputField,
  default as TextInput,
} from "@/components/forms/InputField";
import TextArea from "@/components/forms/TextArea";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Receptury from "@/components/ui/Receptury/Receptury";
import { groupsData } from "@/components/ui/Receptury/Ssr";
import Selector from "@/components/ui/Selector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "@/hooks/useToast";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function ContentSelector({
  searchParams,
  isGridView,
  paid,
  token,
}: any) {
  const [content, setContent] = useState<string>(
    searchParams?.obsah ?? "informace"
  );
  const contents: { key: "informace" | "receptury"; title: string }[] = [
    { key: "informace", title: "Osobní informace" },
    { key: "receptury", title: "Oblíbené receptury" },
  ];
  const paramsHook = useSearchParams();
  const urlParams = decodeURIComponent(
    paramsHook.toString().replaceAll("+", " ")
  );
  const router = useRouter();

  useEffect(() => {
    if (token) return;
    localStorage.removeItem("userInfo");
    router.push("/prihlaseni");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function updateContent(cont: "informace" | "receptury" | string) {
    let query = urlParams;
    const regexMatch = query.match(/obsah=(informace|receptury)/);
    if (regexMatch) {
      query = query.replace(regexMatch[1], cont);
    } else {
      if (query === "") {
        query = "obsah=" + cont;
      } else {
        query = "obsah=" + cont + "&" + query;
      }
    }
    router.replace("?" + query, { scroll: false });
    setContent(cont);
  }

  return (
    <div className="flex flex-col">
      <Container>
        <div className="flex w-full items-center justify-between pt-5 md:pt-10">
          <Tabs
            value={content}
            className="w-full"
            onValueChange={updateContent}
          >
            <div className="hidden w-full flex-row justify-between md:flex">
              <TabsList className="w-full items-center justify-evenly md:max-w-[550px]">
                {contents.map((cont, index) => (
                  <TabsTrigger
                    value={cont.key}
                    className="w-full"
                    key={cont.key}
                    id={"TabsTriggerIndex" + index}
                    aria-controls={"TabsTriggerIndex" + index}
                  >
                    {cont.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
        <Selector
          data={contents}
          selected={content}
          setSelected={updateContent}
          className="block md:hidden"
          valueKey="key"
        />
      </Container>
      {content === "informace" && <Form />}
      {content === "receptury" && (
        <Receptury
          title="Oblíbené"
          urlPreQuery={`obsah=${content}`}
          boxSettings={{ initialTrue: ["moje"], disabledValues: ["moje"] }}
          groupsData={groupsData}
          isGridView={isGridView}
          logged={token}
          paid={paid}
        />
      )}
    </div>
  );
}

function Form() {
  const cookies = new Cookies();
  const router = useRouter();
  let [info]: any = useLocalStorage("userInfo");
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (!hasData) {
      if (info) setHasData(true);
      if (!info) getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserInfo() {
    const token = cookies.get("token");
    if (!token) return;
    const res = await fetch("/api/userInfo", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
    });
    setHasData(true);
    const data = await res.json();

    if (data.firstName) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      Object.keys(data).forEach(
        (key) =>
          formik.getFieldProps("key") && formik.setFieldValue(key, data[key])
      );
    } else {
      console.log("Tady doopravit");
      /* toast({
        intent: "error",
        title: "Data se nepodařilo načíst",
      }); */
    }
  }

  async function saveUserInfo(data: any) {
    const token = cookies.get("token");
    if (!token) return;

    data.token = token;

    const res = await (
      await fetch("/api/editInfo", {
        method: "POST",
        body: JSON.stringify({ body: data }),
      })
    ).json();

    if (res.success) {
      delete data.token;
      localStorage.setItem("userInfo", JSON.stringify(data));
      const name = data.firstName + " " + data.lastName;
      cookies.set("name", name);
      toast({
        intent: "success",
        title: "Změny úspěšně uloženy",
      });
    } else {
      toast({
        intent: "error",
        title: "Změny se nepovedlo uložit",
      });
    }
  }

  const formValidationSchema: any = z.object({
    firstName: z
      .string({
        required_error: "Vyplňte prosím jméno",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Jméno musí mít alespoň 2 znaky")
      .max(50, "Jméno může mít maximálně 50 znaků"),
    lastName: z
      .string({
        required_error: "Vyplňte prosím příjmení",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Příjmení musí mít alespoň 2 znaky")
      .max(50, "Příjmení může mít maximálně 50 znaků"),
    email: z
      .string({
        required_error: "Vyplňte prosím e-mail",
        invalid_type_error: "Neplatný typ",
      })
      .email("Neplatný e-mail"),
    phone: z
      .string({
        invalid_type_error: "Neplatný typ",
      })
      .min(9, "Adresa musí mít alespoň 9 znaků")
      .max(20, "Adresa může mít maximálně 20 znaků")
      .optional(),
    //Firma
    invoiceIsCompany: z.boolean(),
    invoiceCompanyId: z
      .string({
        required_error: "Vyplňte prosím IČ",
        invalid_type_error: "Neplatný typ",
      })
      .min(8, "IČ musí mít přesně 8 znaků")
      .max(8, "IČ musí mít přesně 8 znaků")
      .optional(),
    invoiceCompanyVatId: z
      .string({
        required_error: "Vyplňte prosím DIČ",
        invalid_type_error: "Neplatný typ",
      })
      .min(10, "DIČ musí mít alespoň 10 znaků")
      .max(12, "DIČ může mít maximálně 12 znaků")
      .optional(),
    invoiceCompanyName: z
      .string({
        required_error: "Vyplňte prosím název firmy",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Název firmy musí mít alespoň 2 znaky")
      .max(50, "Název firmy může mít maximálně 50 znaků")
      .optional(),
    invoiceStreet: z
      .string({
        required_error: "Vyplňte prosím Ulici a číslo popisné",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Ulice a číslo popisné musí mít alespoň 2 znaky")
      .max(50, "Ulice a číslo popisné může mít maximálně 50 znaků"),
    invoiceCity: z
      .string({
        required_error: "Vyplňte prosím město",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Město musí mít alespoň 2 znaky")
      .max(50, "Město může mít maximálně 50 znaků"),
    invoiceZip: z
      .string({
        required_error: "Vyplňte prosím PSČ",
        invalid_type_error: "Neplatný typ",
      })
      .min(5, "PSČ musí mít alespoň 5 znaků")
      .max(6, "PSČ může mít maximálně 6 znaků"),
    //Dodací adresa
    deliveryIsDifferent: z.boolean(),
    deliveryStreet: z
      .string({
        required_error: "Vyplňte prosím Ulici a číslo popisné",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Ulice a číslo popisné musí mít alespoň 2 znaky")
      .max(50, "Ulice a číslo popisné může mít maximálně 50 znaků")
      .optional(),
    deliveryCity: z
      .string({
        required_error: "Vyplňte prosím město",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Město musí mít alespoň 2 znaky")
      .max(50, "Město může mít maximálně 50 znaků")
      .optional(),
    deliveryZip: z
      .string({
        required_error: "Vyplňte prosím PSČ",
        invalid_type_error: "Neplatný typ",
      })
      .min(5, "PSČ musí mít alespoň 5 znaků")
      .max(6, "PSČ může mít maximálně 6 znaků")
      .optional(),
    poznamka: z
      .string({
        invalid_type_error: "Neplatný typ",
      })
      .min(10, "Zpráva musí mít alespoň 10 znaků")
      .max(500, "Zpráva může mít maximálně 500 znaků")
      .optional(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: info ? info.firstName : "",
      lastName: info ? info.lastName : "",
      email: info ? info.email : "",
      phone: info ? info.phone : "",
      //Fakturační údaje
      invoiceCompanyId: info ? info.invoiceCompanyId : "",
      invoiceCompanyVatId: info ? info.invoiceCompanyVatId : "",
      invoiceIsCompany: info ? info.invoiceIsCompany : false,
      invoiceCompanyName: info ? info.invoiceCompanyName : "",
      invoiceStreet: info ? info.invoiceStreet : "",
      invoiceCity: info ? info.invoiceCity : "",
      invoiceZip: info ? info.invoiceZip : "",
      //Dodací adresa
      deliveryIsDifferent: info ? info.deliveryIsDifferent : "",
      deliveryStreet: info ? info.deliveryStreet : "",
      deliveryCity: info ? info.deliveryCity : "",
      deliveryZip: info ? info.deliveryZip : "",
      //Poznámka?
      poznamka: /* info ? info.invoiceStreet : */ "",
    },
    onSubmit: (values, actions) => {
      saveUserInfo(values);
      actions.setSubmitting(false);
    },
    validationSchema: toFormikValidationSchema(formValidationSchema),
    validateOnChange: false,
    validateOnBlur: true,
  });

  const formWasTouched = formik.submitCount > 0;

  async function tempActivate() {
    const res = await (
      await fetch("/api/coder", {
        method: "POST",
        body: JSON.stringify({
          dataString: "1.1.2025",
          length: "long",
        }),
      })
    ).json();
    if (!res.success) return;
    cookies.set("paid", res.data);
    router.refresh();
  }

  return (
    <Container>
      <div className="w-full grid-cols-2 gap-x-20 py-6 md:grid">
        <form onSubmit={formik.handleSubmit} className="w-full space-y-6 py-7">
          <div>
            <div className="flex">
              <Heading as="h1" hasMarginBottom>
                Osobní údaje
              </Heading>
              <button
                className="mb-[0.65em] ml-5 underline"
                type="button"
                onClick={tempActivate}
              >
                Aktivovat placený účet
              </button>
            </div>
            <InputField
              name="firstName"
              label="Jméno"
              errorText={
                formWasTouched &&
                formik.touched.firstName &&
                formik.errors.firstName
              }
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isLoading={!hasData}
            />
            <InputField
              name="lastName"
              label="Příjmení"
              errorText={
                formWasTouched &&
                formik.touched.lastName &&
                formik.errors.lastName
              }
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isLoading={!hasData}
            />
            <InputField
              type="email"
              name="email"
              label="Váš e-mail"
              errorText={
                formWasTouched && formik.touched.email && formik.errors.email
              }
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isLoading={!hasData}
            />
            <InputField
              name="phone"
              label="Telefonní číslo"
              errorText={
                formWasTouched && formik.touched.phone && formik.errors.phone
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              isLoading={!hasData}
            />
          </div>
          <div>
            <Heading size="sm" hasMarginBottom>
              Fakturační údaje
            </Heading>
            <Checkbox
              className="my-5"
              name="invoiceIsCompany"
              label="Nakupuji na firmu"
              type="checkbox"
              onChange={(value) =>
                formik.setFieldValue("invoiceIsCompany", value)
              }
              value={formik.values.invoiceIsCompany}
            />
            {formik.values.invoiceIsCompany && (
              <>
                <TextInput
                  name="invoiceCompanyId"
                  label="IČ"
                  errorText={
                    formWasTouched &&
                    formik.touched.invoiceCompanyId &&
                    formik.errors.invoiceCompanyId
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.invoiceCompanyId}
                  isLoading={!hasData}
                  required
                />
                <InputField
                  name="invoiceCompanyVatId"
                  label="DIČ"
                  errorText={
                    formWasTouched &&
                    formik.touched.invoiceCompanyVatId &&
                    formik.errors.invoiceCompanyVatId
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.invoiceCompanyVatId}
                  isLoading={!hasData}
                  required
                />
                <InputField
                  name="invoiceCompanyName"
                  label="Název firmy"
                  errorText={
                    formWasTouched &&
                    formik.touched.invoiceCompanyName &&
                    formik.errors.invoiceCompanyName
                  }
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.invoiceCompanyName}
                  isLoading={!hasData}
                />
              </>
            )}
            <InputField
              name="invoiceStreet"
              label="Ulice a číslo popisné"
              errorText={
                formWasTouched &&
                formik.touched.invoiceStreet &&
                formik.errors.invoiceStreet
              }
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.invoiceStreet}
              isLoading={!hasData}
            />
            <InputField
              name="invoiceCity"
              label="Město"
              errorText={
                formWasTouched &&
                formik.touched.invoiceCity &&
                formik.errors.invoiceCity
              }
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.invoiceCity}
              isLoading={!hasData}
            />
            <InputField
              name="invoiceZip"
              label="PSČ"
              errorText={
                formWasTouched &&
                formik.touched.invoiceZip &&
                formik.errors.invoiceZip
              }
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.invoiceZip}
              isLoading={!hasData}
            />
          </div>
          <div>
            <Heading size="sm" hasMarginBottom>
              Dodací adresa
            </Heading>
            <Checkbox
              className="my-5"
              name="deliveryIsDifferent"
              label="Dodací adresa se liší od fakturační"
              type="checkbox"
              onChange={(value) =>
                formik.setFieldValue("deliveryIsDifferent", value)
              }
              value={formik.values.deliveryIsDifferent}
            />
            {formik.values.deliveryIsDifferent && (
              <>
                <InputField
                  name="deliveryStreet"
                  label="Ulice a číslo popisné"
                  errorText={
                    formWasTouched &&
                    formik.touched.deliveryStreet &&
                    formik.errors.deliveryStreet
                  }
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deliveryStreet}
                  isLoading={!hasData}
                />
                <InputField
                  name="deliveryCity"
                  label="Město"
                  errorText={
                    formWasTouched &&
                    formik.touched.deliveryCity &&
                    formik.errors.deliveryCity
                  }
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deliveryCity}
                  isLoading={!hasData}
                />
                <InputField
                  name="deliveryZip"
                  label="PSČ"
                  errorText={
                    formWasTouched &&
                    formik.touched.deliveryZip &&
                    formik.errors.deliveryZip
                  }
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deliveryZip}
                  isLoading={!hasData}
                />
              </>
            )}
            <TextArea
              name="poznamka"
              label="Poznámka pro dodavatele"
              errorText={
                formWasTouched &&
                formik.touched.poznamka &&
                formik.errors.poznamka
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.poznamka}
            />
          </div>
          <Button
            type="submit"
            isLoading={formik.isSubmitting}
            className="relative"
          >
            Uložit změny
          </Button>
        </form>
        <svg
          className="mt-40 hidden md:block"
          width="514"
          height="797"
          viewBox="0 0 514 797"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M96.9662 50.3962C100.872 22.6057 126.567 3.24335 154.357 7.14904L463.152 50.5474C490.943 54.4531 510.305 80.1479 506.4 107.938L416.774 745.656C410.947 787.122 360.282 804.138 330.606 774.597L219.492 663.986L82.1939 739.685C45.5251 759.902 1.51323 729.579 7.34078 688.114L96.9662 50.3962ZM155.935 68.9464L70.5525 676.473L196.726 606.908C216.503 596.004 241.104 599.461 257.109 615.394L359.22 717.043L444.602 109.516L155.935 68.9464Z"
            className="fill-primary-100"
          />
          <path
            d="M265.573 335.215L256.268 324.101C240.307 304.698 227.197 288.052 216.937 274.164C206.677 260.277 198.67 248.025 192.918 237.411C187.165 226.796 183.408 217.39 181.645 209.191C179.881 200.992 179.56 192.908 180.68 184.937C182.876 169.317 189.95 157.008 201.904 148.013C213.858 139.017 227.545 135.602 242.966 137.769C252.842 139.157 261.653 142.781 269.399 148.64C277.145 154.499 283.516 162.286 288.511 171.999C297.103 163.665 305.782 157.861 314.546 154.588C323.31 151.314 332.371 150.334 341.727 151.649C357.148 153.817 369.364 160.871 378.375 172.814C387.386 184.756 390.794 198.538 388.599 214.158C387.478 222.129 384.941 229.811 380.986 237.206C377.032 244.602 370.827 252.608 362.371 261.226C353.916 269.844 342.843 279.414 329.152 289.935C315.462 300.457 298.271 312.844 277.58 327.096L265.573 335.215Z"
            fill="#EE7402"
          />
        </svg>
      </div>
    </Container>
  );
}
