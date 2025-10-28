import React from 'react';
import { Flex } from '../flex/Flex';
import * as css from './AvatarGroup.css';

interface Props {
  children: React.ReactNode;
  max?: number;
}

const AvatarGroup = ({ children, max = 3 }: Props) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);

  return (
    <Flex className={css.container} alignItems="center">
      {visibleChildren.map((child, index) => (
        <div key={`avatar-${index}`} className={css.avatarWrapper}>
          {child}
        </div>
      ))}
    </Flex>
  );
};

export { AvatarGroup };
