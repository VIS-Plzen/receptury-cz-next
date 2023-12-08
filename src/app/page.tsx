import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <Container className="flex items-center justify-center rounded-3xl bg-primary-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-primary-50">
          Sekce Inspirace na vaření
        </Heading>
      </Container>

      <Container className="flex items-center justify-center rounded-3xl bg-secondary-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-secondary-50">
          Sekce Recepty
        </Heading>
      </Container>

      <Container className="flex items-center justify-center rounded-3xl bg-success-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-success-50">
          Sekce Spolupracujeme
        </Heading>
      </Container>

      <Container className="flex items-center justify-center rounded-3xl bg-warning-600 py-52 text-center">
        <Heading as={"h2"} size="xl" className="text-warning-50">
          Volitelný obsah
        </Heading>
      </Container>
    </div>
  );
}
