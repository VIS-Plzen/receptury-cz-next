import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  hasDots?: boolean;
  hasArrows?: boolean;
  className?: string;
  slidesWidth?: string;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, hasDots, hasArrows, className, slidesWidth } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="py-10">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex" style={{ touchAction: "pan-y pinch-zoom" }}>
            {slides.map((slide, index) => (
              <div
                className={`flex-0 mr-4 min-w-0 
                ${
                  slidesWidth ??
                  "flex-slides1 min-[500px]:flex-slides2 min-[640px]:flex-slides3 min-[768px]:flex-slides4 min-[1024px]:flex-slides5 min-[1280px]:flex-slides6"
                }`}
                key={index}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {hasArrows && (
          <>
            {!prevBtnDisabled && (
              <button
                className="absolute -left-10 top-1/2 z-fixed hidden -translate-y-1/2 md:block"
                onClick={onPrevButtonClick}
              >
                <ChevronLeftIcon className="h-16 w-16"></ChevronLeftIcon>
              </button>
            )}
            {!nextBtnDisabled && (
              <button
                className="absolute -right-10 top-1/2 z-fixed hidden -translate-y-1/2 md:block"
                onClick={onNextButtonClick}
              >
                <ChevronRightIcon className="h-16 w-16"></ChevronRightIcon>
              </button>
            )}
          </>
        )}
      </div>

      {hasDots && (
        <div className="mt-4 flex w-full justify-center gap-x-2 md:gap-x-5">
          {scrollSnaps.length > 1 ? (
            scrollSnaps.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/50"
              >
                {index === selectedIndex && (
                  <span className="block flex h-2 w-2 rounded-full bg-white"></span>
                )}
              </button>
            ))
          ) : (
            <div className="block h-4"></div>
          )}
        </div>
      )}
    </div>
  );
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
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
};

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
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
};

export default Carousel;
