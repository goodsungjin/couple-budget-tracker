import { type ReactNode, useState } from 'react';
import * as css from './Tab.css';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  variant?: 'default' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const Tab = ({
  tabs,
  defaultActiveTab,
  variant = 'default',
  onTabChange,
  className,
}: TabProps) => {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || tabs[0]?.id || ''
  );

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;

    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={`${css.tabContainer} ${className || ''}`}>
      <div className={css.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={css.tabButton({
              variant,
              isActive: activeTab === tab.id,
            })}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            disabled={tab.disabled}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={css.tabPanel}>{activeTabContent}</div>
    </div>
  );
};

export { Tab };
