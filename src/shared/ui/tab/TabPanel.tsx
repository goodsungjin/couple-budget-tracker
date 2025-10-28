import * as css from './Tab.css';

export interface TabPanelProps {
  id: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

const TabPanel = ({
  id,
  children,
  isActive = false,
  className,
}: TabPanelProps) => {
  return (
    <div
      id={`tabpanel-${id}`}
      className={`${css.tabPanel} ${className || ''}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      hidden={!isActive}
    >
      {children}
    </div>
  );
};

export { TabPanel };
