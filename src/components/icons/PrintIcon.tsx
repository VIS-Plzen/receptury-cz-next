type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function PrintIcon({
  size = 24,
  ariaHidden = true,
  ...props
}: Props) {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 -960 960 960"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      {...props}
    >
      <path
        d="M648-611.691v-120H312v120h-51.999V-783.69h439.998v171.999H648Zm-468.461 51.998h601.922-601.922Zm520.558 96q15.21 0 25.71-10.289 10.5-10.29 10.5-25.5 0-15.211-10.289-25.711-10.29-10.5-25.5-10.5-15.211 0-25.711 10.29-10.5 10.289-10.5 25.5 0 15.21 10.29 25.71 10.289 10.5 25.5 10.5ZM648-216v-154.77H312V-216h336Zm51.999 51.999H260.001v-144h-132.46v-227.692q0-31.499 22.038-53.749 22.038-22.249 53.96-22.249h552.922q31.499 0 53.749 22.249 22.249 22.25 22.249 53.749v227.692h-132.46v144ZM781.461-360v-161.365q0-16.328-12-27.328t-28-11H217.539q-16.15 0-27.075 11.04t-10.925 27.36V-360h80.462v-62.769h439.998V-360h81.462Z"
        fill="currentColor"
      />
    </svg>
  );
}
