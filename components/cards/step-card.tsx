interface StepCardProps {
  number: string
  title: string
  description: string
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl animate-pulse-slow">
        {number}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-4">
        {title}
      </h3>
      <p className="text-sm md:text-sm text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

