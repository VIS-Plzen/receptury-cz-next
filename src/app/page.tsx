import InputField from "@/components/forms/InputField";
import ActiveLink from "@/components/primitives/ActiveLink";
import SmartLink from "@/components/primitives/SmartLink";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-24 text-center">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-4xl lg:text-6xl">
        Receptury - základ projektu
      </h1>
      <p className="mx-auto max-w-prose">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
        dolores praesentium a minus fuga sequi porro tempora dolor perferendis
        voluptatum!
      </p>
      <Container>
        <InputField
          name="test"
          label="Custom label"
          required
          placeholder="placeholdre"
          helperText="Lorem ipsum dolor sit amet"
        />
        <InputField
          name="test"
          label="Custom label"
          required
          placeholder="placeholdre"
          errorText="Lorem ipsum dolor sit amet"
        />
        <InputField
          name="test"
          label="Custom label"
          required
          placeholder="placeholdre"
        />
        <InputField
          name="test"
          label="Custom label"
          required
          disabled
          placeholder="placeholdre"
          helperText="Lorem ipsum dolor sit amet"
        />
      </Container>
      <ActiveLink href={"/"} activeClassName="text-primary">
        Recepty
      </ActiveLink>
      <ActiveLink href={"/testovani"} activeClassName="text-primary">
        Testování
      </ActiveLink>
      <SmartLink href={"/testing"} className="">
        Testování
      </SmartLink>
      <Button>Testovací button</Button>
    </div>
  );
}
