import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { TransitionRenderer } from '@/shared/ui/transition/TransitionRenderer';
import { LedgersSettings } from '@/widgets/ledgers-settings/ui/LedgersSettings';
import { getLedgerMembersQueryOptions } from '../../../entities/ledger/apis/getLedgerMembersQueryOptions';
import { vars } from '../../../shared/lib/vanilla-extract';
import { Avatar } from '../../../shared/ui/avatar/Avatar';
import { AvatarGroup } from '../../../shared/ui/avatar/AvatarGroup';
import { Flex } from '../../../shared/ui/flex/Flex';
import { CalendarIcon } from '../../../shared/ui/icon/CalendarIcon';
import { MenuIcon } from '../../../shared/ui/icon/MenuIcon';
import { PieChartIcon } from '../../../shared/ui/icon/PieChartIcon';
import { SettingsIcon } from '../../../shared/ui/icon/SettingsIcon';
import { SideMenuItem } from '../../../shared/ui/side-menu/SideMenuItem';
import { Text } from '../../../shared/ui/text/Text';
import * as css from './LedgersSideMenu.css';

const SIDE_MENU_ITEM_TYPES_LABELS: Record<SideMenuItemType, string> = {
  MENU: '내역',
  TRANSACTION: '달력',
  DASHBOARD: '대시보드',
  SETTINGS: '설정',
};
const SIDE_MENU_ITEM_TYPES_ICONS: Record<SideMenuItemType, React.ReactNode> = {
  MENU: <MenuIcon color={vars.color.gray60} />,
  TRANSACTION: <CalendarIcon color={vars.color.gray60} />,
  DASHBOARD: <PieChartIcon color={vars.color.gray60} />,
  SETTINGS: <SettingsIcon color={vars.color.gray60} />,
};

type SideMenuItemType = 'MENU' | 'TRANSACTION' | 'DASHBOARD' | 'SETTINGS';

const SIDE_MENU_ITEM_TYPES: SideMenuItemType[] = [
  'MENU',
  'TRANSACTION',
  'DASHBOARD',
  'SETTINGS',
];

interface Props {
  ledgerId: string;
}

const LedgersSideMenu = ({ ledgerId }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: members } = useQuery(getLedgerMembersQueryOptions(ledgerId));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({
    openSettings: 'false',
  });
  const isSettingsOpen = searchParams.get('openSettings') === 'true';

  return (
    <>
      <Flex direction="column" className={css.base}>
        <motion.div
          className={css.motion}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          animate={{
            width: isExpanded ? 'fit-content' : '40px',
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Flex direction="column" gap="x4">
            {SIDE_MENU_ITEM_TYPES.map((type) => (
              <SideMenuItem
                isActive={pathname.includes(type)}
                key={type}
                icon={SIDE_MENU_ITEM_TYPES_ICONS[type]}
                onClick={() => {
                  if (type === 'SETTINGS') {
                    setSearchParams({ openSettings: 'true' });

                    return;
                  }

                  navigate(`/${ledgerId}/${type.toLowerCase()}`);
                }}
              >
                <Text typography="body1Bold" color="gray60">
                  {SIDE_MENU_ITEM_TYPES_LABELS[type]}
                </Text>
              </SideMenuItem>
            ))}
          </Flex>

          <AvatarGroup>
            {members?.map((member) => (
              <Avatar
                key={member?.user_id}
                url={member?.avatar_url ?? undefined}
                alt="avatar"
                fallback={member?.display_name?.at(0) ?? ''}
              />
            ))}
          </AvatarGroup>
        </motion.div>
      </Flex>

      <TransitionRenderer isOpen={isSettingsOpen} zIndex={10}>
        <LedgersSettings close={() => setSearchParams()} />
      </TransitionRenderer>
    </>
  );
};

export { LedgersSideMenu };
