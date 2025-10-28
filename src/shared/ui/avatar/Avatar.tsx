import type { RecipeVariants } from '@vanilla-extract/recipes';
import { useState } from 'react';
import { Flex } from '../flex/Flex';
import * as css from './Avatar.css';

interface Props {
  alt: string;
  url?: string;
  fallback: React.ReactNode;
}

const Avatar = ({
  url,
  alt,
  fallback,
  size = 'small',
}: Props & RecipeVariants<typeof css.base>) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Flex
      className={css.base({ size })}
      alignItems="center"
      justifyContent="center"
    >
      {url && !imageError && (
        <img
          src={url}
          alt={alt}
          className={css.image}
          onError={handleImageError}
        />
      )}

      {(!url || imageError) && fallback}
    </Flex>
  );
};

export { Avatar };
