type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function HomeIcon({
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
        d="M264-216h109.847v-237.692h212.306V-216H696v-348L480-726.769 264-564v348Zm-51.999 51.999v-425.998L480-791.767l267.999 201.768v425.998H534.154v-237.693H425.846v237.693H212.001ZM480-471.385Z"
        fill="currentColor"
      />
    </svg>
  );
}
