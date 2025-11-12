import { useState } from 'react';
import { AddCategory } from '@/features/settings-category-management/ui/AddCategory';
import { Expense } from '@/features/settings-category-management/ui/Expense';
import { Income } from '@/features/settings-category-management/ui/Income';
import { Saving } from '@/features/settings-category-management/ui/Saving';
import { Section } from '@/features/settings-default-management/ui/Section';
import { Flex } from '@/shared/ui/flex/Flex';
import { Tab } from '@/shared/ui/tab/Tab';
import * as css from './CategoryManagement.css';

interface Props {
  ledgerId: string;
}

const CategoryManagement = ({ ledgerId }: Props) => {
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleBack = () => {
    setShowAddCategory(false);
  };
  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  return (
    <Flex px="x10" py="x10" flex={1} className={css.base}>
      <Section title="카테고리" className={css.tabContainer}>
        <Tab
          className={css.tabList}
          tabs={[
            {
              id: 'income',
              label: '수입',
              content: (
                <Income ledgerId={ledgerId} onAddCategory={handleAddCategory} />
              ),
            },
            {
              id: 'expense',
              label: '지출',
              content: (
                <Expense
                  ledgerId={ledgerId}
                  onAddCategory={handleAddCategory}
                />
              ),
            },
            {
              id: 'transfer',
              label: '이체',
              content: (
                <Saving ledgerId={ledgerId} onAddCategory={handleAddCategory} />
              ),
            },
          ]}
          defaultActiveTab="income"
        />
      </Section>

      <AddCategory
        isOpen={showAddCategory}
        ledgerId={ledgerId}
        onBack={handleBack}
      />
    </Flex>
  );
};

export { CategoryManagement };
