import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  number: string | number
  label: string
}

export function StatCard({ number, label }: StatCardProps) {
  return (
    <Card hover className="p-8 text-center">
      <CardContent className="p-0">
        <div className="text-4xl md:text-3xl font-bold text-orange-500 mb-2">
          {number}
        </div>
        <div className="text-sm text-gray-700 leading-relaxed">
          {label}
        </div>
      </CardContent>
    </Card>
  )
}

