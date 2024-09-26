"use client";

import InputField from "@/components/forms/InputField";
import PasswordField from "@/components/forms/PasswordField";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Notice } from "@/components/ui/Notice";
import StyledLink from "@/components/ui/StyledLink";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function Page() {
  const cookies = new Cookies();
  const query = useSearchParams();
  const router = useRouter();

  function returnInitNotice() {
    const q = query.get("registration_result");
    if (!q) return null;
    let mSet: any = null;
    switch (q) {
      case "success":
        mSet = {
          variant: "success-solid",
          message: "Email byl úspěšně potvrzen, můžete se přihlásit",
        };
        break;
      case "invalid":
        mSet = {
          variant: "warning-solid",
          message:
            "Email se nepodařilo potvrdit, je možné že už byl kód použit nebo není platný.",
        };
        break;
      case "failed":
        mSet = {
          variant: "error-solid",
          message:
            "Email se nepodařilo potvrdit, je možné že už byl kód použit nebo není platný.",
        };
        break;
      default:
        mSet = null;
        break;
    }
    return mSet;
  }
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
  }>(returnInitNotice);

  useEffect(() => {
    cookies.remove("token");
    cookies.remove("paid");
    cookies.remove("name");
    localStorage.removeItem("userInfo");
  }, []);

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
        cookies.set("token", res.token, { expires: getExpirationTime(2) });
        cookies.set("name", res.firstName + " " + res.lastName, {
          expires: getExpirationTime(2),
        });
        cookies.set("paid", res.paid, { expires: getExpirationTime(2) });
        if (!res.paid) {
          cookies.set("memModal", "true");
        }
        localStorage.setItem("userInfo", JSON.stringify(res));
        router.push("/");
      } else {
        setHasNotice({ variant: "error-solid", message: res.message });
      }
    },

    validationSchema: toFormikValidationSchema(formValidationSchema),

    validateOnChange: false,
    validateOnBlur: true,
  });

  function getExpirationTime(hours: number) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
  }

  const formWasTouched = formik.submitCount > 0;

  return (
    <Container className="my-16 flex flex-col items-center justify-center py-20 text-black sm:my-32 md:py-0 xl:my-64">
      <div className="w-full space-y-4 rounded-2xl border-2 border-primary-200 bg-white p-8 sm:w-2/3 xl:w-1/3">
        <Heading size="md">Přihlášení</Heading>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            type="email"
            name="email"
            variant="gray"
            placeholder="Email@email.com"
            value={formik.values.email}
            errorText={
              formWasTouched && formik.touched.email && formik.errors.email
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></InputField>
          <PasswordField
            name="password"
            placeholder="Heslo"
            variant="gray"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={
              formWasTouched &&
              formik.touched.password &&
              formik.errors.password
            }
            onBlur={formik.handleBlur}
          ></PasswordField>
          <div className="flex items-start justify-between border-b border-primary-200">
            {/* redirect to jidelny.cz for password reset*/}
            <StyledLink href="https://jidelny.cz/profil/zapomenute-heslo/?redirectAfter=https://receptury.cz/password-reset-complete">
              Zapomenuté heslo?
            </StyledLink>
            <Button
              className="relative my-4 items-end "
              type="submit"
              disabled={formik.isSubmitting}
            >
              <LoadingSpinner
                className={`absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center opacity-0 ${
                  formik.isSubmitting && "opacity-100"
                }`}
              />
              <span className={`${formik.isSubmitting && "opacity-0"}`}>
                Přihlásit se
              </span>
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
