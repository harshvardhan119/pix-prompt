'use client'

import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCopy } from '@/lib/hooks/use-copy'

interface CopyButtonProps {
  text: string
  variant?: 'secondary' | 'primary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export function CopyButton({ text, variant = 'secondary', size = 'sm', className }: CopyButtonProps) {
  const { copied, copy } = useCopy()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(text)}
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </>
      )}
    </Button>
  )
}

