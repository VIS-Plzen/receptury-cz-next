"use client";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

type Props = { params: any };

export default function MembershipModal({ params }: Props) {
  const [open, setOpen] = useState(false);

  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (params.activated) {
        router.replace("/");
        const isPaid = await getNewValidDate();
        if (isPaid) {
          cookies.set("paid", isPaid);
        }
      }
      if (cookies.get("memModal")) {
        setOpen(true);
        cookies.remove("memModal");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getNewValidDate() {
    const res = await (
      await fetch("/api/userPrepaid", {
        method: "POST",
        body: JSON.stringify({
          token: cookies.get("token"),
        }),
      })
    ).json();
    if (res.paid) {
      return res.paid;
    }
    return false;
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
