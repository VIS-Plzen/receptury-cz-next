import TemplateBase from "@/components/templates/TemplateBase";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Container className="rounded-2xl bg-white py-24">
        <TemplateBase>This is template</TemplateBase>
        <div className="flex flex-wrap gap-8">
          <LoadingSpinner color="black" size="xs" />
          <LoadingSpinner color="black" size="sm" />
          <LoadingSpinner color="black" size="md" />
          <LoadingSpinner color="black" size="lg" />
          <LoadingSpinner color="black" size="xl" />
          <LoadingSpinner color="black" size="2xl" />
          <div className="text-base">
            <LoadingSpinner color="black" size="inherit" />
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
