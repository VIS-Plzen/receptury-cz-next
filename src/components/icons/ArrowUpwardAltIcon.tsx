type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function ArrowUpwardAltIcon({
  size = 20,
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
        d="M454.001-253.847v-307.847L339-446.694l-37.153-37.152L480-661.999l178.153 178.153L621-446.694l-115.001-115v307.847h-51.998Z"
        fill="currentColor"
      />
    </svg>
  );
}
