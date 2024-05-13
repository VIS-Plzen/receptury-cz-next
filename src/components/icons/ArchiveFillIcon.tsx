type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function ArchiveFillIcon({
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
        d="m480-276 144-144-51-51-57 57v-150h-72v150l-57-57-51 51 144 144ZM216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-474q0-14 5.25-27T165-741l54-54q11-11 23.94-16 12.94-5 27.06-5h420q14.12 0 27.06 5T741-795l54 54q10.5 11 15.75 24t5.25 27v474q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm6-552h516l-48-48H270l-48 48Z"
        fill="currentColor"
      />
    </svg>
  );
}
