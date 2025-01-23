import { HomeIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center gap-8 pb-32 pt-8 text-center md:pb-36 md:pt-10">
      <p className="text-indigo-600 text-base font-semibold">404</p>
      <Heading as="h1" size="lg">
        Stránka nebyla nalezena
      </Heading>
      <p className="text-base leading-7">
        Omlouváme se, stránka, kterou hledáte již neexistuje, nebo byla
        přesunuta.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild className="w-full">
          <Link href="/">
            <HomeIcon size={18} />
            Domovská stránka
          </Link>
        </Button>
      </div>
    </Container>
  );
}
