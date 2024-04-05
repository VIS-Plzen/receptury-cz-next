"use client";

import InputField from "@/components/forms/InputField";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { Notice } from "@/components/ui/Notice";
import { useFormik } from "formik";
import { useState } from "react";
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
      console.log(values);

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
      console.log(res);
      setHasNotice(
        res.success == true
          ? { variant: "success-solid", message: "Úspěšně registrováno." }
          : { variant: "error-solid", message: res.message }
      );
    },

    validationSchema: toFormikValidationSchema(formValidationSchema),

    validateOnChange: false,
    validateOnBlur: true,
  });

  const formWasTouched = formik.submitCount > 0;

  return (
    <Container className="my-16 flex flex-col items-center justify-center py-20 pt-24 text-black sm:my-32 xl:my-64">
      <Notice
        variant={hasNotice?.variant}
        title={hasNotice?.message}
        isOpen={hasNotice !== null}
        onOpenChange={() => setHasNotice(null)}
      />
      <div className="w-full space-y-4 rounded-2xl border-2 border-primary-200 bg-white p-8 sm:w-2/3 xl:w-1/3">
        <Heading size="md">Registrace</Heading>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            type="firstName"
            name="firstName"
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
            type="lastName"
            name="lastName"
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
            placeholder="Email@email.com"
            value={formik.values.email}
            errorText={
              formWasTouched && formik.touched.email && formik.errors.email
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></InputField>
          <InputField
            type="password"
            name="password"
            placeholder="Heslo"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={
              formWasTouched &&
              formik.touched.password &&
              formik.errors.password
            }
            onBlur={formik.handleBlur}
          ></InputField>

          <div className="flex items-center justify-end">
            <Button
              className="my-4 items-end"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Registrovat se
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Page;
