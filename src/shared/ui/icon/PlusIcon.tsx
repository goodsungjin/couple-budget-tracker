interface Props {
  size?: number;
  color?: string;
}

const IconPlus = ({ size = 16, color = '#666666' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Plus Icon</title>
      <path
        d="M8.49967 3.3335V12.6668M3.83301 8.00016H13.1663"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { IconPlus };
