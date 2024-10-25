
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'base';
}

const Loader = ({ size = 'sm' }: LoaderProps) => {
  return (
    <ImSpinner2
      className={cn(
        'animate-spin',
        size === 'xs' ? 'text-lg' : size === 'sm' ? 'text-2xl' : 'text-4xl'
      )}
    />
  );
};

export default React.memo(Loader);
