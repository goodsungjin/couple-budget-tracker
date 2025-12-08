import { useState } from 'react';
import { Expense } from '@/features/settings-category-management/ui/Expense';
import { Saving } from '@/features/settings-category-management/ui/Saving';
import { Section } from '@/features/settings-default-management/ui/Section';
import { AddFixedExpense } from '@/features/settings-fixed-expense/ui/AddFixedExpense';
import { SettingsFixedExpenseAllTab } from '@/features/settings-fixed-expense/ui/SettingsFixedExpenseAllTab';
import { Flex } from '@/shared/ui/flex/Flex';
import { Tab } from '@/shared/ui/tab/Tab';
import * as css from './CategoryManagement.css';

interface Props {
  ledgerId: string;
}

const FixedExpense = ({ ledgerId }: Props) => {
  const [showAddFixedExpense, setShowAddFixedExpense] = useState(false);

  const handleBack = () => {
    setShowAddFixedExpense(false);
  };
  const handleAddFixedExpense = () => {
    setShowAddFixedExpense(true);
  };

  return (
    <Flex px="x10" py="x10" flex={1} className={css.base}>
      <Section title="고정 지출" className={css.tabContainer}>
        <Tab
          className={css.tabList}
          defaultActiveTab="all"
          tabs={[
            {
              id: 'all',
              label: '전체',
              content: (
                <SettingsFixedExpenseAllTab
                  ledgerId={ledgerId}
                  onAddFixedExpense={handleAddFixedExpense}
                />
              ),
            },
            {
              id: 'expense',
              label: '지출',
              content: (
                <Expense
                  ledgerId={ledgerId}
                  onAddCategory={handleAddFixedExpense}
                />
              ),
            },
            {
              id: 'transfer',
              label: '이체',
              content: (
                <Saving
                  ledgerId={ledgerId}
                  onAddCategory={handleAddFixedExpense}
                />
              ),
            },
          ]}
        />
      </Section>

      <AddFixedExpense
        isOpen={showAddFixedExpense}
        onBack={handleBack}
        ledgerId={ledgerId}
      />
    </Flex>
  );
};

export { FixedExpense };
