"use client";

import InputField from "@/components/forms/InputField";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { Notice } from "@/components/ui/Notice";
import StyledLink from "@/components/ui/StyledLink";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "universal-cookie";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function Page() {
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
  const router = useRouter();
  const formValidationSchema = z.object({
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
      .min(6, "Heslo příliš krátké"),
  });
  const cookies = new Cookies();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values, actions) => {
      const res = await (
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        })
      ).json();

      if (res.token) {
        console.log(res);
        cookies.set("token", res.token /* {expires: } */);
        return router.push("/");
      }

      // if we recieve a login token, we are succesfully logged in
      setHasNotice({ variant: "error-solid", message: res.message });
    },

    validationSchema: toFormikValidationSchema(formValidationSchema),

    validateOnChange: false,
    validateOnBlur: true,
  });

  const formWasTouched = formik.submitCount > 0;

  return (
    <Container className="my-16 flex flex-col items-center justify-center py-20 pt-24 text-black sm:my-32 xl:my-64">
      <div className="w-full space-y-4 rounded-2xl border-2 border-primary-200 bg-white p-8 sm:w-2/3 xl:w-1/3">
        <Heading size="md">Přihlášení</Heading>
        <form onSubmit={formik.handleSubmit}>
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
          <div className="flex items-start justify-between border-b border-primary-200">
            {/* redirect to jidelny.cz for password reset*/}
            <StyledLink href="https://jidelny.cz/profil/zapomenute-heslo/?redirectAfter=https://receptury.cz/password-reset-complete">
              Zapomenuté heslo?
            </StyledLink>
            <Button
              className="my-4 items-end"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Přihlásit se
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-end gap-1">
          <p>Nemáte účet?</p>
          <StyledLink href="registrace" className="font-bold">
            Zaregistrujte se
          </StyledLink>
        </div>
      </div>

      <Notice
        variant={hasNotice?.variant}
        title={hasNotice?.message}
        isOpen={hasNotice !== null}
        onOpenChange={() => setHasNotice(null)}
        className="my-4"
      />
    </Container>
  );
}
