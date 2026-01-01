import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Expense } from '@/features/settings-category-management/ui/Expense';
import { Saving } from '@/features/settings-category-management/ui/Saving';
import { Section } from '@/features/settings-default-management/ui/Section';
import { AddFixedExpense } from '@/features/settings-fixed-expense/ui/AddFixedExpense';
import {
  EditFixedExpense,
  type RecurringSeries,
} from '@/features/settings-fixed-expense/ui/EditFixedExpense';
import { SettingsFixedExpenseAllTab } from '@/features/settings-fixed-expense/ui/SettingsFixedExpenseAllTab';
import { listRecurringSeries } from '@/shared/apis/recurringTransaction';
import { Flex } from '@/shared/ui/flex/Flex';
import { Tab } from '@/shared/ui/tab/Tab';
import * as css from './CategoryManagement.css';

interface Props {
  ledgerId: string;
}

const FixedExpense = ({ ledgerId }: Props) => {
  const [showAddFixedExpense, setShowAddFixedExpense] = useState(false);
  const [showEditFixedExpense, setShowEditFixedExpense] = useState(false);
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);

  const { data: recurringSeries } = useQuery({
    queryKey: ['recurringSeries', 'list', ledgerId],
    queryFn: () => listRecurringSeries({ ledgerId }),
  });

  const selectedSeries: RecurringSeries | null =
    selectedSeriesId && recurringSeries
      ? recurringSeries.find((s) => s.id === selectedSeriesId) || null
      : null;

  const handleBack = () => {
    setShowAddFixedExpense(false);
    setShowEditFixedExpense(false);
    setSelectedSeriesId(null);
  };

  const handleAddFixedExpense = () => {
    setShowAddFixedExpense(true);
  };

  const handleEditFixedExpense = (seriesId: string) => {
    setSelectedSeriesId(seriesId);
    setShowEditFixedExpense(true);
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
                  onEditFixedExpense={handleEditFixedExpense}
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

      <EditFixedExpense
        isOpen={showEditFixedExpense}
        onBack={handleBack}
        ledgerId={ledgerId}
        series={selectedSeries}
      />
    </Flex>
  );
};

export { FixedExpense };
