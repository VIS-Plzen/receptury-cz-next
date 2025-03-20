"use client";

import clsx from "clsx";
import { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

type ButtonProps = Omit<React.ComponentProps<"button">, "children">;

export function PrevButton(props: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "border-accent text-accent hover:bg-accent hover:text-accent-content size-10 flex cursor-pointer items-center justify-center rounded-full border-2 bg-transparent transition-colors duration-300 ease-out",
        props.className
      )}
      type="button"
    >
      &rarr;
    </button>
  );
}

export function NextButton(props: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "border-accent text-accent hover:bg-accent hover:text-accent-content size-10 flex cursor-pointer items-center justify-center rounded-full border-2 bg-transparent transition-colors duration-300 ease-out",
        props.className
      )}
      type="button"
    >
      &larr;
    </button>
  );
}

export function DotButton(props: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx("size-2 cursor-pointer rounded-full", props.className)}
      type="button"
    />
  );
}

export function usePrevNextButtons(emblaApi: EmblaCarouselType | undefined) {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

export function useDotButton(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
}
