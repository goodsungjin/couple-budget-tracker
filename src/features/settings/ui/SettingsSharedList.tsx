import { Flex } from '@/shared/ui/flex/Flex';
import { IconPencel } from '@/shared/ui/icon/IconPencel';
import { Text } from '@/shared/ui/text/Text';
import * as css from './SettingsSharedList.css';

interface Item {
  id: string;
  label: string;
  thumbnailUrl: string;
}

interface Props {
  list?: Item[];
  onClick?: (id: string) => void;
}
const SettingsSharedList = ({ list, onClick }: Props) => {
  return (
    <ul className={css.ul}>
      {list?.map((item) => (
        <li key={item.id} onClick={() => onClick?.(item.id)} className={css.li}>
          <Flex
            gap="x3"
            py="x1"
            px="x4"
            alignItems="center"
            justifyContent="between"
          >
            <Flex alignItems="center" gap="x2">
              <div className={css.thumbnail} />

              <Text typography="body1" color="gray60">
                {item.label}
              </Text>
            </Flex>

            <div className={css.pencel}>
              <IconPencel />
            </div>
          </Flex>
        </li>
      ))}
    </ul>
  );
};

export { SettingsSharedList };
