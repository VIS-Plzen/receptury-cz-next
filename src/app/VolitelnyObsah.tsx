import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import img1 from "/public/images/food.jpeg";

export default function VolitelnyObsah({
  title,
  text,
  img,
  className = "",
}: {
  title: string;
  text: string;
  img?: string;
  className?: string;
}) {
  return (
    <Container>
      <div
        className={`flex w-full flex-col justify-between gap-x-5 gap-y-10 rounded-3xl bg-primary-300/30 p-6 md:flex-row lg:p-8 ${className}`}
      >
        <div className="max-w-xl">
          <Heading hasMarginBottom>{title}</Heading>
          <p>{text}</p>
        </div>
        <Image
          src={img1}
          alt=""
          className="rounded-2xl bg-gray-300 object-cover md:w-1/2"
        />
      </div>
    </Container>
  );
}
