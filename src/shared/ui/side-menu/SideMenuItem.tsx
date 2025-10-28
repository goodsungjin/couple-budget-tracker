import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './SideMenuItem.css';

interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

const SideMenuItem = ({ icon, children, onClick, isActive }: Props) => {
  return (
    <Flex
      alignItems="center"
      height="40px"
      width="100%"
      gap="x1_5"
      className={css.base({ isActive })}
      onClick={onClick}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        width="40px"
        height="40px"
        className={css.icon}
      >
        {icon}
      </Flex>

      <Text typography="body1Bold" color="gray60" className={css.label}>
        {children}
      </Text>
    </Flex>
  );
};

export { SideMenuItem };
