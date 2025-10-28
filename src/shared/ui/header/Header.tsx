import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserProfileQueryOptions } from '../../../entities/auth/apis/getUserProfileQueryOptions';
import { getLedgerListQueryOptions } from '../../../entities/ledger/apis/getLedgerLitsQueryOptions';
import { vars } from '../../lib/vanilla-extract';
import { Avatar } from '../avatar/Avatar';
import { Flex } from '../flex/Flex';
import { BellIcon } from '../icon/Bell';
import { ChevronDown } from '../icon/ChevronDown';
import { Text } from '../text/Text';
import * as css from './Header.css';

interface Props {
  ledgerId?: string;
}

const Header = ({ ledgerId }: Props) => {
  const { data: profile } = useQuery(getUserProfileQueryOptions());

  const queryClient = useQueryClient();
  const ledgers = queryClient.getQueryData(
    getLedgerListQueryOptions().queryKey
  );
  const currentLedger = ledgers?.find((ledger) => ledger.id === ledgerId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLedgerClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Flex
      className={css.base}
      justifyContent="between"
      alignItems="center"
      px="x8"
    >
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLedgerClick}
          style={{ cursor: 'pointer' }}
        >
          <Flex gap="x3" alignItems="center">
            <Flex gap="x1_5" alignItems="center">
              <Text typography="h1Bold" color="gray100">
                {currentLedger?.name}
              </Text>

              {!currentLedger?.purchase_id && (
                <Flex className={css.label} px="x1_5" py="x1">
                  <Text typography="description" color="gray60">
                    기본
                  </Text>
                </Flex>
              )}
            </Flex>

            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={24} color={vars.color.gray100} />
            </motion.div>
          </Flex>
        </motion.div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={css.dropdown}
            >
              {ledgers?.map((ledger, index) => (
                <motion.div
                  key={ledger.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  whileHover={{ backgroundColor: vars.color.gray10 }}
                  className={css.dropdownItem}
                  onClick={() => {
                    // 여기에 ledger 선택 로직 추가
                    setIsDropdownOpen(false);
                    navigate(`/${ledger.id}/dashboard`, {
                      replace: true,
                    });
                  }}
                >
                  <Text typography="body1Bold" color="gray100">
                    {ledger.name}
                  </Text>
                  {index === 0 && (
                    <Flex className={css.label} px="x1_5" py="x1">
                      <Text typography="description" color="gray60">
                        기본
                      </Text>
                    </Flex>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Flex alignItems="center" gap="x6">
        <BellIcon size={32} color={vars.color.gray90} />

        <Avatar
          size="large"
          url={profile?.avatar_url ?? undefined}
          alt="avatar"
          fallback={profile?.display_name?.at(0) ?? ''}
        />
      </Flex>
    </Flex>
  );
};

export { Header };
