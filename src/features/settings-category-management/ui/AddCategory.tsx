import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Section } from '@/features/settings-default-management/ui/Section';
import { createTopCategory } from '@/shared/apis/categories';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Flex } from '@/shared/ui/flex/Flex';
import { IconChevronLeft } from '@/shared/ui/icon/IconChevronLeft';
import { TextField } from '@/shared/ui/input/TextField';
import { TransitionRenderer } from '@/shared/ui/transition/TransitionRenderer';
import * as css from './AddCategory.css';

interface Props {
  ledgerId: string;
  onBack: () => void;
  isOpen: boolean;
}

const AddCategory = ({ ledgerId, onBack, isOpen }: Props) => {
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createTopCategoryMutation } = useMutation({
    mutationFn: createTopCategory,
    onSuccess: () => {
      setIsSubmitting(false);
      onBack(); // 성공 후 뒤로가기
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = () => {
    if (!categoryName.trim()) return;

    setIsSubmitting(true);
    createTopCategoryMutation({
      ledgerId,
      name: categoryName.trim(),
      flowType: 'income',
    });
  };

  return (
    <TransitionRenderer
      isOpen={isOpen}
      animationType="slideLeft"
      animationDuration={300}
      className={css.base}
    >
      <Flex px="x10" py="x10" height="100%" direction="column" gap="x10">
        <Section
          title={
            <Flex alignItems="center" gap="x1_5" onClick={onBack}>
              <IconChevronLeft />
              카테고리 추가
            </Flex>
          }
        >
          <Flex direction="column" gap="x6">
            <TextField
              name="categoryName"
              required
              type="text"
              value={categoryName}
              onChange={(value) => setCategoryName(value)}
              placeholder="카테고리 이름을 입력하세요"
            />

            <BoxButton onClick={handleSubmit} size="large" variant="primary">
              {isSubmitting ? '추가 중...' : '카테고리 추가'}
            </BoxButton>
          </Flex>
        </Section>
      </Flex>
    </TransitionRenderer>
  );
};

export { AddCategory };
