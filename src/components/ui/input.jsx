import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.10)] px-3 py-1 text-sm text-[hsl(var(--foreground))] shadow-[var(--ds-shadow-2)] placeholder:text-[rgba(17,24,39,0.55)] ds-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(98,129,255,0.55)] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
