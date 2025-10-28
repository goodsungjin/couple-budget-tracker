interface Props {
  size?: number;
  color?: string;
}

const IconChevronRight = ({ size = 20, color = '#B3B3B3' }: Props) => {
  return (
    <svg
      width={size}
      height={size + 1}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Chevron Right Icon</title>

      <path
        d="M7.5 15.5L12.5 10.5L7.5 5.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { IconChevronRight };
