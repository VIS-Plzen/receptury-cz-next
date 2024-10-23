"use client";

import InputField from "@/components/forms/InputField";
import PasswordField from "@/components/forms/PasswordField";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { Notice } from "@/components/ui/Notice";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

function Page() {
  const [hasNotice, setHasNotice] = useState<null | {
    variant:
      | "info"
      | "success"
      | "warning"
      | "error"
      | "info-solid"
      | "success-solid"
      | "warning-solid"
      | "error-solid";
    message: string;
  }>(null);

  const cookies = new Cookies();

  useEffect(() => {
    cookies.remove("token");
    cookies.remove("paid");
    cookies.remove("name");
    localStorage.removeItem("userInfo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formValidationSchema = z.object({
    firstName: z
      .string({
        required_error: "Vyplňte prosím křestní jméno",
      })
      .min(1, "Křestní jmnéno je příliš krátké")
      .max(18, "Křestní jmnéno je příliš dlouhé"),
    lastName: z
      .string({
        required_error: "Vyplňte prosím příjmení",
      })
      .min(1, "Příjmení je příliš krátké")
      .max(18, "Příjmení je příliš dlouhé"),
    email: z
      .string({
        required_error: "Vyplňte prosím e-mail",
        invalid_type_error: "Neplatný typ",
      })
      .email("Neplatný e-mail"),

    password: z
      .string({
        required_error: "Vyplňte prosím heslo",
        invalid_type_error: "Neplatný typ",
      })
      .min(8, "Heslo příliš krátké")
      .refine((str) => /[A-Z]/.test(str), {
        message: "Heslo musí obsahovat alespoň jedno velké písmeno.",
      })
      .refine((str) => /[a-z]/.test(str), {
        message: "Heslo musí obsahovat alespoň jedno malé písmeno.",
      }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    onSubmit: async (values, actions) => {
      const res = await (
        await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          }),
        })
      ).json();
      setHasNotice(
        res.success == true
          ? {
              variant: "success-solid",
              message: "Úspěšně registrováno, potvrzovací email byl odeslán.",
            }
          : { variant: "error-solid", message: res.message }
      );
      actions.setSubmitting(false);
    },

    validationSchema: toFormikValidationSchema(formValidationSchema),

    validateOnChange: false,
    validateOnBlur: true,
  });

  const formWasTouched = formik.submitCount > 0;

  return (
    <Container className="flex flex-col items-center justify-center pb-32 pt-8 text-black md:pb-36 md:pt-10 lg:pt-16">
      <div className="w-full space-y-4 rounded-2xl border-2 border-primary-200 bg-white p-8 sm:w-2/3 xl:w-1/3">
        <Heading size="md">Registrace</Heading>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            type="text"
            name="firstName"
            variant="gray"
            placeholder="Jméno"
            value={formik.values.firstName}
            errorText={
              formWasTouched &&
              formik.touched.firstName &&
              formik.errors.firstName
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></InputField>
          <InputField
            type="text"
            name="lastName"
            variant="gray"
            placeholder="Příjmení"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            errorText={
              formWasTouched &&
              formik.touched.lastName &&
              formik.errors.lastName
            }
            onBlur={formik.handleBlur}
          ></InputField>
          <InputField
            type="email"
            name="email"
            variant="gray"
            placeholder="Email@email.com"
            autoComplete="off"
            value={formik.values.email}
            errorText={
              formWasTouched && formik.touched.email && formik.errors.email
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></InputField>
          <PasswordField
            name="password"
            variant="gray"
            placeholder="Heslo"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="off"
            errorText={
              formWasTouched &&
              formik.touched.password &&
              formik.errors.password
            }
            onBlur={formik.handleBlur}
          ></PasswordField>

          <div className="flex items-center justify-end">
            <Button
              className="relative my-4 items-end"
              type="submit"
              disabled={
                formik.isSubmitting || hasNotice?.variant === "success-solid"
              }
              isLoading={formik.isSubmitting}
            >
              Registrovat se
            </Button>
          </div>
        </form>
      </div>
      <Notice
        variant={hasNotice?.variant}
        title={hasNotice?.message}
        isOpen={hasNotice !== null}
        onOpenChange={() => setHasNotice(null)}
        className="my-4 px-2 md:px-0"
      >
        {hasNotice?.variant === "success-solid" && (
          <p className="text-base font-semibold">
            Také máte možnost{" "}
            <Link href="/prihlaseni" className="underline underline-offset-2">
              přihlásit se
            </Link>
            .
          </p>
        )}
      </Notice>
    </Container>
  );
}

export default Page;
