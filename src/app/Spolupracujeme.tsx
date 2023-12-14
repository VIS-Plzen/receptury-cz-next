import Logo from "@/components/brand/Logo";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function Spolupracujeme({}) {
  return (
    <Container>
      <Heading>Spolupracujeme</Heading>
      <div className="my-8 grid grid-cols-3 gap-x-5 gap-y-8 md:grid-cols-6">
        {Array.from({ length: 12 }, (_, index) => (
          <Logo className="w-full" key={"safl" + index} />
        ))}
      </div>
    </Container>
  );
}
