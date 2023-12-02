type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function CheckIcon({
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
        d="M395-298.847 240.616-454.231l35.769-35.768L395-372.384l288.615-287.615 35.769 36.768L395-298.847Z"
        fill="currentColor"
      />
    </svg>
  );
}
