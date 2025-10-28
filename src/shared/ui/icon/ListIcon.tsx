interface Props {
  size?: number;
  color?: string;
}

const ListIcon = ({ size = 24, color = '#757575' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>List Icon</title>
      <path
        d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { ListIcon };
