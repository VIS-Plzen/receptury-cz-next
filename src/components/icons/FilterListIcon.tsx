type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function FilterListIcon({
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
        d="M395.155-284.001V-336h169.306v51.999H395.155Zm-139-170v-51.998H703.46v51.998H256.155ZM164.001-624v-51.999h631.998V-624H164.001Z"
        fill="currentColor"
      />
    </svg>
  );
}
