import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ds-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0 active:scale-[1.0]',
  {
    variants: {
      variant: {
        default:
          'bg-[hsl(var(--primary)/0.86)] text-[hsl(var(--primary-foreground))] shadow-[var(--ds-shadow-2),var(--ds-glow-blue)] hover:bg-[hsl(var(--primary)/0.78)]',
        outline:
          'border border-[hsl(var(--border))] bg-[rgba(255,255,255,0.10)] text-[hsl(var(--foreground))] hover:border-[rgba(255,255,255,0.28)] hover:bg-[rgba(255,255,255,0.14)] shadow-[var(--ds-shadow-2)]',
        ghost:
          'text-[rgba(17,24,39,0.72)] hover:bg-[rgba(255,255,255,0.14)] hover:text-[hsl(var(--foreground))]',
        link: 'text-[hsl(var(--primary))] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
