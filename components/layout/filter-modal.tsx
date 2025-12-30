'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { useQuery } from '@tanstack/react-query'
import type { Category } from '@/types/prompt'

export interface FilterState {
  generators: string[]
  categories: string[]
  complexities: string[]
}

interface FilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters?: (filters: FilterState) => void
  initialFilters?: FilterState
}

const generators = ['DALL-E 3', 'Midjourney', 'Stable Diffusion', 'Leonardo AI']
const complexities = ['beginner', 'intermediate', 'advanced']

export function FilterModal({ open, onOpenChange, onApplyFilters, initialFilters }: FilterModalProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [selectedGenerators, setSelectedGenerators] = useState<string[]>(initialFilters?.generators || [])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.categories || [])
  const [selectedComplexities, setSelectedComplexities] = useState<string[]>(initialFilters?.complexities || [])

  // Fetch real categories from database
  const { data: dbCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      const result = await response.json()
      return result.data as Category[]
    },
  })

  useEffect(() => {
    if (initialFilters) {
      setSelectedGenerators(initialFilters.generators)
      setSelectedCategories(initialFilters.categories)
      setSelectedComplexities(initialFilters.complexities)
    }
  }, [initialFilters])

  const toggleGenerator = (generator: string) => {
    setSelectedGenerators((prev) =>
      prev.includes(generator)
        ? prev.filter((g) => g !== generator)
        : [...prev, generator]
    )
  }

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((c) => c !== categorySlug)
        : [...prev, categorySlug]
    )
  }

  const toggleComplexity = (complexity: string) => {
    setSelectedComplexities((prev) =>
      prev.includes(complexity)
        ? prev.filter((c) => c !== complexity)
        : [...prev, complexity]
    )
  }

  const handleClear = () => {
    setSelectedGenerators([])
    setSelectedCategories([])
    setSelectedComplexities([])
  }

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        generators: selectedGenerators,
        categories: selectedCategories,
        complexities: selectedComplexities,
      })
    }
    onOpenChange(false)
  }

  const content = (
    <>
      <div className="space-y-6">
        {/* Generators */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Generator</h3>
          <div className="space-y-3">
            {generators.map((generator) => (
              <label
                key={generator}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={selectedGenerators.includes(generator)}
                  onCheckedChange={() => toggleGenerator(generator)}
                />
                <span className="text-sm text-gray-700">{generator}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Category</h3>
          <div className="space-y-3">
            {dbCategories.map((category) => (
              <label
                key={category.slug}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={selectedCategories.includes(category.slug)}
                  onCheckedChange={() => toggleCategory(category.slug)}
                />
                <span className="text-sm text-gray-700 flex items-center gap-2">
                  {category.icon && <span>{category.icon}</span>}
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">Complexity</h3>
          <div className="space-y-3">
            {complexities.map((complexity) => (
              <label
                key={complexity}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={selectedComplexities.includes(complexity)}
                  onCheckedChange={() => toggleComplexity(complexity)}
                />
                <span className="text-sm text-gray-700 capitalize">{complexity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
        <Button variant="outline" className="flex-1" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="primary" className="flex-1" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">{content}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

