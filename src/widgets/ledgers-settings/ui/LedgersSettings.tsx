import { motion } from 'motion/react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { vars } from '@/shared/lib/vanilla-extract';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import { CategoryManagement } from '@/widgets/settings/ui/CategoryManagement';
import { DefaultManagement } from '@/widgets/settings/ui/DefaultManagement';
import { PaymentMethod } from '@/widgets/settings/ui/PaymentMethod';
import * as css from './LedgersSettings.css';

type SideItem = 'DEFAULT' | 'CATEGORY' | 'PAYMENT_METHOD' | 'SETTINGS';

const SIDE_ITEMS: SideItem[] = [
  'DEFAULT',
  'CATEGORY',
  'PAYMENT_METHOD',
  'SETTINGS',
];
const SIDE_ITEMS_LABELS: Record<SideItem, string> = {
  DEFAULT: '기본 설정',
  CATEGORY: '카테고리',
  PAYMENT_METHOD: '거래 수단',
  SETTINGS: '설정',
};

interface Props {
  close: () => void;
}
const LedgersSettings = ({ close }: Props) => {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  const [selectedSideItem, setSelectedSideItem] = useState<SideItem>(
    SIDE_ITEMS[0]
  );

  return (
    <Dialog onClickBackdrop={close} zIndex={10}>
      <Flex className={css.base}>
        <Flex
          className={css.side}
          direction="column"
          px="x3"
          py="x6"
          gap="x1_5"
        >
          {SIDE_ITEMS.map((item) => (
            <motion.div
              key={item}
              className={css.sideItem}
              onClick={() => setSelectedSideItem(item)}
              animate={{
                backgroundColor:
                  selectedSideItem === item
                    ? vars.color.gray10
                    : vars.color.gray5,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Text typography="body1" color="gray90">
                {SIDE_ITEMS_LABELS[item]}
              </Text>
            </motion.div>
          ))}
        </Flex>

        <Flex className={css.body} direction="column" height="100%" flex={1}>
          {selectedSideItem === 'DEFAULT' && (
            <DefaultManagement ledgerId={ledgerId || ''} />
          )}

          {selectedSideItem === 'CATEGORY' && (
            <CategoryManagement ledgerId={ledgerId || ''} />
          )}

          {selectedSideItem === 'PAYMENT_METHOD' && (
            <PaymentMethod ledgerId={ledgerId || ''} />
          )}
        </Flex>
      </Flex>
    </Dialog>
  );
};

export { LedgersSettings };
