type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function PlayArrowIcon({
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
        d="M356.001-252.156v-455.688L707.074-480 356.001-252.156ZM409-481Zm-1 133 204.769-132L408-612v264Z"
        fill="currentColor"
      />
    </svg>
  );
}
