import { Component, type ReactNode } from 'react';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './ErrorBoundary.css.ts';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    this.setState({
      error,
      errorInfo,
    });

    // 에러 로깅
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // 외부 에러 리포팅 서비스에 전송
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={css.container}>
          <Flex direction="column" alignItems="center" gap="x6" px="x8" py="x8">
            <div className={css.errorIcon}>⚠️</div>

            <Flex direction="column" alignItems="center" gap="x3">
              <Text typography="h2" color="gray100">
                문제가 발생했습니다
              </Text>
              <Text typography="body1" color="gray70">
                예상치 못한 오류가 발생했습니다. 다시 시도하거나 페이지를
                새로고침해주세요.
              </Text>
            </Flex>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className={css.errorDetails}>
                <Text typography="body2" color="red60">
                  {this.state.error.message}
                </Text>
                <pre className={css.errorStack}>{this.state.error.stack}</pre>
              </div>
            )}

            <Flex gap="x3">
              <BoxButton
                variant="secondary"
                size="large"
                onClick={this.handleRetry}
              >
                다시 시도
              </BoxButton>

              <BoxButton
                variant="primary"
                size="large"
                onClick={this.handleReload}
              >
                페이지 새로고침
              </BoxButton>
            </Flex>
          </Flex>
        </div>
      );
    }

    return this.props.children;
  }
}
