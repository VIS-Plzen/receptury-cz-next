type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function ArrowDownwardAltIcon({
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
        d="M480-301.847 301.847-480 339-517.153l115.001 115.001v-307.847h51.998v307.847L621-517.153 658.153-480 480-301.847Z"
        fill="currentColor"
      />
    </svg>
  );
}
