/** @format */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  className?: string;
};
export default function Text({ children, className }: TextProps) {
  return <p className={cn('text-lg md:text-xl', className)}>{children}</p>;
}
