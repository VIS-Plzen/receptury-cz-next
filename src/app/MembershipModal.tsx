"use client";
import Modal from "@/components/ui/Modal";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

type Props = { type: "paid" | "unpaid" | "pending" };

export default function MembershipModal({ type }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const query = useSearchParams();
  const cookie = new Cookies();

  useEffect(() => {
    if (type === "paid" || type === "pending") {
      if (!query.get("activated")) return;
      window.history.pushState(null, "", pathname);
    } else {
      if (!cookie.get("memModal")) return;
    }
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    setOpen(false);
    cookie.remove("memModal");
  }

  return (
    <Modal
      setIsOpen={close}
      isOpen={open}
      title={
        type === "unpaid"
          ? "Kupte si prémium!"
          : type === "paid"
            ? "Prémium aktivováno!"
            : "Koupě prémium v procesu."
      }
    >
      <p className="px-3 py-5 md:px-5 md:py-8">
        {type === "unpaid"
          ? "Přihlášený účet nemá aktivní režim prémium, kvůli tomu nebude možné si receptury zobrazovat a ukládat."
          : type === "paid"
            ? "Gratulujeme, váš účet je nyní v režimu prémium, můžete si zobrazovat a ukládat receptury"
            : "Koupě Vašeho prémium je v procesu, prosím zkontrolujte email na který je účet registrovaný."}
      </p>
    </Modal>
  );
}
