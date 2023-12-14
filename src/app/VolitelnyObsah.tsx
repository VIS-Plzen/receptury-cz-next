import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";

export default function VolitelnyObsah({
  title,
  text,
  img,
}: {
  title: string;
  text: string;
  img: string;
}) {
  return (
    <Container>
      <div className="flex w-full flex-col justify-between gap-x-5 gap-y-10 rounded-3xl bg-primary-300/30 p-6 md:flex-row lg:p-8">
        <div className="max-w-xl">
          <Heading hasMarginBottom>{title}</Heading>
          <p>{text}</p>
        </div>
        <div className="mx-auto mb-6 flex h-[200px] w-[300px] flex-shrink-0 rounded-2xl bg-secondary-700 md:mx-0 md:mb-auto md:h-[275px] md:w-[275px] lg:h-[350px] lg:w-[350px]"></div>
      </div>
    </Container>
  );
}
