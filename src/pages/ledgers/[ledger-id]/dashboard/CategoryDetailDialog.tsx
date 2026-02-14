import { useQuery } from '@tanstack/react-query';
import {
  type ListTxResponse,
  listTransactions,
  listTransactionsByParentCategory,
} from '@/shared/apis/transaction';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import { TransactionListView } from '@/widgets/transaction/ui/TransactionListView';
import * as css from './CategoryDetailDialog.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ledgerId: string;
  categoryId: string;
  categoryName: string;
  categoryLevel: string;
  from: string;
  to: string;
}

const CategoryDetailDialog = ({
  isOpen,
  onClose,
  ledgerId,
  categoryId,
  categoryName,
  categoryLevel,
  from,
  to,
}: Props) => {
  const isParentCategory = categoryLevel === 'parent';

  const { data: transactions, isLoading } = useQuery({
    queryKey: [
      'transactions',
      'category',
      ledgerId,
      categoryId,
      categoryLevel,
      from,
      to,
    ],
    queryFn: async () => {
      if (isParentCategory) {
        // parent 카테고리인 경우: RPC 함수 사용
        return listTransactionsByParentCategory({
          ledgerId,
          parentCategoryId: categoryId,
          from,
          to,
          flow: 'expense',
        });
      } else {
        // leaf 카테고리인 경우: 기존 방식 사용
        return listTransactions({
          p_ledger_id: ledgerId,
          p_category_id: categoryId,
          p_from: from,
          p_to: to,
          p_flow: 'expense',
        });
      }
    },
    enabled: isOpen && !!categoryId,
  });

  if (!isOpen) return null;

  return (
    <Dialog onClickBackdrop={onClose} zIndex={1000}>
      <div className={css.dialogContent}>
        <div className={css.contentWrapper}>
          <Flex
            alignItems="center"
            justifyContent="between"
            className={css.headerWrapper}
          >
            <Text typography="h2" color="gray90">
              {categoryName} 상세 내역
            </Text>
            <button
              type="button"
              onClick={onClose}
              className={css.closeButton}
              aria-label="닫기"
            >
              ✕
            </button>
          </Flex>

          <div className={css.listContainer}>
            {isLoading ? (
              <Flex justifyContent="center" alignItems="center" py="x10">
                <Text typography="body1" color="gray60">
                  로딩 중...
                </Text>
              </Flex>
            ) : !transactions || transactions.length === 0 ? (
              <Flex justifyContent="center" alignItems="center" py="x10">
                <Text typography="body1" color="gray60">
                  거래 내역이 없습니다.
                </Text>
              </Flex>
            ) : (
              <TransactionListView
                transactions={transactions}
                onClickTransaction={() => {
                  // 거래 내역 클릭 시 동작 (필요시 구현)
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export { CategoryDetailDialog };
