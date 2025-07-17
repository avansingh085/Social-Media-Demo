// components/ui/input.tsx
import { cn } from '@/app/lib/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'ghost';
  error?: boolean;
  inputSize?: 'sm' | 'default' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, inputSize = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full h-12 px-2 rounded-lg border bg-background text-sm',
          'placeholder:text-muted-foreground/60 focus-visible:outline-none',
          'transition-colors duration-200 ease-in-out',
          'disabled:cursor-not-allowed disabled:opacity-50',
        
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };