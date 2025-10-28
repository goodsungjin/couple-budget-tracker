interface Props {
  size?: number;
  color?: string;
}

const MenuIcon = ({ size = 24, color = '#1E1E1E' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Menu Icon</title>
      <path
        d="M4 16H28M4 8H28M4 24H28"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { MenuIcon };
