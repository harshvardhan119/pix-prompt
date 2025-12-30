interface MetadataCardProps {
  icon: string
  label: string
  value: string
  description?: string
}

export function MetadataCard({ icon, label, value, description }: MetadataCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center text-lg">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-700 mb-1">{label}</p>
          <p className="text-sm font-bold text-orange-500">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

