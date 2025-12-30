import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const categories = [
  {
    id: 'cat-dalle3',
    name: 'DALL-E 3',
    slug: 'dalle-3',
    description: 'Optimized prompts for OpenAI\'s DALL-E 3 image generation model',
    icon: '🎨',
    gradientStart: '#FF7A59',
    gradientEnd: '#FF6A40',
  },
  {
    id: 'cat-midjourney',
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'Professional prompts designed for Midjourney AI art generation',
    icon: '🖼️',
    gradientStart: '#3B82F6',
    gradientEnd: '#2563EB',
  },
  {
    id: 'cat-stablediffusion',
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: 'High-quality prompts for Stable Diffusion and SDXL models',
    icon: '🌟',
    gradientStart: '#10B981',
    gradientEnd: '#059669',
  },
  {
    id: 'cat-leonardo',
    name: 'Leonardo AI',
    slug: 'leonardo-ai',
    description: 'Curated prompts for Leonardo AI creative generation',
    icon: '✨',
    gradientStart: '#8B5CF6',
    gradientEnd: '#7C3AED',
  },
]

// Generate diverse prompts programmatically
function generatePrompts() {
  const promptTemplates = [
    // Landscapes & Nature
    { title: 'Mountain Sunset Vista', prompt: 'Majestic mountain range at sunset, golden hour lighting, clouds catching light, vast valley below, dramatic sky, nature photography, high resolution', category: 0, complexity: 'beginner', tags: ['landscape', 'mountain', 'sunset', 'nature'] },
    { title: 'Tropical Beach Paradise', prompt: 'Crystal clear turquoise water, white sand beach, palm trees swaying, tropical paradise, blue sky, ultra realistic, vacation vibes', category: 1, complexity: 'beginner', tags: ['beach', 'tropical', 'paradise', 'ocean'] },
    { title: 'Misty Forest Morning', prompt: 'Dense forest shrouded in morning mist, rays of sunlight breaking through trees, atmospheric, peaceful, nature photography style', category: 2, complexity: 'intermediate', tags: ['forest', 'mist', 'morning', 'nature'] },

    // Urban & Architecture
    { title: 'Modern Architecture Marvel', prompt: 'Contemporary modern architecture, glass and steel, clean lines, minimalist design, blue sky reflection, architectural photography, sharp details', category: 0, complexity: 'intermediate', tags: ['architecture', 'modern', 'building', 'urban'] },
    { title: 'Neon Tokyo Street', prompt: 'Busy Tokyo street at night, neon signs, crowds of people, wet reflections on pavement, urban photography, vibrant colors, cinematic', category: 1, complexity: 'advanced', tags: ['tokyo', 'neon', 'street', 'urban', 'night'] },
    { title: 'Rustic European Village', prompt: 'Charming European village, cobblestone streets, old architecture, flower boxes on windows, warm afternoon light, travel photography', category: 3, complexity: 'beginner', tags: ['europe', 'village', 'architecture', 'charming'] },

    // Fantasy & Sci-Fi
    { title: 'Dragon in Mountain Lair', prompt: 'Massive dragon resting in cave, treasure hoard, glowing eyes, scales reflecting light, fantasy art, epic scene, detailed', category: 2, complexity: 'advanced', tags: ['dragon', 'fantasy', 'cave', 'epic'] },
    { title: 'Space Station Corridor', prompt: 'Futuristic space station interior, metallic corridors, blue ambient lighting, sci-fi, high-tech panels, cinematic composition', category: 0, complexity: 'intermediate', tags: ['space', 'scifi', 'futuristic', 'station'] },
    { title: 'Magical Wizard Tower', prompt: 'Tall wizard tower reaching into clouds, magical energy swirling around, mystical atmosphere, fantasy landscape, dramatic sky', category: 1, complexity: 'intermediate', tags: ['wizard', 'magic', 'tower', 'fantasy'] },

    // Characters & Portraits
    { title: 'Warrior Princess Portrait', prompt: 'Strong female warrior in ornate armor, determined expression, detailed costume, fantasy character art, dramatic lighting, high quality', category: 3, complexity: 'advanced', tags: ['warrior', 'character', 'fantasy', 'portrait'] },
    { title: 'Cyberpunk Hacker Character', prompt: 'Cyberpunk character with neon hair, tech implants, futuristic clothing, city background, character design, detailed, vibrant colors', category: 0, complexity: 'advanced', tags: ['cyberpunk', 'character', 'hacker', 'futuristic'] },
    { title: 'Victorian Era Gentleman', prompt: 'Dignified gentleman in Victorian clothing, top hat, monocle, detailed period costume, portrait photography style, elegant', category: 2, complexity: 'intermediate', tags: ['victorian', 'portrait', 'historical', 'gentleman'] },

    // Abstract & Artistic
    { title: 'Fluid Paint Swirls', prompt: 'Abstract fluid art, swirling paint, vibrant colors mixing, organic shapes, modern art, high contrast, artistic composition', category: 1, complexity: 'beginner', tags: ['abstract', 'fluid', 'paint', 'colorful'] },
    { title: 'Geometric Pattern Design', prompt: 'Intricate geometric patterns, symmetrical design, bold colors, modern graphic style, clean and precise, vector art aesthetic', category: 3, complexity: 'beginner', tags: ['geometric', 'pattern', 'design', 'modern'] },
    { title: 'Watercolor Flower Bouquet', prompt: 'Delicate watercolor flowers, soft colors, artistic brush strokes, botanical illustration, pastel tones, dreamy atmosphere', category: 0, complexity: 'intermediate', tags: ['watercolor', 'flowers', 'art', 'botanical'] },

    // Animals & Wildlife
    { title: 'Majestic Lion Portrait', prompt: 'Close-up portrait of male lion, mane flowing in wind, golden eyes, wildlife photography, dramatic lighting, powerful presence', category: 2, complexity: 'intermediate', tags: ['lion', 'wildlife', 'animal', 'portrait'] },
    { title: 'Underwater Coral Reef', prompt: 'Vibrant coral reef underwater, tropical fish swimming, clear blue water, marine life, nature documentary style, colorful', category: 1, complexity: 'beginner', tags: ['underwater', 'coral', 'ocean', 'marine'] },
    { title: 'Arctic Wolf in Snow', prompt: 'White arctic wolf in snowy landscape, piercing blue eyes, winter atmosphere, wildlife photography, pristine environment', category: 3, complexity: 'intermediate', tags: ['wolf', 'arctic', 'snow', 'wildlife'] },
  ]

  const samplePrompts: any[] = []
  const categoryMap = ['dalle-3', 'midjourney', 'stable-diffusion', 'leonardo-ai']
  const generatorMap = ['DALL-E 3', 'Midjourney', 'Stable Diffusion', 'Leonardo AI']

  // Multiply the templates to create 120 prompts with variations
  for (let multiplier = 0; multiplier < 7; multiplier++) {
    promptTemplates.forEach((template, index) => {
      const variation = multiplier > 0 ? ` ${['Enhanced', 'Pro', 'Ultra', 'Premium', 'Deluxe', 'Master'][multiplier - 1]}` : ''
      samplePrompts.push({
        title: `${template.title}${variation}`,
        prompt: template.prompt,
        description: `Creates stunning ${template.tags[0]} imagery with professional quality`,
        category: categoryMap[template.category],
        generator: generatorMap[template.category],
        complexity: template.complexity,
        tags: template.tags,
        isFeatured: Math.random() > 0.7,
        rating: 4.2 + Math.random() * 0.8,
        ratingCount: Math.floor(50 + Math.random() * 800),
        views: Math.floor(500 + Math.random() * 5000),
      })
    })
  }

  return samplePrompts
}

