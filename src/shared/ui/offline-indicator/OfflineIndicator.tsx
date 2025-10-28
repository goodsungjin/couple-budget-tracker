import { useOfflineSync } from '@/shared/lib/offline/useOfflineSync';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import { useToast } from '@/shared/ui/toast/ToastProvider';
import * as css from './OfflineIndicator.css.ts';

interface Props {
  ledgerId: string;
}

export const OfflineIndicator = ({ ledgerId }: Props) => {
  const { isOnline, isSyncing, getOfflineQueueSize, getFailedTransactions } =
    useOfflineSync(ledgerId);
  const { showToast } = useToast();
  const queueSize = getOfflineQueueSize();
  const failedTransactions = getFailedTransactions();

  if (isOnline && queueSize === 0) {
    return null;
  }

  const handleRetryFailed = () => {
    if (failedTransactions.length > 0) {
      showToast(
        'info',
        `${failedTransactions.length}개의 실패한 거래를 다시 시도합니다.`
      );
    }
  };

  return (
    <div className={css.container}>
      <Flex alignItems="center" gap="x2" px="x4" py="x2">
        {!isOnline ? (
          <>
            <div className={css.offlineIcon}>📡</div>
            <Text typography="body2" color="gray70">
              오프라인 모드
            </Text>
            {queueSize > 0 && (
              <Text typography="body2" color="blue60">
                ({queueSize}개 대기 중)
              </Text>
            )}
          </>
        ) : isSyncing ? (
          <>
            <div className={css.syncingIcon}>🔄</div>
            <Text typography="body2" color="blue60">
              동기화 중...
            </Text>
          </>
        ) : queueSize > 0 ? (
          <>
            <div className={css.syncingIcon}>⏳</div>
            <Text typography="body2" color="blue60">
              {queueSize}개 거래 동기화 대기 중
            </Text>
          </>
        ) : null}

        {failedTransactions.length > 0 && (
          <button
            type="button"
            className={css.retryButton}
            onClick={handleRetryFailed}
          >
            <Text typography="body2" color="red60">
              실패한 거래 재시도 ({failedTransactions.length})
            </Text>
          </button>
        )}
      </Flex>
    </div>
  );
};
