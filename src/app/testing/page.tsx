import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Loader from "@/components/ui/Loader";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Container className="rounded-2xl bg-white py-24">
        <div className="flex flex-wrap gap-8">
          <Loader color="black" size="xs" />
          <Loader color="black" size="sm" />
          <Loader color="black" size="md" />
          <Loader color="black" size="lg" />
          <Loader color="black" size="xl" />
          <Loader color="black" size="2xl" />
          <div className="text-base">
            <Loader color="black" size="inherit" />
          </div>
        </div>
        <div>
          <Heading size="2xl">Lorem ipsum dolor</Heading>
          <Heading size="xl">Lorem ipsum dolor</Heading>
          <Heading size="lg">Lorem ipsum dolor</Heading>
          <Heading size="md">Lorem ipsum dolor</Heading>
          <Heading size="sm">Lorem ipsum dolor</Heading>
          <Heading size="xs">Lorem ipsum dolor</Heading>
        </div>
      </Container>
    </div>
  );
}
