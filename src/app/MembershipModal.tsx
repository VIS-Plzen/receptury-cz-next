"use client";
import Modal from "@/components/ui/Modal";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

type Props = {};

export default function MembershipModal({}: Props) {
  const [open, setOpen] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("memModal")) {
      setOpen(true);
      cookies.remove("memModal");
    }
  }, []);

  return (
    <Modal setIsOpen={setOpen} isOpen={open} title="Kupte si prémium!">
      <p className="px-3 py-5 md:px-5 md:py-8">
        Přihlášený účet nemá aktivní režim prémium, kvůli tomu nebude možné si
        receptury zobrazovat a ukládat.
      </p>
    </Modal>
  );
}
