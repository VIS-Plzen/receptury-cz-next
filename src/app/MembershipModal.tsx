"use client";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import Cookies from "universal-cookie";

type Props = {};

export default function MembershipModal({}: Props) {
  const [open, setOpen] = useState(true);

  const cookies = new Cookies();
  if (cookies.get("memModal")) {
    cookies.remove("memModal");
  }

  return (
    <Modal setIsOpen={setOpen} isOpen={open} title="Kupte si prémium!">
      <p className="px-3 py-5 md:px-5 md:py-8">
        Přihlášený účet nemá aktivní režim prémium, kvůli tomu nebude možné si
        receptury zobrazovat a ukládat.
      </p>
    </Modal>
  );
}
