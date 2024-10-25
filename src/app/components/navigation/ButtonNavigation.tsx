'use client'
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import AppButton from '@/components/buttons/AppButton';

interface ButtonNavigationProps {
  text: string;
  routePath: string;
  style?: string;
}

const ButtonNavigation = ({ text, routePath, style }: ButtonNavigationProps) => {
  const router = useRouter();

  const handleOnClick = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <AppButton text={text} style={style} onClick={() => handleOnClick(routePath)} />
  );
};

export default ButtonNavigation;
