import InputField from "@/components/forms/InputField";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import StyledLink from "@/components/ui/StyledLink";

function page() {
  return (
    <Container className="flex justify-center py-20 pt-24 text-black">
      <div className="w-full space-y-4 rounded-2xl border-2 border-primary-200 bg-white p-8 sm:w-2/3 xl:w-1/3">
        <Heading size="md">Přihlášení</Heading>
        <InputField type="email" placeholder="Email@email.com"></InputField>
        <InputField type="password" placeholder="Heslo"></InputField>
        <div className="flex items-start justify-between border-b border-primary-200 pb-6">
          <StyledLink>Zapomenuté heslo?</StyledLink>
          <Button className="items-end" type="submit">
            Přihlásit se
          </Button>
        </div>
        <div className="flex items-center justify-end gap-1">
          <p>Nemáte účet?</p>
          <StyledLink href="registrace" className="font-bold">
            Zaregistrujte se
          </StyledLink>
        </div>
      </div>
    </Container>
  );
}

export default page;
