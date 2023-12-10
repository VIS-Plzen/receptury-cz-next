"use client";
import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  currentPage: number;
  totalPages: number;
  onArrowLeft: () => void;
  onArrowRight: () => void;
  onPageClick: (page: number) => void;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Paginator({
  currentPage,
  totalPages,
  onArrowLeft,
  onArrowRight,
  onPageClick,
  variant,
  className,
}: Props) {
  // set by ElipssisButton - on click sets +/- 5, showing currenently selected page + offset <DayButton>s
  const [offset, setOffset] = useState<number>(0);
  const iconSize = "h-9 w-9";

  function DayButton({ page }: { page: number }) {
    return (
      <button
        onClick={() => {
          setOffset(0);
          onPageClick(page);
        }}
        className={`${iconSize} rounded-full font-bold duration-300 hover:bg-primary hover:text-white ${
          page === currentPage && "bg-primary font-extrabold text-white"
        }`}
      >
        {page}
      </button>
    );
  }
  function ElipssisButton({ back = false }) {
    const [dotsFilled, setDotsFilled] = useState<number>(0);
    const mouseOverRef = useRef(false);
    const timeoutTick = 100;

    function fillDots(currDotsFilled: number) {
      if (mouseOverRef.current) {
        if (currDotsFilled < 3) {
          setTimeout(() => {
            setDotsFilled(currDotsFilled + 1);
            fillDots(currDotsFilled + 1);
          }, timeoutTick);
        }
      } else {
        setDotsFilled(0);
      }
    }

    return (
      <button
        onClick={() => (back ? setOffset(offset + 5) : setOffset(offset - 5))}
        className={`${iconSize} flex justify-center rounded-full text-2xl font-semibold ${
          back ? "flex-row" : "flex-row-reverse"
        }`}
        onMouseEnter={() => {
          mouseOverRef.current = true;
          fillDots(0);
        }}
        onMouseLeave={() => {
          mouseOverRef.current = false;
          fillDots(0);
        }}
      >
        <span className={`${dotsFilled > 0 && "text-primary"}`}>.</span>
        <span className={`${dotsFilled > 1 && "text-primary"}`}>.</span>
        <span className={`${dotsFilled > 2 && "text-primary"}`}>.</span>
      </button>
    );
  }
  function ChevronButton({ back = false }) {
    return (
      <button
        onClick={() => {
          setOffset(0);
          back ? onArrowLeft() : onArrowRight();
        }}
        className={`rounded-full bg-white text-black duration-300 hover:bg-primary hover:text-white ${
          back ? "hover:-translate-x-2" : "hover:translate-x-2"
        }`}
      >
        {back ? (
          <ChevronLeftIcon className={iconSize} />
        ) : (
          <ChevronRightIcon className={iconSize} />
        )}
      </button>
    );
  }
  return (
    <div className="flex flex-row gap-x-2">
      <ChevronButton back />
      <div className="flex flex-row items-center justify-around gap-x-1 rounded-full bg-white px-3 text-black">
        <DayButton page={1} />
        {currentPage + offset <= 5 ? (
          <>
            {[2, 3, 4, 5, 6, 7].map((page: number) => (
              <DayButton page={page} key={"ppbn" + page} />
            ))}
            <ElipssisButton back />
          </>
        ) : currentPage + offset >= totalPages - 4 ? (
          <>
            <ElipssisButton />
            {[
              totalPages - 6,
              totalPages - 5,
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1,
            ].map((page: number) => (
              <DayButton page={page} key={"ppbn" + page} />
            ))}
          </>
        ) : (
          <>
            <ElipssisButton />
            {[
              currentPage + offset - 2,
              currentPage + offset - 1,
              currentPage + offset,
              currentPage + offset + 1,
              currentPage + offset + 2,
            ].map((page: number) => (
              <DayButton page={page} key={"ppbn" + page} />
            ))}
            <ElipssisButton back />
          </>
        )}
        <DayButton page={totalPages} />
      </div>
      <ChevronButton />
    </div>
  );
}
