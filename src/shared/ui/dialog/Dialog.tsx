import { Float } from '@/shared/ui/float/Float';
import * as css from './Dialog.css';

interface Props {
  onClickBackdrop: () => void;
  children: React.ReactNode;
}

const Dialog = ({ children, onClickBackdrop }: Props) => {
  return (
    <Float position="fixed" className={css.base}>
      {
        /** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div className={css.backdrop} onClick={onClickBackdrop} />
      }

      <Float placement="middle-center" className={css.content}>
        {children}
      </Float>
    </Float>
  );
};

export { Dialog };
