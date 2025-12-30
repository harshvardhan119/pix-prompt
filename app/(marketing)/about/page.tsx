import { Card, CardContent } from '@/components/ui/card'

const values = [
  {
    icon: '🎯',
    title: 'Quality First',
    description: 'Every prompt is tested and verified before being added to our library.',
  },
  {
    icon: '🚀',
    title: 'Always Improving',
    description: 'We continuously update our collection with new prompts and features.',
  },
  {
    icon: '🤝',
    title: 'Community Driven',
    description: 'Built by creators, for creators. Your feedback shapes our platform.',
  },
]

const team = [
  { name: 'Alex Johnson', title: 'Founder & CEO', avatar: 'AJ' },
  { name: 'Sarah Chen', title: 'Head of Design', avatar: 'SC' },
  { name: 'Mike Rodriguez', title: 'Lead Developer', avatar: 'MR' },
  { name: 'Emma Wilson', title: 'Community Manager', avatar: 'EW' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20 md:py-24 px-4 md:px-6 lg:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            About PixPrompt
          </h1>
          <p className="text-base md:text-lg text-white/90">
            We're on a mission to make AI art creation accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 px-4 md:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            PixPrompt was born from a simple idea: AI art creation shouldn't be complicated. 
            We curate and test thousands of prompts so you can focus on creating amazing visuals 
            instead of spending hours crafting the perfect prompt. Our goal is to empower creators 
            of all skill levels to bring their ideas to life with AI.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 px-4 md:px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center">
                <CardContent className="p-0">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 px-4 md:px-6 lg:px-10 bg-orange-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600 font-bold text-xl">
                  {member.avatar}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-700">
                  {member.title}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

