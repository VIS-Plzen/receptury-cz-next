type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function ArrowRightAltIcon({
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
        d="m569.846-301.847-37.153-36.384 115.77-115.77H212.001v-51.998h436.462l-115.77-115.77 37.153-36.384L747.999-480 569.846-301.847Z"
        fill="currentColor"
      />
    </svg>
  );
}
