import { useState } from 'react';
import { AddCategory } from '@/features/settings-category-management/ui/AddCategory';
import { Income } from '@/features/settings-category-management/ui/Income';
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
      <Section title="카테고리">
        <Tab
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
              content: <div>지출</div>,
            },
            {
              id: 'transfer',
              label: '이체',
              content: <div>이체</div>,
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
