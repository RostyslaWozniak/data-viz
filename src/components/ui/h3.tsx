/** @format */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type H2Props = {
  children: ReactNode;
  className?: string;
};
export default function H3({ children, className }: H2Props) {
  return (
    <h3
      className={cn(
        'text-center text-2xl font-bold text-gray-700 md:text-3xl ',
        className
      )}>
      {children}
    </h3>
  );
}
