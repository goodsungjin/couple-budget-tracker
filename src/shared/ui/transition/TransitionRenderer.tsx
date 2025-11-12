import {
  AnimatePresence,
  type MotionNodeAnimationOptions,
  motion,
} from 'motion/react';
import type { ReactNode } from 'react';

type AnimationType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight';
interface TransitionRendererProps {
  children: ReactNode;
  isOpen: boolean;
  animationDuration?: number; // 애니메이션 시간 (ms)
  className?: string;
  animationType?: AnimationType;

  initial?: MotionNodeAnimationOptions['initial'];
  animate?: MotionNodeAnimationOptions['animate'];
  exit?: MotionNodeAnimationOptions['exit'];
  transition?: MotionNodeAnimationOptions['transition'];

  zIndex?: number;
}

const TransitionRenderer = ({
  children,
  isOpen,
  animationDuration = 300,
  className,
  animationType = 'fade',
  initial,
  animate,
  exit,
  transition,
  zIndex,
}: TransitionRendererProps) => {
  // 기본 애니메이션 설정
  const getDefaultAnimation = (
    type: AnimationType
  ): MotionNodeAnimationOptions => {
    const duration = animationDuration / 1000; // motion은 초 단위 사용

    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration, ease: 'easeInOut' },
        };

      case 'slide':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration, ease: 'easeInOut' },
        };

      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
          transition: { duration, ease: 'easeInOut' },
        };

      case 'slideUp':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
          transition: { duration, ease: 'easeInOut' },
        };

      case 'slideDown':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration, ease: 'easeInOut' },
        };

      case 'slideLeft':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 20 },
          transition: { duration, ease: 'easeInOut' },
        };

      case 'slideRight':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration, ease: 'easeInOut' },
        };

      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration, ease: 'easeInOut' },
        };
    }
  };

  const animationConfig = getDefaultAnimation(animationType);

  // 사용자 정의 애니메이션이 있으면 우선 사용
  const finalInitial = initial || animationConfig.initial;
  const finalAnimate = animate || animationConfig.animate;
  const finalExit = exit || animationConfig.exit;
  const finalTransition = transition || animationConfig.transition;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={className}
          initial={finalInitial}
          animate={finalAnimate}
          exit={finalExit}
          transition={finalTransition}
          style={{ zIndex: zIndex ? zIndex : undefined }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { TransitionRenderer };
