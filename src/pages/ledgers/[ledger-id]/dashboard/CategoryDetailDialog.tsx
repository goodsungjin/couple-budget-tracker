import { useQuery } from '@tanstack/react-query';
import { listTransactions } from '@/shared/apis/transaction';
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
  from: string;
  to: string;
}

const CategoryDetailDialog = ({
  isOpen,
  onClose,
  ledgerId,
  categoryId,
  categoryName,
  from,
  to,
}: Props) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', 'category', ledgerId, categoryId, from, to],
    queryFn: () =>
      listTransactions({
        p_ledger_id: ledgerId,
        p_category_id: categoryId,
        p_from: from,
        p_to: to,
        p_flow: 'expense',
      }),
    enabled: isOpen && !!categoryId,
  });

  if (!isOpen) return null;

  return (
    <Dialog onClickBackdrop={onClose} zIndex={1000}>
      <div className={css.dialogContent}>
        <Flex direction="column" gap="x4" height="100%">
          <Flex alignItems="center" justifyContent="between">
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
        </Flex>
      </div>
    </Dialog>
  );
};

export { CategoryDetailDialog };

