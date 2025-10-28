interface Props {
  size?: number;
  color?: string;
}

const ChevronDown = ({ size = 24, color = '#1E1E1E' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Chevron Down Icon</title>

      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { ChevronDown };
