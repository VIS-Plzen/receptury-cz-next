"use client";

import InputField from "@/components/forms/InputField";
import TextArea from "@/components/forms/TextArea";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useFormik } from "formik";
import React from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Props = React.ComponentPropsWithoutRef<"form"> & {
  className?: string;
  [key: string]: any;
};

export default function FormComponent({ className = "", ...props }: Props) {
  // Validation schema
  const formValidationSchema = z.object({
    name: z
      .string({
        required_error: "Vyplňte prosím jméno",
        invalid_type_error: "Neplatný typ",
      })
      .min(2, "Jméno musí mít alespoň 2 znaky")
      .max(50, "Jméno může mít maximálně 50 znaků"),
    surname: z
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
    message: z
      .string({
        required_error: "Vyplňte prosím zprávu",
        invalid_type_error: "Neplatný typ",
      })
      .min(10, "Zpráva musí mít alespoň 10 znaků")
      .max(500, "Zpráva může mít maximálně 500 znaků"),
  });

  // Formik
  const formik = useFormik({
    // Field names should match `name` prop in InputField component
    initialValues: {
      name: "",
      surname: "",
      email: "",
      message: "",
    },
    // Function to handle form submission
    onSubmit: (values, actions) => {
      console.log(values);
      actions.setSubmitting(false);
    },
    // Connect validation schema to formik
    validationSchema: toFormikValidationSchema(formValidationSchema),
    // Validation behavior setup
    validateOnChange: false,
    validateOnBlur: true,
  });

  // EN: If you need to turn on validation after the first Submit:
  // 1. Set `validateOnChange` or `validateOnBlur` to `true`
  // 2. Add prop `errorText` to InputField component and pass `formWasTouched && ....` to it
  // 3. Uncomment the following line
  const formWasTouched = formik.submitCount > 0;

  // If you need to manually set the value of a field (e.g. after clicking a button)
  // formik.setFieldValue("fieldName", "Value");

  // If you need to manually reset the error (e.g. after clicking a button)
  // formik.setFieldError("fieldName", undefined);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("space-y-6", className)}
      {...props}
    >
      <InputField
        name="name"
        label="Vaše jméno"
        errorText={formWasTouched && formik.touched.name && formik.errors.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      <InputField
        name="surname"
        label="Vaše příjmení"
        errorText={
          formWasTouched && formik.touched.surname && formik.errors.surname
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.surname}
      />
      <InputField
        type="email"
        name="email"
        label="Váš e-mail"
        errorText={
          formWasTouched && formik.touched.email && formik.errors.email
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <TextArea
        name="message"
        label="Vaše zpráva"
        errorText={
          formWasTouched && formik.touched.message && formik.errors.message
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
      />
      <Button type="submit" isLoading={formik.isSubmitting}>
        Odeslat
      </Button>
    </form>
  );
}
