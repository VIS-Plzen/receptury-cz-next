import { cn } from "@/utils/cn";

type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  color?: "primary" | "inherit";
  ariaHidden?: boolean;
  className?: string;
  [key: string]: any;
};

const cv = {
  primary: "text-primary",
  inherit: "",
};

export default function SymbolComponent({
  size = 48,
  color = "primary",
  ariaHidden = true,
  className = "",
  ...props
}: Props) {
  return (
    <svg
      height={size}
      width={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      fill="none"
      className={cn(cv[color], className)}
      {...props}
    >
      <path
        d="M24 1.84615C11.7635 1.84615 1.84615 11.7635 1.84615 24C1.84615 36.2365 11.7635 46.1538 24 46.1538C36.2365 46.1538 46.1538 36.2365 46.1538 24C46.1538 11.7635 36.2365 1.84615 24 1.84615ZM0 24C0 10.7439 10.7439 0 24 0C37.2561 0 48 10.7439 48 24C48 37.2561 37.2561 48 24 48C10.7439 48 0 37.2561 0 24ZM29.5605 7.96831C29.3521 8.14765 29.1849 8.4289 29.1849 8.88708V8.93836L27.7418 21.8873C27.7641 23.2271 28.7247 24.4526 30.3377 24.886L29.8587 26.6689C27.5431 26.0468 25.8953 24.154 25.8953 21.8396V21.7883L27.3392 8.83213C27.3535 7.87681 27.7406 7.09879 28.3564 6.56893C28.9647 6.04545 29.745 5.80606 30.491 5.80606C31.237 5.80606 32.0173 6.04545 32.6256 6.56893C33.2531 7.10891 33.6432 7.90663 33.6432 8.88708V41.2341H31.797V8.88708C31.797 8.4289 31.6298 8.14765 31.4214 7.96831C31.1939 7.77249 30.8595 7.65222 30.491 7.65222C30.1225 7.65222 29.7881 7.77249 29.5605 7.96831ZM11.8834 6.68784L13.727 6.78517L13.1899 16.9591H15.8101V6.73651H17.6563V16.9591H20.2864L19.7492 6.78517L21.5928 6.68784L22.252 19.1737V19.198C22.252 21.5124 20.6041 23.4052 18.2886 24.0273L18.2749 24.031L18.2611 24.0343C18.063 24.081 17.8646 24.1186 17.6661 24.1471V41.234H15.82V24.1485C15.6182 24.1199 15.4166 24.0818 15.2152 24.0343L15.1993 24.0305L15.1835 24.0262C12.8735 23.3941 11.2242 21.5043 11.2242 19.198V19.1737L11.8834 6.68784ZM20.3839 18.8052H13.0924L13.0705 19.2207C13.0812 20.5545 14.0362 21.7919 15.6551 22.2412C16.3796 22.4097 17.0987 22.4095 17.8233 22.2407C19.438 21.8014 20.3952 20.5664 20.4058 19.2207L20.3839 18.8052ZM40.3502 24C40.3502 19.6682 38.6689 15.738 35.9165 12.8089L37.2619 11.5446C40.3229 14.8021 42.1964 19.1796 42.1964 24C42.1964 28.8266 40.1408 33.6076 36.8176 36.9101L35.5163 35.6006C38.4975 32.6379 40.3502 28.3256 40.3502 24ZM9.52774 16.3961C8.33828 18.6635 7.65957 21.2565 7.65957 24C7.65957 28.963 9.87019 33.4052 13.3675 36.4095L12.1645 37.8099C8.27712 34.4705 5.81342 29.5247 5.81342 24C5.81342 20.9497 6.56843 18.0632 7.89288 15.5385L9.52774 16.3961ZM23.9116 40.3502C25.502 40.3502 27.0535 40.1714 28.538 39.8332L28.9481 41.6332C27.3295 42.002 25.6404 42.1964 23.9116 42.1964C22.5119 42.1964 21.1497 42.0738 19.8161 41.8275L20.1512 40.0121C21.3708 40.2372 22.6207 40.3502 23.9116 40.3502Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
}