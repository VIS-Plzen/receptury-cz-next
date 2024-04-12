"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "./Container";
import Heading from "./Heading";

export default function Galerie({
  images,
  miniImages,
  looped = false,
}: {
  images?: string[];
  miniImages?: number;
  looped?: boolean;
}) {
  /*   const [imageOpen, setImageOpen] = useState<false | number>(false);
  const imagesLength = useMemo(() => {
    if (!images) return 0;
    return images.length;
  }, [images]);
  const [fullImageMode, setFullImageMode] = useState(false);

  const onArrowClick = useCallback(
    (to: "before" | "after") => {
      if (imageOpen === false || imagesLength === 0) return;
      if (to === "before") {
        if (imageOpen === 0) {
          if (looped) setImageOpen(imagesLength - 1);
        } else {
          setImageOpen(imageOpen - 1);
        }
      } else {
        if (imageOpen === imagesLength - 1) {
          if (looped) setImageOpen(0);
        } else {
          setImageOpen(imageOpen + 1);
        }
      }
    },
    [imageOpen, imagesLength, looped]
  );

  useEffect(() => {
    function keyboardHandler(e: any) {
      const code = e.code;

      switch (code) {
        case "Escape":
          setFullImageMode(false);
          setImageOpen(false);
          break;
        case "ArrowLeft":
          onArrowClick("before");
          break;
        case "ArrowRight":
          onArrowClick("after");
          break;
        case "ArrowUp":
          setFullImageMode(true);
          break;
        case "NumpadAdd":
          setFullImageMode(true);
          break;
        case "ArrowDown":
          setFullImageMode(false);
          break;
        case "NumpadSubtract":
          setFullImageMode(false);
          break;
      }
    }
    if (imageOpen !== false) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", keyboardHandler);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", keyboardHandler);
    }

    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [imageOpen, onArrowClick]); */

  if (
    !images ||
    ((images[0] === "" || images[0] === "test.receptury.adelis.cz/") &&
      (images[1] === "" || images[1] === "test.receptury.adelis.cz/") &&
      (images[2] === "" || images[2] === "test.receptury.adelis.cz/"))
  )
    return null;

  function ClosedImage({
    image,
    index,
    className,
  }: {
    image: string;
    index: number;
    className?: string;
  }) {
    const [isValidImage, setIsValidImage] = useState(false);

    useEffect(() => {
      const checkImage = async () => {
        try {
          const response = await fetch(image);
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.startsWith("image")) {
            setIsValidImage(false);
          }
        } catch (error) {
          setIsValidImage(false);
          console.error("Error checking image:", error);
        }
      };

      checkImage();
    }, [image]);
    if (!isValidImage) return null;

    return (
      <div
        className="relative aspect-video w-full"
        /* onClick={() => setImageOpen(index)} */
      >
        <Image
          alt={""}
          src={image}
          fill
          className={`aspect-video rounded-2xl bg-gray-300 object-cover ${className} select-none`}
          onError={(e) => console.log("crash")}
        />
      </div>
    );
  }
  /* 
  function MainImage({ image }: { image: string }) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={""}
          fill
          className={`select-none bg-gray-300 object-contain ${
            fullImageMode ? "p-1" : "mx-auto mt-10 max-h-[70%]"
          }`}
        />
      </div>
    );
  }*/

  /*function MiniImageRow() {
    if (!miniImages || !images || imageOpen === false) return null;

    function returnStart() {
      if (!imageOpen || !miniImages) return 0;
      console.log(imageOpen + miniImages, imagesLength);

      if (imageOpen - miniImages < 0) return 0;
      else if (imageOpen + miniImages > imagesLength - 1)
        return imagesLength - miniImages;
      else return imageOpen - miniImages / 2;
    }
    const start = returnStart();

    return (
      <div
        className={`absolute bottom-5 mx-auto hidden h-full max-h-[20%] w-full grid-cols-7 items-center gap-x-5 ${
          !fullImageMode && "md:grid"
        }`}
      >
        {images.slice(start, start + miniImages).map((image, index) => (
          <div
            key={"gifmi" + index}
            onClick={() => setImageOpen(start + index)}
            className="relative h-full w-full"
          >
            <Image
              src={image}
              alt={""}
              fill
              className={clsx(
                "h-full w-full select-none rounded-lg bg-gray-300 object-fill transition duration-150 ease-in-out hover:shadow-lg hover:shadow-primary-300",
                (index === 0 || index === miniImages - 1) &&
                  "scale-50 hover:scale-[0.6]",
                (index === 1 || index === miniImages - 2) &&
                  "scale-75 hover:scale-[0.85]",
                (index === 2 || index === miniImages - 3) &&
                  "scale-90 hover:scale-100",
                index === Math.floor(miniImages / 2) && "hover:shadow-none"
              )}
            />
          </div>
        ))}
      </div>
    );
  } */

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <Heading>Další fotky</Heading>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row">
            <ClosedImage image={images[1]} index={0} />
            <ClosedImage image={images[2]} index={1} />
          </div>

          {/* <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {images.slice(2, 6).map((image, index) => (
              <ClosedImage key={"kfici" + index} image={image} index={index} />
            ))}
          </div> */}
        </div>
        {/* {imageOpen !== false && (
          <div
            className={`fixed inset-0 z-fixed flex gap-y-16 bg-black/90 text-white md:flex-col ${
              fullImageMode && "!p-0"
            }`}
          >
            <MainImage image={images[imageOpen]} />
            <MiniImageRow />
            <button
              onClick={() => {
                setFullImageMode(false);
                setImageOpen(false);
              }}
              className="absolute right-5 top-5 z-fixed-above border-0 p-5 ring-0 duration-200 hover:right-[30px] hover:top-[30px] hover:scale-150 focus:border-0 focus:ring-0"
            >
              <CancelIcon size={32} />
            </button>
            <button
              className={`group absolute z-fixed mt-20 flex h-[calc(100%-20rem)] w-1/4 items-center justify-start px-20 focus:ring-0 ${
                (imageOpen === 0 || fullImageMode) && "hidden"
              }`}
              onClick={() => onArrowClick("before")}
            >
              <ArrowLeftAltIcon
                size={32}
                className="duration-200 group-hover:-translate-x-5 group-hover:scale-150"
              />
            </button>
            <button
              className={`group absolute right-0 z-fixed mt-20 flex h-[calc(100%-20rem)] w-1/4 items-center justify-end px-20 text-end focus:ring-0 ${
                (imageOpen === imagesLength - 1 || fullImageMode) && "hidden"
              }`}
              onClick={() => onArrowClick("after")}
            >
              <ArrowRightAltIcon
                size={32}
                className="duration-200 group-hover:translate-x-5 group-hover:scale-150"
              />
            </button>
          </div>
        )} */}
      </div>
    </Container>
  );
}
