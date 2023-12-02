type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function ArrowLeftAltIcon({
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
        d="M382.077-301.847 203.924-480l178.153-178.153 37.153 36.384-115.77 115.77h452.616v51.998H303.46l115.77 115.77-37.153 36.384Z"
        fill="currentColor"
      />
    </svg>
  );
}
