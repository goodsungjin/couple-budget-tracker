import { useEffect, useState } from 'react';
import { Text } from '@/shared/ui/text/Text';
import * as css from './Toast.css';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({ id, type, message, duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // 애니메이션 완료 후 제거
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return css.successToast;
      case 'error':
        return css.errorToast;
      case 'info':
        return css.infoToast;
      default:
        return css.infoToast;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      className={`${css.toast} ${getToastStyle()}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'all 0.3s ease-out',
      }}
    >
      <div className={css.toastIcon}>
        <Text typography="body2" color="inherit">
          {getIcon()}
        </Text>
      </div>
      <div className={css.toastContent}>
        <Text typography="body2" color="inherit">
          {message}
        </Text>
      </div>
      <button
        type="button"
        className={css.toastCloseButton}
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        aria-label="닫기"
      >
        <Text typography="body2" color="inherit">
          ×
        </Text>
      </button>
    </div>
  );
};

export { Toast };
