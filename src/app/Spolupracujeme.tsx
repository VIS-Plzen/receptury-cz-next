import Logo from "@/components/brand/Logo";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { cn } from "@/utils/cn";

export default function Spolupracujeme({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Container className={cn(className)}>
      <Heading>Spolupracujeme</Heading>
      <div className="my-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
        {Array.from({ length: 12 }, (_, index) => (
          <a
            key={"safl" + index}
            href={`#${index}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo className="w-full" />
          </a>
        ))}
      </div>
    </Container>
  );
}
