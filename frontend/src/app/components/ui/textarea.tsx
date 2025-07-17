// components/ui/textarea.tsx
import { cn } from '@/app/lib/utils';
import * as React from 'react';

export interface TextareaProps 
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: 'default' | 'ghost';
    error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error = false, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    'flex min-h-[100px] w-full rounded-lg border bg-background px-4 py-3 text-sm',
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
Textarea.displayName = 'Textarea';

export { Textarea };