const samplePrompts = generatePrompts()

async function main() {
  console.log('🌱 Starting database seed...')
  // Clear existing data
  await prisma.collection_prompts.deleteMany()
  await prisma.collections.deleteMany()
  await prisma.favorites.deleteMany()
  await prisma.prompts.deleteMany()
  await prisma.categories.deleteMany()
  await prisma.users.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Seed categories
  console.log('📂 Creating categories...')
  for (const category of categories) {
    await prisma.categories.create({
      data: category,
    })
  }
  console.log(`✅ Created ${categories.length} categories`)

  // Seed prompts
  console.log('💬 Creating prompts...')
  for (const promptData of samplePrompts) {
    const slug = promptData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    await prisma.prompts.create({
      data: {
        id: randomUUID(),
        ...promptData,
        slug,
        imageUrl: `https://picsum.photos/seed/${slug}/800/600`,
      },
    })
  }
  console.log(`✅ Created ${samplePrompts.length} prompts`)

  // Update category prompt counts
  console.log('🔢 Updating category counts...')
  for (const category of categories) {
    const count = await prisma.prompts.count({
      where: { category: category.slug },
    })
    await prisma.categories.update({
      where: { slug: category.slug },
      data: { promptCount: count },
    })
  }
  console.log('✅ Updated category counts')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
