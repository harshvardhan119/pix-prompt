const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

// Debug: Check what models are available
console.log('Available Prisma models:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')));

// Helper function to create slug from title
function createSlug(title, index) {
  const baseSlug = title
    .toLowerCase()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .substring(0, 80); // Limit length

  return baseSlug || `prompt-${index}`;
}

// Helper function to extract category from title or repository
function extractCategory(title, repository) {
  const lowerTitle = title.toLowerCase();

  // Check for known AI tools in title
  if (lowerTitle.includes('dall-e') || lowerTitle.includes('dalle')) return 'dalle-3';
  if (lowerTitle.includes('midjourney')) return 'midjourney';
  if (lowerTitle.includes('stable diffusion')) return 'stable-diffusion';
  if (lowerTitle.includes('gpt-4o') || lowerTitle.includes('gpt4o')) return 'gpt-4o';

  // Check for art styles
  if (lowerTitle.includes('portrait') || lowerTitle.includes('art')) return 'portrait-art';
  if (lowerTitle.includes('3d') || lowerTitle.includes('render')) return '3d-render';
  if (lowerTitle.includes('anime') || lowerTitle.includes('cartoon')) return 'anime-cartoon';
  if (lowerTitle.includes('photo') || lowerTitle.includes('photography')) return 'photography';

  // Default category
  return 'creative-art';
}

// Helper function to extract generator
function extractGenerator(title) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes('dall-e') || lowerTitle.includes('dalle')) return 'dall-e-3';
  if (lowerTitle.includes('midjourney')) return 'midjourney';
  if (lowerTitle.includes('stable diffusion')) return 'stable-diffusion';
  if (lowerTitle.includes('gpt-4o') || lowerTitle.includes('gpt4o')) return 'gpt-4o';

  // Default to DALL-E 3
  return 'dall-e-3';
}

// Helper function to extract complexity
function extractComplexity(prompt) {
  const wordCount = prompt.split(/\s+/).length;

  if (wordCount < 30) return 'beginner';
  if (wordCount < 80) return 'intermediate';
  return 'advanced';
}

// Helper function to extract tags from title
function extractTags(title, prompt) {
  const tags = new Set();
  const text = (title + ' ' + prompt).toLowerCase();

  // Common AI image generation tags
  const tagKeywords = [
    'portrait', 'landscape', 'art', 'photo', 'realistic', 'anime',
    '3d', 'cartoon', 'abstract', 'minimalist', 'vintage', 'modern',
    'creative', 'professional', 'editorial', 'cinematic', 'dramatic',
    'colorful', 'monochrome', 'black-white', 'illustration', 'concept',
    'character', 'scene', 'background', 'texture', 'pattern'
  ];

  tagKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      tags.add(keyword);
    }
  });

  // Ensure at least one tag
  if (tags.size === 0) {
    tags.add('creative');
  }

  return Array.from(tags).slice(0, 5); // Limit to 5 tags
}

