import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { PageSettings } from '@/pages/settings/PageSettings';
import { TransitionRenderer } from '@/shared/ui/transition/TransitionRenderer';
import { getLedgerMembersQueryOptions } from '../../../entities/ledger/apis/getLedgerMembersQueryOptions';
import { vars } from '../../lib/vanilla-extract';
import { Avatar } from '../avatar/Avatar';
import { AvatarGroup } from '../avatar/AvatarGroup';
import { Flex } from '../flex/Flex';
import { CalendarIcon } from '../icon/CalendarIcon';
import { MenuIcon } from '../icon/MenuIcon';
import { PieChartIcon } from '../icon/PieChartIcon';
import { SettingsIcon } from '../icon/SettingsIcon';
import { Text } from '../text/Text';
import * as css from './SideMenu.css';
import { SideMenuItem } from './SideMenuItem';

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

const SideMenu = ({ ledgerId }: Props) => {
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

      <TransitionRenderer isOpen={isSettingsOpen}>
        <PageSettings close={() => setSearchParams()} />
      </TransitionRenderer>
    </>
  );
};

export { SideMenu };
