import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getUserProfileQueryOptions } from '@/entities/auth/apis/getUserProfileQueryOptions';
import { getLedgerListQueryOptions } from '@/entities/ledger/apis/getLedgerLitsQueryOptions';
import { getLedgerMembersQueryOptions } from '@/entities/ledger/apis/getLedgerMembersQueryOptions';
import { MemberItem } from '@/features/settings-default-management/ui/MemberItem';
import { Section } from '@/features/settings-default-management/ui/Section';
import { SubSection } from '@/features/settings-default-management/ui/SubSection';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Flex } from '@/shared/ui/flex/Flex';
import { TextField } from '@/shared/ui/input/TextField';
import * as css from './DefaultManagement.css';

interface Props {
  ledgerId: string;
}

const DefaultManagement = ({ ledgerId }: Props) => {
  const { data: userProfile } = useSuspenseQuery(getUserProfileQueryOptions());
  const { data: ledgers } = useSuspenseQuery(getLedgerListQueryOptions());
  const { data: ledgerMembers } = useSuspenseQuery(
    getLedgerMembersQueryOptions(ledgerId)
  );
  const ledgerMeta = ledgers.find((ledger) => ledger.id === ledgerId);
  const owners = ledgerMembers.find((member) => member.role === 'owner');
  const members = ledgerMembers.filter((member) => member.role !== 'owner');

  if (!ledgerMeta) {
    throw new Error('Ledger not found');
  }
  if (!owners) {
    throw new Error('Owners not found');
  }

  const [name, setName] = useState(ledgerMeta.name);

  return (
    <Flex direction="column" flex={1}>
      <Flex
        direction="column"
        flex={1}
        px="x10"
        py="x10"
        gap="x10"
        className={css.body}
      >
        <Section title="기본 설정">
          <SubSection title="가계부 이름" gap="x2">
            <TextField
              value={name}
              onChange={setName}
              placeholder="가계부 이름을 입력해 주세요"
              name="name"
              required={true}
              type="text"
            />
          </SubSection>
        </Section>

        <Section title="멤버 관리">
          <SubSection title="관리자" gap="x2">
            <MemberItem
              thumbnailUrl={owners.avatar_url}
              displayName={owners.display_name}
              email={owners.email}
              isMe={owners.user_id === userProfile.id}
              actionButton={{ text: '변경', onClick: () => {} }}
            />
          </SubSection>

          <SubSection title="참여 멤버" gap="x3">
            <Flex direction="column" gap="x2">
              {members.map((member) => (
                <MemberItem
                  key={member.user_id}
                  thumbnailUrl={member.avatar_url}
                  displayName={member.display_name}
                  email={member.email}
                  isMe={member.user_id === userProfile.id}
                  actionButton={{ text: '제거', onClick: () => {} }}
                />
              ))}
            </Flex>
          </SubSection>
        </Section>
      </Flex>

      <Flex className={css.footer} justifyContent="end" py="x4" px="x6">
        <BoxButton size="large" variant="primary" onClick={() => {}}>
          저장하기
        </BoxButton>
      </Flex>
    </Flex>
  );
};

export { DefaultManagement };
