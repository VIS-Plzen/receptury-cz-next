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
    if (params.activated) {
      router.replace("/");
      cookies.set("paid", addOneYear());
      getNewValidDate();
    }
    if (cookies.get("memModal")) {
      setOpen(true);
      cookies.remove("memModal");
    }
  }, []);

  function addOneYear() {
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 365);
    const splitted = date.toLocaleDateString().split("/");
    return `${splitted[1]}.${splitted[0]}.${splitted[2]}`;
  }

  async function getNewValidDate() {
    const res = await (
      await fetch("/api/userPrepaid", {
        method: "POST",
        body: JSON.stringify({
          token: cookies.get("token"),
        }),
      })
    ).json();
    console.log(res);
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