async function main() {
  console.log('🚀 Starting data import...\n');

  // Read JSON data
  console.log('📖 Reading data file...');
  const rawData = JSON.parse(fs.readFileSync('c:/Users/chitr/Desktop/pdf/data/prompts_data.json', 'utf8'));
  console.log(`Found ${rawData.length} total records`);

  // Filter records with valid prompts
  const validData = rawData.filter(item => item.prompt && item.prompt.trim() !== '');
  console.log(`Filtered to ${validData.length} records with prompts\n`);

  // Delete existing data
  console.log('🗑️  Deleting existing data...');
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "collection_prompts", "favorites", "collections", "prompts", "categories", "users" CASCADE`;
    console.log('✅ Existing data deleted\n');
  } catch (error) {
    console.log('Note: Using deleteMany as fallback...');
    // Fallback to deleteMany in correct order
    const tables = ['collection_prompts', 'favorites', 'collections', 'prompts', 'categories', 'users'];
    for (const table of tables) {
      try {
        await prisma[table].deleteMany({});
      } catch (e) {
        console.log(`  Skipping ${table}: ${e.message}`);
      }
    }
    console.log('✅ Existing data deleted\n');
  }

  // Create categories
  console.log('📁 Creating categories...');
  const categoryData = [
    {
      id: 'dalle-3',
      name: 'DALL-E 3',
      slug: 'dalle-3',
      description: 'AI-generated images using DALL-E 3',
      icon: '🎨',
      gradientStart: '#FF7A59',
      gradientEnd: '#FF6A40'
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      slug: 'midjourney',
      description: 'AI art created with Midjourney',
      icon: '🖼️',
      gradientStart: '#6366F1',
      gradientEnd: '#4F46E5'
    },
    {
      id: 'stable-diffusion',
      name: 'Stable Diffusion',
      slug: 'stable-diffusion',
      description: 'Images generated with Stable Diffusion',
      icon: '🎭',
      gradientStart: '#8B5CF6',
      gradientEnd: '#7C3AED'
    },
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      slug: 'gpt-4o',
      description: 'AI images using GPT-4o',
      icon: '✨',
      gradientStart: '#10B981',
      gradientEnd: '#059669'
    },
    {
      id: 'portrait-art',
      name: 'Portrait Art',
      slug: 'portrait-art',
      description: 'Portrait and character art',
      icon: '👤',
      gradientStart: '#EC4899',
      gradientEnd: '#DB2777'
    },
    {
      id: '3d-render',
      name: '3D Render',
      slug: '3d-render',
      description: '3D rendered images',
      icon: '🎲',
      gradientStart: '#F59E0B',
      gradientEnd: '#D97706'
    },
    {
      id: 'anime-cartoon',
      name: 'Anime & Cartoon',
      slug: 'anime-cartoon',
      description: 'Anime and cartoon style images',
      icon: '🎌',
      gradientStart: '#EF4444',
      gradientEnd: '#DC2626'
    },
    {
      id: 'photography',
      name: 'Photography',
      slug: 'photography',
      description: 'Photorealistic AI images',
      icon: '📷',
      gradientStart: '#14B8A6',
      gradientEnd: '#0D9488'
    },
    {
      id: 'creative-art',
      name: 'Creative Art',
      slug: 'creative-art',
      description: 'Creative and experimental art',
      icon: '🎨',
      gradientStart: '#A855F7',
      gradientEnd: '#9333EA'
    }
  ];

  for (const category of categoryData) {
    await prisma.categories.create({ data: category });
  }
  console.log(`✅ Created ${categoryData.length} categories\n`);

  // Import prompts
  console.log('📥 Importing prompts...');
  const usedSlugs = new Set();
  let imported = 0;
  let skipped = 0;

  for (let i = 0; i < validData.length; i++) {
    const item = validData[i];

    try {
      // Generate unique slug
      let slug = createSlug(item.title, i);
      let slugCounter = 1;
      while (usedSlugs.has(slug)) {
        slug = `${createSlug(item.title, i)}-${slugCounter}`;
        slugCounter++;
      }
      usedSlugs.add(slug);

      // Extract data
      const category = extractCategory(item.title, item.repository);
      const generator = extractGenerator(item.title);
      const complexity = extractComplexity(item.prompt);
      const tags = extractTags(item.title, item.prompt);

      // Clean title (remove HTML tags)
      const cleanTitle = item.title.replace(/<[^>]*>/g, '').trim() || `Prompt ${i + 1}`;

      // Create prompt
      await prisma.prompts.create({
        data: {
          id: `prompt-${i + 1}`,
          title: cleanTitle,
          prompt: item.prompt.trim(),
          description: item.alt_text || cleanTitle,
          imageUrl: item.image_url || null,
          category,
          generator,
          complexity,
          slug,
          tags,
          views: 0,
          rating: 0,
          ratingCount: 0,
          isFeatured: i < 10, // Mark first 10 as featured
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      imported++;

      if (imported % 100 === 0) {
        console.log(`  Imported ${imported}/${validData.length} prompts...`);
      }
    } catch (error) {
      console.error(`  Error importing prompt ${i + 1}:`, error.message);
      skipped++;
    }
  }

  console.log(`\n✅ Imported ${imported} prompts`);
  if (skipped > 0) {
    console.log(`⚠️  Skipped ${skipped} prompts due to errors`);
  }

  // Update category prompt counts
  console.log('\n📊 Updating category counts...');
  const categories = await prisma.categories.findMany();
  for (const category of categories) {
    const count = await prisma.prompts.count({
      where: { category: category.id }
    });
    await prisma.categories.update({
      where: { id: category.id },
      data: { promptCount: count }
    });
  }
  console.log('✅ Category counts updated\n');

  // Summary
  console.log('📈 Import Summary:');
  console.log('─────────────────────────────────');
  const totalPrompts = await prisma.prompts.count();
  const totalCategories = await prisma.categories.count();
  console.log(`Total Prompts: ${totalPrompts}`);
  console.log(`Total Categories: ${totalCategories}`);

  console.log('\nCategory breakdown:');
  for (const category of categories) {
    const updatedCategory = await prisma.categories.findUnique({
      where: { id: category.id }
    });
    console.log(`  ${updatedCategory.name}: ${updatedCategory.promptCount} prompts`);
  }

  console.log('\n✨ Import completed successfully!');
}

main()
  .catch(error => {
    console.error('❌ Error during import:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
