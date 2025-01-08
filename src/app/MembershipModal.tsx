"use client";
import Modal from "@/components/ui/Modal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

type Props = { type: "paid" | "unpaid" };

export default function MembershipModal({ type }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cookie = new Cookies();

  useEffect(() => {
    setOpen(true);
    if (type !== "paid") return;
    window.history.pushState(null, "", pathname);
  }, []);

  function close() {
    setOpen(false);
    cookie.remove("memModal");
  }

  return (
    <Modal
      setIsOpen={close}
      isOpen={open}
      title={type === "unpaid" ? "Kupte si prémium!" : "Prémium aktivováno!"}
    >
      <p className="px-3 py-5 md:px-5 md:py-8">
        {type === "unpaid"
          ? "Přihlášený účet nemá aktivní režim prémium, kvůli tomu nebude možné si receptury zobrazovat a ukládat."
          : "Gratulujeme, váš účet je nyní v režimu prémium, můžete si zobrazovat a ukládat receptury"}
      </p>
    </Modal>
  );
}
