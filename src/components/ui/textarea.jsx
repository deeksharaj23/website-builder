import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'flex min-h-[110px] w-full resize-none rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

