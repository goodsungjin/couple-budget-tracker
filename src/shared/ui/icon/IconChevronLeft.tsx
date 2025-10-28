interface Props {
  size?: number;
  color?: string;
}

const IconChevronLeft = ({ size = 16, color = '#474747' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Chevron Left Icon</title>

      <path
        d="M10 12L6 8L10 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { IconChevronLeft };
