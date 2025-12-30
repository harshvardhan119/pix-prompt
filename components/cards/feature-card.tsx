import type { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  badge?: string
}

export function FeatureCard({ icon, title, description, badge }: FeatureCardProps) {
  return (
    <Card hover className="p-8">
      <CardContent className="p-0">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 mb-4">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          {description}
        </p>
        {badge && (
          <span className="text-xs font-bold text-orange-500">
            {badge}
          </span>
        )}
      </CardContent>
    </Card>
  )
}

