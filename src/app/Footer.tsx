import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function Footer() {
  return (
    <footer className="bg-error-700 text-center">
      <Container className="flex items-center justify-center py-48">
        <Heading as={"h2"} size="xl" className="text-error-50">
          Footer
        </Heading>
      </Container>
    </footer>
  );
}
