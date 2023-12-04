type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function MailIcon({
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
        d="M180.309-212.001q-27.008 0-45.658-18.662-18.65-18.662-18.65-45.686v-407.626q0-27.024 18.65-45.524t45.658-18.5h599.382q27.008 0 45.658 18.662 18.65 18.662 18.65 45.686v407.626q0 27.024-18.65 45.524t-45.658 18.5H180.309ZM480-449.694 168-633.309v357q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462h599.382q5.385 0 8.847-3.462 3.462-3.462 3.462-8.847v-357L480-449.694ZM480-517l305.846-179H174.154L480-517ZM168-633.309V-696-276.309q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462H168v-369.309Z"
        fill="currentColor"
      />
    </svg>
  );
}
