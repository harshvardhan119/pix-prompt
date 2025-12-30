const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Helper function to create slug
function createSlug(title, prefix) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 60);

  return `${prefix}-${baseSlug}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// DALL-E 3 Prompts (50+)
const dallePrompts = [
  {
    title: "Futuristic City Skyline at Sunset",
    prompt: "A breathtaking view of a futuristic city skyline at sunset, with towering glass skyscrapers reflecting golden and orange hues. Flying vehicles navigate between buildings, and holographic advertisements illuminate the evening sky. The architecture combines sleek modern design with sustainable green elements like vertical gardens.",
    tags: ["futuristic", "cityscape", "sunset", "architecture", "sci-fi"]
  },
  {
    title: "Cozy Coffee Shop Interior",
    prompt: "A warm and inviting coffee shop interior with soft ambient lighting. Wooden tables and comfortable chairs are scattered throughout. A barista works behind a vintage espresso machine, steam rising. Bookshelves line the walls, plants hang from the ceiling, and customers read quietly by large windows showing a rainy street outside.",
    tags: ["interior", "cozy", "coffee", "realistic", "atmosphere"]
  },
  {
    title: "Mystical Forest Guardian",
    prompt: "A majestic forest guardian creature made of twisted ancient wood and glowing moss. Its eyes shine with an ethereal green light, and small forest animals gather around its feet. Sunbeams filter through the dense canopy above, creating a magical atmosphere filled with floating particles of light.",
    tags: ["fantasy", "creature", "forest", "magical", "ethereal"]
  },
  {
    title: "Vintage Travel Poster - Tokyo",
    prompt: "A retro-style travel poster for Tokyo in the 1960s aesthetic. Features Mount Fuji in the background, cherry blossoms in full bloom, and a bullet train in the foreground. Bold typography reads 'VISIT TOKYO' at the top. Color palette of soft pinks, blues, and creams with a slightly worn, vintage texture.",
    tags: ["vintage", "poster", "travel", "retro", "illustration"]
  },
  {
    title: "Underwater Coral Reef Ecosystem",
    prompt: "A vibrant underwater coral reef teeming with life. Colorful fish of various species swim through coral formations in shades of purple, orange, and pink. A sea turtle glides gracefully in the middle distance. Sunlight penetrates the water from above, creating dancing light patterns on the sandy bottom.",
    tags: ["underwater", "nature", "coral", "marine", "vibrant"]
  },
  {
    title: "Steampunk Workshop Interior",
    prompt: "A detailed steampunk inventor's workshop filled with brass machinery, copper pipes, and intricate clockwork mechanisms. Blueprints cover the walls, tools hang from pegboards, and a large brass telescope points through a round window. Warm gaslight illuminates the space, casting dramatic shadows.",
    tags: ["steampunk", "workshop", "mechanical", "vintage", "detailed"]
  },
  {
    title: "Minimalist Product Photography - Smartwatch",
    prompt: "Clean product photography of a modern smartwatch on a pure white background. The watch displays a colorful interface, and the lighting creates subtle reflections on its polished surface. Professional studio lighting with soft shadows, shot from a 45-degree angle. Ultra-sharp focus and clean composition.",
    tags: ["product", "minimalist", "technology", "photography", "clean"]
  },
  {
    title: "Magical Library with Floating Books",
    prompt: "An enormous library with towering bookshelves reaching into darkness above. Hundreds of books float in the air, their pages glowing softly. A grand spiral staircase winds up through the center. Ornate reading desks with candles provide warm pools of light. The atmosphere is mystical and dreamlike.",
    tags: ["library", "magical", "fantasy", "books", "atmospheric"]
  },
  {
    title: "Abstract Geometric Composition",
    prompt: "A bold abstract composition featuring overlapping geometric shapes in a vibrant color palette of electric blue, hot pink, yellow, and turquoise. Clean lines and sharp angles create visual tension. Modern minimalist style with a slight 3D effect through shadows and gradients. High contrast and contemporary aesthetic.",
    tags: ["abstract", "geometric", "modern", "colorful", "minimalist"]
  },
  {
    title: "Rustic Farm Market Scene",
    prompt: "A charming farmers market on a sunny morning. Wooden stalls display fresh vegetables, fruits, and flowers in wicker baskets. Vendors in aprons chat with customers. String lights hang overhead, and a vintage truck is parked nearby. The scene captures the warm, community atmosphere of local farming culture.",
    tags: ["rustic", "market", "realistic", "scene", "warm"]
  },
  {
    title: "Cyberpunk Street Racer",
    prompt: "A neon-lit cyberpunk street racing scene at night. A sleek, modified sports car with underglow lighting speeds through a rain-soaked street. Holographic advertisements and neon signs reflect in puddles. Motion blur suggests high speed while keeping the car in sharp focus. Dramatic lighting with purple and cyan tones.",
    tags: ["cyberpunk", "car", "neon", "action", "night"]
  },
  {
    title: "Watercolor Botanical Illustration",
    prompt: "A delicate watercolor illustration of various wildflowers and botanical elements. Soft, translucent petals in shades of lavender, peach, and cream. Green leaves and stems arranged in a natural, flowing composition. White background with subtle texture. Scientific accuracy meets artistic beauty in the style of vintage botanical prints.",
    tags: ["watercolor", "botanical", "illustration", "delicate", "floral"]
  },
  {
    title: "Astronaut Floating in Space",
    prompt: "A lone astronaut floating in the vastness of space, Earth visible in the background showing swirling clouds and blue oceans. The astronaut's white suit reflects the sun's light, and stars dot the black void around them. A sense of isolation and wonder. Photorealistic detail on the suit and helmet visor reflection.",
    tags: ["space", "astronaut", "realistic", "earth", "dramatic"]
  },
  {
    title: "Art Deco Hotel Lobby",
    prompt: "A luxurious Art Deco hotel lobby from the 1920s with geometric patterns in gold, black, and cream. A grand chandelier hangs from an ornate ceiling. Marble floors feature inlaid designs, and elegant furniture in velvet upholstery fills the space. Polished brass details catch the light. Sophisticated and glamorous atmosphere.",
    tags: ["art-deco", "interior", "luxury", "vintage", "architectural"]
  },
  {
    title: "Enchanted Mushroom Forest",
    prompt: "A fairy tale forest filled with giant, bioluminescent mushrooms of various sizes and colors. Glowing spores float through the air, and tiny sprites dance among the mushroom caps. Twisted roots and moss-covered stones create a magical landscape. Deep blue twilight filters through the canopy, enhancing the ethereal glow.",
    tags: ["fantasy", "mushroom", "magical", "glowing", "forest"]
  },
  {
    title: "Modern Kitchen Design",
    prompt: "A sleek, modern kitchen with white cabinets, marble countertops, and stainless steel appliances. Large windows flood the space with natural light. A wooden island with bar stools serves as a centerpiece. Minimalist pendant lights hang above, and fresh herbs grow in small pots on the windowsill. Clean, functional, and elegant.",
    tags: ["interior", "kitchen", "modern", "clean", "realistic"]
  },
  {
    title: "Dragon Perched on Mountain Peak",
    prompt: "A majestic dragon with iridescent scales perched atop a snow-covered mountain peak. Its wings are partially spread, catching the golden light of sunrise. Clouds swirl below, and distant mountains fade into the horizon. The dragon's eyes gleam with ancient wisdom. Epic fantasy composition with dramatic lighting and scale.",
    tags: ["dragon", "fantasy", "mountain", "epic", "creature"]
  },
  {
    title: "Vintage Record Store",
    prompt: "A nostalgic record store interior with wooden crates full of vinyl records lining the walls. Posters of classic albums and concerts cover every surface. A vintage turntable plays in the corner, and warm Edison bulbs provide ambient lighting. A customer browses through records while jazz music fills the air. Retro and authentic atmosphere.",
    tags: ["vintage", "music", "interior", "retro", "nostalgic"]
  },
  {
    title: "Tropical Beach Paradise",
    prompt: "A pristine tropical beach with crystal-clear turquoise water and white sand. Palm trees lean over the shore, their fronds swaying in the breeze. A wooden hammock is strung between two trees. The sun shines brightly in a perfect blue sky with a few wispy clouds. Paradise island getaway aesthetic.",
    tags: ["beach", "tropical", "paradise", "nature", "relaxing"]
  },
  {
    title: "Neon Sign Typography",
    prompt: "A custom neon sign with elegant script typography reading 'Dream Big' in warm pink and purple tubes. Mounted on a dark brick wall, the sign glows brightly in the evening darkness. Subtle light reflections on the wall surface. Photorealistic rendering of glass tubes and electrical components. Modern and inspirational.",
    tags: ["neon", "typography", "sign", "glow", "modern"]
  },
  {
    title: "Medieval Castle on Cliff",
    prompt: "An imposing medieval castle perched dramatically on a cliff edge overlooking a stormy sea. Dark clouds gather overhead, and waves crash against the rocks below. The stone fortress features towers, battlements, and narrow windows. A single light glows from a tower window. Moody and atmospheric with a sense of history and mystery.",
    tags: ["castle", "medieval", "dramatic", "architecture", "moody"]
  },
  {
    title: "Cute Animal Portrait - Red Panda",
    prompt: "An adorable close-up portrait of a red panda with fluffy orange and white fur. Its dark eyes are bright and curious, and its small rounded ears perk up attentively. Sitting among bamboo leaves with soft natural lighting. Shallow depth of field keeps the focus on the panda's expressive face. Professional wildlife photography style.",
    tags: ["animal", "portrait", "cute", "wildlife", "realistic"]
  },
  {
    title: "Luxury Sports Car Studio Shot",
    prompt: "A sleek luxury sports car in metallic midnight blue photographed in a professional studio with dramatic lighting. Low angle shot emphasizes the car's aggressive stance and aerodynamic design. Reflections dance across the polished surface. Black background with subtle gradient. Automotive photography perfection with every detail in sharp focus.",
    tags: ["car", "luxury", "photography", "studio", "dramatic"]
  },
  {
    title: "Autumn Forest Path",
    prompt: "A peaceful forest path covered in fallen autumn leaves in shades of red, orange, and gold. Tall trees with colorful foliage arch overhead, creating a natural tunnel. Soft morning mist filters through the branches, and warm sunlight creates a golden glow. The path leads deeper into the tranquil woods. Serene and inviting.",
    tags: ["autumn", "forest", "nature", "peaceful", "landscape"]
  },
  {
    title: "Sci-Fi Space Station Interior",
    prompt: "The interior of a massive space station with curved corridors and large observation windows showing a planet below. Holographic displays float in the air, and soft blue lighting illuminates clean white surfaces. Crew members in futuristic uniforms move through the space. Advanced technology seamlessly integrated into the architecture. Realistic sci-fi aesthetic.",
    tags: ["sci-fi", "space", "interior", "futuristic", "technology"]
  },
  {
    title: "Street Food Night Market",
    prompt: "A vibrant Asian night market filled with food stalls selling steaming dumplings, noodles, and skewered meats. Colorful lanterns hang overhead, and crowds of people browse and eat. Steam rises from cooking stations, and neon signs advertise different vendors. The atmosphere is bustling, warm, and full of life and delicious aromas.",
    tags: ["street-food", "market", "night", "asian", "vibrant"]
  },
  {
    title: "Minimalist Desert Landscape",
    prompt: "A vast, minimalist desert landscape with smooth sand dunes creating gentle curves against a pale sky. A single person in flowing white robes stands on a dune ridge, providing scale. Soft shadows define the dunes' contours. The composition is simple and serene, emphasizing emptiness and space. Muted earth tone color palette.",
    tags: ["desert", "minimalist", "landscape", "serene", "simple"]
  },
  {
    title: "Vintage Polaroid Collage",
    prompt: "A nostalgic collage of scattered vintage Polaroid photos showing various memories - beach vacations, birthday parties, road trips, and everyday moments. The photos have that characteristic Polaroid color cast and white borders. They're arranged casually on a wooden surface with some overlapping. Warm, sentimental, and authentic feeling.",
    tags: ["vintage", "polaroid", "collage", "nostalgic", "photography"]
  },
  {
    title: "Gothic Cathedral Interior",
    prompt: "The awe-inspiring interior of a Gothic cathedral with soaring ribbed vaults and pointed arches. Colorful stained glass windows cast vibrant patterns of light across the stone floor. Rows of wooden pews lead to an ornate altar. The atmosphere is sacred and majestic, emphasizing the building's spiritual grandeur and architectural beauty.",
    tags: ["cathedral", "gothic", "interior", "architectural", "majestic"]
  },
  {
    title: "Cute Dessert Illustration",
    prompt: "A whimsical illustration of an adorable dessert - a slice of strawberry cake with a happy smiling face. The cake has multiple layers with cream filling, topped with a fresh strawberry. Pastel pink and cream colors with a slight sparkle effect. Kawaii style with big eyes and rosy cheeks. Clean white background. Charming and sweet.",
    tags: ["cute", "dessert", "illustration", "kawaii", "colorful"]
  },
  {
    title: "Urban Rooftop Garden",
    prompt: "A lush rooftop garden in the middle of a bustling city. Raised beds overflow with vegetables and flowers, potted plants line the edges, and a small seating area features rustic wooden furniture. The city skyline rises in the background, creating a beautiful contrast between nature and urban environment. Golden hour lighting creates a warm glow.",
    tags: ["urban", "garden", "rooftop", "nature", "modern"]
  },
  {
    title: "Pirate Ship on Stormy Seas",
    prompt: "A classic pirate ship with black sails battling through a violent storm. Massive waves crash over the deck, lightning illuminates dark clouds, and rain pours down. The ship tilts dramatically as it crests a wave. Tattered Jolly Roger flag whips in the wind. Dynamic action scene with dramatic lighting and powerful sense of motion.",
    tags: ["pirate", "ship", "storm", "action", "dramatic"]
  },
  {
    title: "Cozy Reading Nook",
    prompt: "A perfect cozy reading nook tucked into a bay window. A plush window seat with soft cushions and blankets faces a rainy garden view. A small side table holds a steaming cup of tea and a stack of books. Warm lamp light creates a peaceful ambiance. The space feels inviting, comfortable, and perfect for losing yourself in a good book.",
    tags: ["cozy", "interior", "reading", "peaceful", "warm"]
  },
  {
    title: "Crystal Cave Formation",
    prompt: "The interior of a magnificent crystal cave with massive formations of translucent crystals in shades of blue and purple. Light filters through the crystals, creating a magical glow throughout the cavern. The crystals range from small clusters to enormous pillars. Water pools on the floor reflect the ethereal light. Nature's geological wonder.",
    tags: ["crystal", "cave", "magical", "nature", "geological"]
  },
  {
    title: "Retro Diner 1950s",
    prompt: "A classic American diner from the 1950s with red vinyl booths, black and white checkered floor, and a long chrome counter with spinning stools. A jukebox glows in the corner, and neon signs advertise milkshakes and burgers. Waitresses in period uniforms serve customers. The atmosphere is cheerful and quintessentially vintage Americana.",
    tags: ["retro", "diner", "1950s", "vintage", "americana"]
  },
  {
    title: "Mountain Lake Reflection",
    prompt: "A pristine mountain lake perfectly reflecting snow-capped peaks and evergreen forests. The water is so still it creates a mirror image. Early morning mist hovers over the surface, and the sky shows soft pastel colors of dawn. A lone canoe sits at the shore. The scene is peaceful, majestic, and breathtakingly beautiful.",
    tags: ["mountain", "lake", "reflection", "nature", "peaceful"]
  },
  {
    title: "Cybernetic Character Portrait",
    prompt: "A close-up portrait of a cybernetic character - half human, half machine. The organic side shows realistic skin and a green eye, while the mechanical side reveals intricate circuitry, glowing blue components, and polished metal. Dramatic side lighting emphasizes the contrast between flesh and technology. Futuristic and thought-provoking.",
    tags: ["cybernetic", "portrait", "sci-fi", "cyborg", "futuristic"]
  },
  {
    title: "Wildflower Meadow",
    prompt: "A expansive meadow filled with colorful wildflowers - daisies, poppies, lupines, and buttercups sway gently in the breeze. A winding dirt path cuts through the middle. In the distance, rolling hills meet a bright blue sky with fluffy white clouds. The scene captures the simple beauty of nature in peak bloom. Vibrant and cheerful.",
    tags: ["wildflower", "meadow", "nature", "colorful", "cheerful"]
  },
  {
    title: "Ancient Tree Spirit",
    prompt: "An ancient, massive tree with a face formed naturally in its bark - wise eyes, a long nose, and a beard of moss and vines. Fireflies dance around it as twilight settles. The tree radiates a gentle, protective presence. Its branches spread wide, sheltering the forest around it. Magical realism blending nature and fantasy.",
    tags: ["tree", "spirit", "fantasy", "magical", "nature"]
  },
  {
    title: "Modern Office Space",
    prompt: "A bright, modern office space with an open floor plan. Sleek desks with computer monitors, ergonomic chairs, and plenty of natural light from floor-to-ceiling windows. Plants are scattered throughout, and a collaborative area features comfortable seating. The design is clean, minimalist, and promotes productivity while maintaining a welcoming atmosphere.",
    tags: ["office", "modern", "interior", "minimalist", "professional"]
  },
  {
    title: "Phoenix Rising from Flames",
    prompt: "A magnificent phoenix emerging from swirling flames, its feathers a brilliant mixture of red, orange, gold, and yellow. Wings spread wide as it ascends, trailing embers and sparks. The mythical bird's eyes glow with inner fire. Dark background emphasizes the intense brightness of the flames and the bird's radiant plumage. Symbol of rebirth and renewal.",
    tags: ["phoenix", "fantasy", "fire", "mythical", "dramatic"]
  },
  {
    title: "Zen Garden Meditation Space",
    prompt: "A serene Japanese zen garden with carefully raked white gravel forming circular patterns around smooth stones. A simple wooden bridge crosses a koi pond where colorful fish swim lazily. Carefully pruned bonsai trees and bamboo add greenery. Stone lanterns and a small meditation pavilion complete the peaceful space. Minimalist and calming.",
    tags: ["zen", "garden", "japanese", "peaceful", "minimalist"]
  },
  {
    title: "Vintage Bicycle Parked in European Street",
    prompt: "A classic vintage bicycle with a wicker basket full of fresh flowers parked against an old stone wall in a charming European street. Cobblestones lead away into the distance, and ivy climbs the wall behind the bike. Soft afternoon light creates gentle shadows. Romantic and nostalgic European travel aesthetic.",
    tags: ["vintage", "bicycle", "european", "street", "romantic"]
  },
  {
    title: "Underwater Ancient Ruins",
    prompt: "Mysterious ancient ruins submerged underwater, with crumbling stone columns and arches covered in coral and seaweed. Schools of tropical fish swim through the structures. Shafts of sunlight penetrate the blue water from above, illuminating the lost civilization. The atmosphere is mysterious and awe-inspiring, suggesting forgotten history.",
    tags: ["underwater", "ruins", "ancient", "mysterious", "lost-civilization"]
  },
  {
    title: "Chocolate Labrador Puppy",
    prompt: "An irresistibly cute chocolate labrador puppy with big, soulful brown eyes looking directly at the camera. Sitting on soft grass with its head slightly tilted in that adorable puppy way. Glossy coat, floppy ears, and a tiny nose. Natural outdoor lighting with a soft bokeh background. Professional pet photography capturing pure innocence and charm.",
    tags: ["puppy", "dog", "cute", "portrait", "realistic"]
  },
  {
    title: "Northern Lights Over Iceland",
    prompt: "The spectacular aurora borealis dancing across the night sky in vivid greens and purples over an Icelandic landscape. In the foreground, a small church sits beside a partially frozen lake that reflects the lights. Snow-covered mountains loom in the distance. Stars visible in the clear portions of sky. Nature's most magnificent light show.",
    tags: ["aurora", "northern-lights", "landscape", "nature", "dramatic"]
  },
  {
    title: "Art Nouveau Portrait",
    prompt: "An elegant Art Nouveau portrait of a woman with flowing hair adorned with flowers and peacock feathers. Organic, curving lines frame her face, and decorative elements feature natural motifs like vines and blossoms. Rich jewel tones of emerald, sapphire, and gold. Style reminiscent of Alphonse Mucha with intricate details and graceful composition.",
    tags: ["art-nouveau", "portrait", "elegant", "decorative", "vintage"]
  },
  {
    title: "Steaming Cup of Coffee Latte Art",
    prompt: "A close-up shot of a perfectly crafted latte in a white ceramic cup, featuring intricate latte art in the shape of a fern leaf. Steam rises from the hot drink, and the foam is velvety smooth. Shot from above on a rustic wooden table with soft natural lighting. Professional food photography highlighting texture and craftsmanship.",
    tags: ["coffee", "latte-art", "food-photography", "closeup", "realistic"]
  },
  {
    title: "Abandoned Amusement Park",
    prompt: "An eerie abandoned amusement park reclaimed by nature. A rusted Ferris wheel stands motionless against an overcast sky, vines growing through its structure. Broken carousel horses lie scattered, and weeds push through cracked pavement. The atmosphere is haunting and melancholic, capturing the passage of time and forgotten joy. Urban exploration aesthetic.",
    tags: ["abandoned", "amusement-park", "eerie", "decay", "atmospheric"]
  },
  {
    title: "Glowing Jellyfish",
    prompt: "A mesmerizing bioluminescent jellyfish floating gracefully in dark ocean water. Its translucent bell and flowing tentacles glow in vibrant shades of blue and purple. The creature seems to pulse with inner light, and smaller organisms scatter as it moves. Black background emphasizes the ethereal glow. Nature's living light show.",
    tags: ["jellyfish", "bioluminescent", "underwater", "glowing", "magical"]
  }
];

// Midjourney Prompts (50+)
const midjourneyPrompts = [
  {
    title: "Hyperrealistic Portrait Photography",
    prompt: "hyperrealistic portrait of a elderly woman with weathered face, wrinkles telling stories of life, piercing blue eyes, silver hair in a bun, soft window light, shot on Hasselblad, 85mm f/1.4, shallow depth of field, film grain, intimate and emotional, --ar 2:3 --style raw --v 6",
    tags: ["portrait", "hyperrealistic", "photography", "emotional", "detailed"]
  },
  {
    title: "Anime Character Design",
    prompt: "full body anime character design, mystical elf warrior with long silver hair, emerald eyes, ornate armor with gold trim, holding enchanted bow, magical forest background, Studio Ghibli inspired, soft colors, detailed costume, character sheet style, --ar 3:4 --niji 5",
    tags: ["anime", "character", "fantasy", "elf", "design"]
  },
  {
    title: "Architectural Digest Interior",
    prompt: "luxury modern living room interior, floor to ceiling windows overlooking ocean, minimalist scandinavian design, neutral color palette, natural materials, indoor plants, architectural photography, golden hour lighting, shot for Architectural Digest, ultra detailed, --ar 16:9 --style raw",
    tags: ["interior", "luxury", "modern", "architectural", "minimalist"]
  },
  {
    title: "Cinematic Movie Poster",
    prompt: "cinematic movie poster, lone astronaut standing on alien planet surface, two moons in purple sky, dramatic lighting, epic scale, photorealistic, film noir aesthetic, moody atmosphere, title 'THE LAST FRONTIER' in bold typography, --ar 2:3 --v 6",
    tags: ["cinematic", "poster", "sci-fi", "dramatic", "epic"]
  },
  {
    title: "Fashion Editorial Photography",
    prompt: "high fashion editorial, model in avant-garde geometric dress made of mirrors and crystals, dramatic pose, studio lighting with colored gels, purple and cyan, sharp focus, Vogue magazine quality, shot by Annie Leibovitz style, ultra high fashion, --ar 4:5 --style raw --v 6",
    tags: ["fashion", "editorial", "avant-garde", "photography", "high-fashion"]
  },
  {
    title: "Impressionist Garden Painting",
    prompt: "impressionist oil painting of a lush garden in full bloom, vibrant flowers in purples yellows and pinks, dappled sunlight through trees, loose brushstrokes, Claude Monet style, soft dreamy quality, plein air painting, pastel color palette, --ar 3:2 --v 6",
    tags: ["impressionist", "painting", "garden", "monet", "artistic"]
  },
  {
    title: "Cyberpunk Cityscape",
    prompt: "cyberpunk city street at night, neon signs in Japanese and English, rain-soaked streets reflecting colorful lights, flying cars overhead, crowds with umbrellas, Blade Runner aesthetic, cinematic wide angle, deep blue and magenta color grading, ultra detailed, --ar 21:9 --v 6",
    tags: ["cyberpunk", "cityscape", "neon", "futuristic", "cinematic"]
  },
  {
    title: "Fantasy Book Cover Art",
    prompt: "epic fantasy book cover art, massive dragon coiled around ancient tower, stormy sky with lightning, medieval castle ruins, dramatic lighting from below, oil painting style, rich colors, sense of scale and drama, Boris Vallejo inspired, --ar 2:3 --v 6",
    tags: ["fantasy", "book-cover", "dragon", "epic", "painting"]
  },
  {
    title: "Luxury Product Photography",
    prompt: "luxury product photography, expensive Swiss watch with exposed mechanism, floating in air, dramatic spot lighting, black background, reflective surface below, ultra sharp focus, commercial photography, jewelry advertisement quality, --ar 4:5 --style raw --v 6",
    tags: ["product", "luxury", "photography", "commercial", "detailed"]
  },
  {
    title: "Surrealist Dream Scene",
    prompt: "surrealist dreamscape, floating islands with waterfalls flowing upward into cloudy sky, impossible architecture, Salvador Dali meets MC Escher, melting clocks, stairs leading nowhere, purple and orange sunset, hyperdetailed, magical realism, --ar 16:9 --v 6",
    tags: ["surrealist", "dream", "impossible", "fantasy", "artistic"]
  },
  {
    title: "National Geographic Wildlife",
    prompt: "National Geographic style wildlife photography, majestic male lion with full mane at golden hour, African savanna, shallow depth of field, subject in sharp focus, warm backlighting creating rim light on fur, award winning composition, shot on Canon 600mm, --ar 3:2 --style raw --v 6",
    tags: ["wildlife", "photography", "nature", "lion", "professional"]
  },
  {
    title: "Vintage Travel Poster Art",
    prompt: "vintage 1930s travel poster style, 'Visit Mars' retro futurism, art deco design, limited color palette of orange red and cream, simplified shapes, bold typography, streamlined aesthetic, tourism advertisement from alternate history, --ar 2:3 --v 6",
    tags: ["vintage", "poster", "art-deco", "retro", "travel"]
  },
  {
    title: "Photorealistic Food Photography",
    prompt: "photorealistic food photography, gourmet burger with sesame bun, melting cheese, fresh lettuce tomato, perfectly grilled patty, steam rising, commercial advertisement quality, dramatic side lighting, black background, ultra detailed textures, mouth watering, --ar 4:5 --style raw --v 6",
    tags: ["food", "photography", "realistic", "commercial", "detailed"]
  },
  {
    title: "Dark Fantasy Knight",
    prompt: "dark fantasy armored knight, battle-worn plate armor with intricate engravings, wielding massive sword, standing in misty battlefield, dark souls aesthetic, gritty realistic, moody lighting, sense of weight and power, Frank Frazetta inspired, --ar 2:3 --v 6",
    tags: ["dark-fantasy", "knight", "armor", "battle", "gritty"]
  },
  {
    title: "Minimalist Logo Design",
    prompt: "minimalist geometric logo design, abstract mountain peaks formed by triangles, modern tech company, clean lines, monochromatic with single accent color teal, negative space, professional brand identity, scalable vector style, --ar 1:1 --v 6",
    tags: ["minimalist", "logo", "geometric", "design", "modern"]
  },
  {
    title: "Baroque Palace Interior",
    prompt: "ornate baroque palace hall, gilded decorations, crystal chandeliers, painted ceiling frescoes, marble floors, mirrors reflecting candlelight, opulent furniture, Versailles inspired, warm golden lighting, ultra detailed architecture, grandeur and luxury, --ar 16:9 --v 6",
    tags: ["baroque", "palace", "ornate", "luxury", "architectural"]
  },
  {
    title: "Concept Art Spaceship",
    prompt: "sci-fi concept art, massive capital spaceship in orbit, industrial design with exposed hull sections, glowing engine ports, tiny fighter ships nearby for scale, cinematic lighting, John Berkey style, detailed mechanical, space opera aesthetic, --ar 21:9 --v 6",
    tags: ["sci-fi", "concept-art", "spaceship", "industrial", "cinematic"]
  },
  {
    title: "Kawaii Character Illustration",
    prompt: "kawaii style cute character illustration, smiling bubble tea cup with arms and legs, big sparkling eyes, boba pearls, pastel pink and brown colors, chibi proportions, sticker style, white outline, adorable expression, --ar 1:1 --niji 5",
    tags: ["kawaii", "cute", "character", "chibi", "illustration"]
  },
  {
    title: "Film Noir Detective Scene",
    prompt: "film noir scene, hard-boiled detective in trench coat and fedora, standing in rain under streetlight, wet cobblestone street, dramatic shadows, high contrast black and white, 1940s aesthetic, cigarette smoke, venetian blind shadows, moody atmospheric, --ar 16:9 --v 6",
    tags: ["film-noir", "detective", "noir", "vintage", "dramatic"]
  },
  {
    title: "Stained Glass Window Art",
    prompt: "intricate stained glass window depicting phoenix rising, vibrant jewel tones ruby sapphire emerald, lead came outlines, light shining through creating colored shadows, gothic cathedral style, ornate religious art, masterful craftsmanship, --ar 2:3 --v 6",
    tags: ["stained-glass", "phoenix", "artistic", "colorful", "ornate"]
  },
  {
    title: "Isometric Game Asset",
    prompt: "isometric pixel art medieval tavern, detailed interior visible, wooden furniture, stone fireplace, cozy atmosphere, game asset style, clean pixels, warm color palette, soft lighting, RPG game environment, overhead 45 degree angle, --ar 1:1 --v 6",
    tags: ["isometric", "pixel-art", "game", "medieval", "detailed"]
  },
  {
    title: "Abstract Fluid Art",
    prompt: "abstract fluid acrylic pour painting, swirling organic shapes in turquoise gold and deep purple, metallic sheen, cellular patterns, high detail macro photography of paint, glossy finish, modern contemporary art, --ar 1:1 --v 6",
    tags: ["abstract", "fluid-art", "acrylic", "modern", "colorful"]
  },
  {
    title: "Steampunk Airship",
    prompt: "detailed steampunk airship design, brass and copper construction, multiple propellers, Victorian era aesthetic, steam venting from pipes, ornate details, floating above cloudy sky, technical illustration meets fantasy art, Jules Verne inspired, --ar 16:9 --v 6",
    tags: ["steampunk", "airship", "mechanical", "victorian", "detailed"]
  },
  {
    title: "Magical Girl Transformation",
    prompt: "magical girl anime transformation sequence, teenage girl surrounded by swirling ribbons of pink light, sparkles and stars, flowing hair, elegant pose, shoujo anime style, dreamy soft focus background, Sailor Moon aesthetic, --ar 9:16 --niji 5",
    tags: ["magical-girl", "anime", "transformation", "sparkles", "shoujo"]
  },
  {
    title: "Luxury Yacht Sunset",
    prompt: "luxury mega yacht at sunset, sleek white hull, multiple decks, floating on calm turquoise ocean, dramatic orange and purple sky, helicopter on deck, lifestyle photography, ultra wealthy aesthetic, professional marine photography, --ar 16:9 --style raw --v 6",
    tags: ["yacht", "luxury", "sunset", "ocean", "lifestyle"]
  },
  {
    title: "Gothic Horror Mansion",
    prompt: "gothic horror mansion on stormy night, Victorian architecture, overgrown with twisted vines, broken windows, lightning illuminating dark silhouette, full moon behind clouds, graveyard in foreground, atmospheric fog, Tim Burton style, --ar 2:3 --v 6",
    tags: ["gothic", "horror", "mansion", "atmospheric", "spooky"]
  },
  {
    title: "Samurai Warrior Portrait",
    prompt: "photorealistic samurai warrior in full traditional armor, detailed helmet with horns, holding katana in battle stance, cherry blossoms falling, misty mountain background, dramatic lighting, feudal Japan, intense expression, historical accuracy, --ar 2:3 --style raw --v 6",
    tags: ["samurai", "warrior", "japanese", "realistic", "historical"]
  },
  {
    title: "Art Deco Jazz Age Poster",
    prompt: "art deco 1920s jazz age poster, elegant flapper in gold dress, geometric patterns, limited color palette black gold cream, streamlined design, Great Gatsby aesthetic, prohibition era, Erte style illustration, sophisticated and glamorous, --ar 2:3 --v 6",
    tags: ["art-deco", "jazz-age", "1920s", "poster", "elegant"]
  },
  {
    title: "Bioluminescent Alien Forest",
    prompt: "bioluminescent alien forest at night, glowing plants in blues purples and greens, exotic flora, floating spores emitting light, two moons visible through canopy, otherworldly ecosystem, Avatar movie inspired, magical atmosphere, --ar 16:9 --v 6",
    tags: ["alien", "bioluminescent", "forest", "sci-fi", "glowing"]
  },
  {
    title: "Renaissance Oil Portrait",
    prompt: "Renaissance style oil painting portrait, noble lady in elaborate dress with lace collar, pearl necklace, dark background, Rembrandt lighting from single side, rich oil paint texture, classical composition, museum quality, 17th century Dutch masters style, --ar 3:4 --v 6",
    tags: ["renaissance", "portrait", "oil-painting", "classical", "masterpiece"]
  },
  {
    title: "Cute Woodland Creatures",
    prompt: "whimsical illustration of cute woodland creatures having tea party, anthropomorphic fox rabbit and squirrel, wearing Victorian clothing, tiny furniture, mushroom houses, soft watercolor style, children's book illustration, Beatrix Potter inspired, --ar 4:5 --niji 5",
    tags: ["cute", "woodland", "illustration", "whimsical", "watercolor"]
  },
  {
    title: "Brutalist Architecture",
    prompt: "brutalist concrete architecture, geometric angular building, raw exposed concrete, dramatic shadows, minimalist composition, strong lines and shapes, Soviet era aesthetic, architectural photography, overcast sky, stark and imposing, --ar 3:4 --style raw --v 6",
    tags: ["brutalist", "architecture", "concrete", "geometric", "minimalist"]
  },
  {
    title: "Watercolor Landscape",
    prompt: "soft watercolor landscape painting, rolling hills with wildflowers, distant mountains, fluffy clouds, translucent washes of color, visible brushstrokes and paper texture, peaceful countryside, impressionistic style, gentle and serene, --ar 16:9 --v 6",
    tags: ["watercolor", "landscape", "painting", "peaceful", "impressionistic"]
  },
  {
    title: "Cyberpunk Character Design",
    prompt: "cyberpunk netrunner character design, neon mohawk, cybernetic implants glowing blue, leather jacket with tech patches, confident pose, futuristic city background, character sheet with multiple angles, concept art style, --ar 3:4 --v 6",
    tags: ["cyberpunk", "character-design", "futuristic", "concept-art", "detailed"]
  },
  {
    title: "Macro Nature Photography",
    prompt: "extreme macro photography of dew drops on spider web at sunrise, each drop reflecting the environment, rainbow refractions, shallow depth of field, soft bokeh background, nature's geometry, award winning macro shot, --ar 4:5 --style raw --v 6",
    tags: ["macro", "nature", "photography", "dew", "detailed"]
  },
  {
    title: "Egyptian Hieroglyphic Art",
    prompt: "ancient Egyptian hieroglyphic wall art, papyrus style, Anubis and Egyptian gods, profile view figures, stylized animals and symbols, gold leaf accents on deep blue background, authentic historical style, museum artifact quality, --ar 16:9 --v 6",
    tags: ["egyptian", "hieroglyphic", "ancient", "historical", "artistic"]
  },
  {
    title: "Luxury Fashion Runway",
    prompt: "high fashion runway photography, model in dramatic haute couture gown with flowing fabric, avant-garde design, fashion week atmosphere, dramatic lighting, perfect pose, Vogue Italia quality, editorial excellence, --ar 9:16 --style raw --v 6",
    tags: ["fashion", "runway", "haute-couture", "editorial", "dramatic"]
  },
  {
    title: "Cosmic Space Nebula",
    prompt: "cosmic nebula in deep space, swirling clouds of purple pink and blue gas, newborn stars, Hubble telescope quality, cosmic dust, sense of infinite scale, astronomical photography, ultra detailed, colors enhanced, --ar 16:9 --v 6",
    tags: ["space", "nebula", "cosmic", "astronomy", "colorful"]
  },
  {
    title: "Medieval Illuminated Manuscript",
    prompt: "medieval illuminated manuscript page, ornate border decorations with gold leaf, Celtic knot patterns, Gothic script, detailed miniature painting of knights, vibrant pigments red blue gold, historical accuracy, Book of Kells inspired, --ar 3:4 --v 6",
    tags: ["medieval", "manuscript", "illuminated", "ornate", "historical"]
  },
  {
    title: "Tropical Cocktail Photography",
    prompt: "professional cocktail photography, exotic tropical drink in tiki mug, colorful layers, fresh fruit garnish, orchid flower, bamboo mat setting, tiki bar atmosphere, vibrant colors, commercial quality, appetizing presentation, --ar 4:5 --style raw --v 6",
    tags: ["cocktail", "tropical", "photography", "commercial", "colorful"]
  },
  {
    title: "Mecha Robot Design",
    prompt: "detailed mecha robot design, anime style giant robot, angular armor plating, glowing energy core, heroic pose, Japanese mecha aesthetic, Gundam inspired, technical details visible, dynamic composition, --ar 2:3 --niji 5",
    tags: ["mecha", "robot", "anime", "sci-fi", "design"]
  },
  {
    title: "Fairytale Castle",
    prompt: "whimsical fairytale castle on floating island, multiple towers with colorful flags, rainbow bridge connecting to clouds, magical atmosphere, Disney inspired, soft dreamy colors, children's illustration style, enchanted kingdom, --ar 16:9 --niji 5",
    tags: ["fairytale", "castle", "whimsical", "magical", "illustration"]
  },
  {
    title: "Street Art Graffiti Mural",
    prompt: "large scale street art graffiti mural, vibrant colors, abstract geometric shapes mixed with realistic portrait, spray paint texture, urban wall, modern street art style, bold and energetic, photorealistic rendering, --ar 16:9 --v 6",
    tags: ["street-art", "graffiti", "mural", "urban", "colorful"]
  },
  {
    title: "Zen Minimalist Still Life",
    prompt: "zen minimalist still life, single smooth stone balanced on raked sand, soft shadow, neutral earth tones, peaceful simplicity, Japanese aesthetic, meditation space, clean composition, calming atmosphere, --ar 1:1 --v 6",
    tags: ["zen", "minimalist", "still-life", "peaceful", "japanese"]
  },
  {
    title: "Viking Warrior Battle",
    prompt: "epic Viking warrior in midst of battle, detailed chainmail and fur, wielding battle axe, war paint and braided beard, stormy Nordic coastline background, dramatic action pose, cinematic lighting, historical accuracy meets fantasy, --ar 2:3 --v 6",
    tags: ["viking", "warrior", "battle", "epic", "historical"]
  },
  {
    title: "Art Nouveau Stained Glass",
    prompt: "art nouveau stained glass panel, flowing organic lines, peacock feathers motif, jewel tones emerald and sapphire, graceful feminine figure, floral elements, Alphonse Mucha style, decorative arts, elegant curves, --ar 2:3 --v 6",
    tags: ["art-nouveau", "stained-glass", "organic", "elegant", "decorative"]
  },
  {
    title: "Futuristic Cityscape Megastructure",
    prompt: "futuristic mega city with towering arcology buildings reaching into clouds, flying vehicles in organized lanes, holographic advertisements, clean energy infrastructure, optimistic sci-fi future, golden hour lighting, Syd Mead inspired, --ar 21:9 --v 6",
    tags: ["futuristic", "cityscape", "sci-fi", "megastructure", "optimistic"]
  },
  {
    title: "Cottagecore Aesthetic",
    prompt: "cottagecore aesthetic scene, cozy stone cottage with thatched roof, wildflower garden, laundry hanging on line, basket of fresh bread, countryside charm, soft warm sunlight, peaceful rural life, storybook quality, --ar 4:5 --v 6",
    tags: ["cottagecore", "cozy", "cottage", "rural", "peaceful"]
  },
  {
    title: "Realistic Dragon Eye Close-up",
    prompt: "extreme close-up of dragon eye, reptilian pupil, iridescent scales around eye socket, gold and green tones, intense detail, reflection of viewer in eye, photorealistic rendering, fantasy creature anatomy, --ar 1:1 --style raw --v 6",
    tags: ["dragon", "eye", "closeup", "realistic", "detailed"]
  }
];

// Stable Diffusion Prompts (50+)
const stableDiffusionPrompts = [
  {
    title: "Masterpiece Portrait Photography",
    prompt: "(masterpiece, best quality, highres, ultra-detailed), professional portrait photography, beautiful woman with long flowing hair, natural makeup, soft studio lighting, bokeh background, 85mm lens, f/1.4, shallow depth of field, photorealistic, detailed skin texture, film grain",
    tags: ["portrait", "photography", "realistic", "professional", "detailed"]
  },
  {
    title: "Anime Style Character Art",
    prompt: "(anime, high quality, detailed), full body anime girl character, blue eyes, long silver hair, mage outfit, magical staff, fantasy setting, soft shading, cel shading, vibrant colors, by popular pixiv artist, trending on artstation",
    tags: ["anime", "character", "fantasy", "detailed", "colorful"]
  },
  {
    title: "Cyberpunk Street Scene",
    prompt: "(masterpiece, best quality, 8k, ultra-detailed), cyberpunk city street at night, neon lights, rain reflections, crowds with umbrellas, holographic signs, flying cars, blade runner aesthetic, cinematic lighting, photorealistic, highly detailed",
    tags: ["cyberpunk", "cityscape", "neon", "detailed", "cinematic"]
  },
  {
    title: "Fantasy Landscape Scenery",
    prompt: "(high quality, detailed background, concept art), epic fantasy landscape, floating islands, waterfalls, ancient ruins, magical atmosphere, dramatic clouds, golden hour lighting, matte painting style, 4k resolution, trending on artstation",
    tags: ["fantasy", "landscape", "epic", "concept-art", "detailed"]
  },
  {
    title: "Photorealistic Food Photography",
    prompt: "(photorealistic, high resolution, professional), gourmet burger with sesame bun, melting cheese, fresh vegetables, studio lighting, commercial food photography, appetizing, highly detailed textures, 4k, sharp focus",
    tags: ["food", "photography", "realistic", "commercial", "detailed"]
  },
  {
    title: "Dark Fantasy Knight Armor",
    prompt: "(masterpiece, best quality, highly detailed), dark fantasy armored knight, intricate plate armor, glowing runes, standing in misty battlefield, dramatic lighting, dark souls inspired, realistic metal textures, cinematic composition",
    tags: ["dark-fantasy", "knight", "armor", "detailed", "dramatic"]
  },
  {
    title: "Cute Animal Portrait",
    prompt: "(high quality, highly detailed, kawaii), adorable fluffy cat with big eyes, soft fur texture, sitting in sunbeam, warm lighting, shallow depth of field, professional pet photography, 4k resolution, photorealistic",
    tags: ["cat", "cute", "animal", "realistic", "detailed"]
  },
  {
    title: "Sci-Fi Spaceship Interior",
    prompt: "(masterpiece, ultra-detailed, 8k), futuristic spaceship interior, holographic displays, clean white surfaces, blue accent lighting, large observation windows showing space, photorealistic, concept art, highly detailed",
    tags: ["sci-fi", "spaceship", "interior", "futuristic", "detailed"]
  },
  {
    title: "Watercolor Floral Art",
    prompt: "(high quality, artistic), beautiful watercolor painting of spring flowers, soft pastel colors, delicate petals, artistic brushstrokes, white background, botanical illustration style, detailed, gentle composition",
    tags: ["watercolor", "floral", "artistic", "pastel", "botanical"]
  },
  {
    title: "Urban Architecture Photography",
    prompt: "(photorealistic, high resolution, professional), modern glass skyscraper architecture, reflective surfaces, blue sky with clouds, urban photography, wide angle lens, dramatic perspective, highly detailed, 8k quality",
    tags: ["architecture", "urban", "photography", "modern", "detailed"]
  },
  {
    title: "Magical Forest Environment",
    prompt: "(masterpiece, high quality, detailed background), enchanted forest with glowing mushrooms, bioluminescent plants, fairy lights, mystical atmosphere, soft fog, magical realism, concept art style, vibrant colors, 4k",
    tags: ["forest", "magical", "enchanted", "bioluminescent", "atmospheric"]
  },
  {
    title: "Steampunk Character Design",
    prompt: "(high quality, detailed, concept art), steampunk inventor character, Victorian clothing, brass goggles, mechanical arm, workshop background, warm lighting, detailed mechanical elements, digital art, artstation quality",
    tags: ["steampunk", "character", "victorian", "mechanical", "detailed"]
  },
  {
    title: "Sunset Ocean Beach",
    prompt: "(photorealistic, 8k, highly detailed), beautiful beach at sunset, golden hour lighting, gentle waves, palm trees, tropical paradise, warm color palette, professional landscape photography, sharp focus, HDR",
    tags: ["beach", "sunset", "tropical", "realistic", "landscape"]
  },
  {
    title: "Dragon Fantasy Creature",
    prompt: "(masterpiece, best quality, ultra-detailed), majestic dragon with iridescent scales, spread wings, perched on mountain peak, dramatic sky, fantasy art, highly detailed scales and features, cinematic lighting, epic composition",
    tags: ["dragon", "fantasy", "creature", "epic", "detailed"]
  },
  {
    title: "Luxury Car Photography",
    prompt: "(photorealistic, professional, 8k), luxury sports car, sleek design, metallic paint, studio lighting, black background, commercial automotive photography, reflections, highly detailed, sharp focus, premium quality",
    tags: ["car", "luxury", "photography", "commercial", "detailed"]
  },
  {
    title: "Cozy Interior Living Room",
    prompt: "(high quality, detailed, architectural), cozy modern living room interior, warm lighting, comfortable furniture, plants, large windows, natural light, scandinavian design, photorealistic, 4k resolution, inviting atmosphere",
    tags: ["interior", "cozy", "modern", "realistic", "architectural"]
  },
  {
    title: "Anime Magical Girl",
    prompt: "(anime, best quality, detailed), magical girl transformation, pink and white outfit, flowing ribbons, sparkles, magical effects, shoujo anime style, cute face, detailed costume, vibrant colors, trending on pixiv",
    tags: ["anime", "magical-girl", "transformation", "cute", "colorful"]
  },
  {
    title: "Gothic Cathedral Architecture",
    prompt: "(masterpiece, ultra-detailed, 8k), gothic cathedral interior, stained glass windows, colorful light rays, stone arches, grand architecture, detailed stonework, majestic atmosphere, photorealistic, professional photography",
    tags: ["cathedral", "gothic", "architecture", "detailed", "majestic"]
  },
  {
    title: "Samurai Warrior Portrait",
    prompt: "(high quality, detailed, photorealistic), samurai warrior in traditional armor, katana sword, intense expression, dramatic lighting, cherry blossoms background, historical accuracy, highly detailed armor, cinematic composition",
    tags: ["samurai", "warrior", "japanese", "realistic", "detailed"]
  },
  {
    title: "Abstract Digital Art",
    prompt: "(high quality, artistic, 8k), abstract digital art, flowing geometric shapes, vibrant gradient colors, modern contemporary style, smooth gradients, visual harmony, wallpaper quality, highly detailed, professional",
    tags: ["abstract", "digital-art", "geometric", "modern", "colorful"]
  },
  {
    title: "Pixel Art Game Scene",
    prompt: "(pixel art, high quality, detailed), retro 16-bit pixel art game scene, medieval fantasy village, pixel perfect, vibrant colors, nostalgic game aesthetic, detailed sprites, clean pixels, isometric view",
    tags: ["pixel-art", "retro", "game", "medieval", "detailed"]
  },
  {
    title: "Realistic Eye Close-up",
    prompt: "(photorealistic, macro, ultra-detailed), extreme close-up of human eye, detailed iris patterns, reflections in eye, eyelashes, skin texture, professional macro photography, 8k resolution, sharp focus, natural lighting",
    tags: ["eye", "closeup", "macro", "realistic", "detailed"]
  },
  {
    title: "Autumn Forest Path",
    prompt: "(masterpiece, high quality, photorealistic), autumn forest path covered in colorful leaves, warm fall colors, sunlight filtering through trees, peaceful atmosphere, landscape photography, 4k resolution, HDR, detailed foliage",
    tags: ["autumn", "forest", "landscape", "peaceful", "realistic"]
  },
  {
    title: "Futuristic Robot Character",
    prompt: "(high quality, detailed, concept art), futuristic humanoid robot, sleek design, glowing blue accents, mechanical details, standing pose, sci-fi background, highly detailed mechanical parts, professional 3D render quality",
    tags: ["robot", "futuristic", "sci-fi", "mechanical", "detailed"]
  },
  {
    title: "Renaissance Oil Painting",
    prompt: "(masterpiece, oil painting, classical), Renaissance style portrait, noble person in period clothing, dark background, Rembrandt lighting, oil paint texture, museum quality, highly detailed, classical composition, rich colors",
    tags: ["renaissance", "oil-painting", "portrait", "classical", "detailed"]
  },
  {
    title: "Bioluminescent Jellyfish",
    prompt: "(high quality, detailed, photorealistic), glowing jellyfish in dark water, bioluminescent, translucent bell, flowing tentacles, blue and purple glow, underwater photography, black background, highly detailed, ethereal",
    tags: ["jellyfish", "bioluminescent", "underwater", "glowing", "detailed"]
  },
  {
    title: "Desert Landscape Dunes",
    prompt: "(masterpiece, photorealistic, 8k), vast desert landscape, sand dunes, dramatic shadows, clear blue sky, minimalist composition, golden hour lighting, landscape photography, highly detailed sand texture, serene atmosphere",
    tags: ["desert", "landscape", "minimalist", "realistic", "peaceful"]
  },
  {
    title: "Mecha Robot Anime",
    prompt: "(anime, best quality, highly detailed), giant mecha robot, Japanese anime style, dynamic pose, glowing energy effects, detailed mechanical design, Gundam inspired, action scene, vibrant colors, trending on pixiv",
    tags: ["mecha", "robot", "anime", "action", "detailed"]
  },
  {
    title: "Northern Lights Aurora",
    prompt: "(photorealistic, 8k, highly detailed), northern lights aurora borealis, green and purple colors dancing in sky, snowy landscape, stars visible, long exposure photography, natural phenomenon, breathtaking scenery, HDR",
    tags: ["aurora", "northern-lights", "landscape", "realistic", "dramatic"]
  },
  {
    title: "Vintage Retro Poster",
    prompt: "(high quality, vintage style), 1950s retro advertisement poster, bold typography, limited color palette, halftone texture, nostalgic aesthetic, vintage commercial art, clean design, period accurate",
    tags: ["vintage", "retro", "poster", "1950s", "design"]
  },
  {
    title: "Crystal Cave Formation",
    prompt: "(masterpiece, ultra-detailed, photorealistic), giant crystal cave, translucent blue crystals, natural lighting, geological wonder, highly detailed crystal structures, reflections, mystical atmosphere, 8k resolution",
    tags: ["crystal", "cave", "geological", "detailed", "mystical"]
  },
  {
    title: "Character Concept Sheet",
    prompt: "(high quality, concept art, detailed), full character design sheet, multiple views (front, side, back), fantasy warrior character, detailed costume, weapons, color palette, professional concept art, artstation quality",
    tags: ["character", "concept-art", "design-sheet", "fantasy", "detailed"]
  },
  {
    title: "Macro Flower Photography",
    prompt: "(photorealistic, macro, ultra-detailed), extreme close-up of flower petals, water droplets, soft focus background, natural lighting, detailed texture, professional macro photography, 8k resolution, sharp details, vibrant colors",
    tags: ["macro", "flower", "photography", "detailed", "realistic"]
  },
  {
    title: "Isometric City Block",
    prompt: "(high quality, detailed), isometric view of futuristic city block, clean pixel art style, detailed buildings, small characters, vibrant colors, game asset quality, organized composition, modern urban design",
    tags: ["isometric", "city", "game-asset", "detailed", "futuristic"]
  },
  {
    title: "Elven Forest Character",
    prompt: "(masterpiece, high quality, detailed), beautiful elf character in enchanted forest, long flowing hair, elegant clothing, magical atmosphere, soft lighting, fantasy art style, highly detailed face, professional digital painting",
    tags: ["elf", "fantasy", "character", "forest", "detailed"]
  },
  {
    title: "Noir Detective Scene",
    prompt: "(high quality, cinematic), film noir detective scene, 1940s aesthetic, dramatic shadows, venetian blind light patterns, rain outside window, monochromatic with slight color tint, moody atmosphere, cinematic composition",
    tags: ["noir", "detective", "vintage", "dramatic", "cinematic"]
  },
  {
    title: "Luxury Yacht Ocean",
    prompt: "(photorealistic, 8k, professional), luxury mega yacht on calm ocean, sunset lighting, reflections on water, detailed ship design, lifestyle photography, tropical setting, highly detailed, commercial quality",
    tags: ["yacht", "luxury", "ocean", "realistic", "professional"]
  },
  {
    title: "Volcanic Landscape Dramatic",
    prompt: "(masterpiece, photorealistic, ultra-detailed), active volcano erupting, lava flows, dramatic sky, smoke and ash, powerful natural forces, landscape photography, long exposure, intense colors, 8k resolution, epic scale",
    tags: ["volcano", "landscape", "dramatic", "nature", "epic"]
  },
  {
    title: "Cute Chibi Character",
    prompt: "(high quality, chibi, kawaii), adorable chibi character with large head, small body, big eyes, pastel colors, cute expression, simple background, anime style, detailed despite small size, charming design",
    tags: ["chibi", "cute", "kawaii", "anime", "character"]
  },
  {
    title: "Ancient Temple Ruins",
    prompt: "(masterpiece, detailed, photorealistic), ancient temple ruins overgrown with jungle vegetation, mysterious atmosphere, shafts of light through trees, moss covered stones, historical architecture, adventure aesthetic, 8k, highly detailed",
    tags: ["temple", "ruins", "ancient", "jungle", "atmospheric"]
  },
  {
    title: "Space Station Exterior",
    prompt: "(high quality, photorealistic, detailed), massive space station in Earth orbit, solar panels, detailed structure, planet in background, stars, realistic space environment, sci-fi, highly detailed mechanical parts, 8k",
    tags: ["space-station", "sci-fi", "orbit", "realistic", "detailed"]
  },
  {
    title: "Floral Wreath Design",
    prompt: "(high quality, artistic, detailed), decorative floral wreath, various flowers and leaves, watercolor style, soft colors, circular composition, botanical illustration, white background, elegant and delicate, 4k resolution",
    tags: ["floral", "wreath", "watercolor", "botanical", "elegant"]
  },
  {
    title: "Demon Fantasy Character",
    prompt: "(masterpiece, high quality, dark fantasy), demon character design, horns, glowing eyes, detailed features, dark atmosphere, dramatic lighting, fantasy art, highly detailed textures, professional digital art, artstation trending",
    tags: ["demon", "dark-fantasy", "character", "dramatic", "detailed"]
  },
  {
    title: "Mountain Lake Reflection",
    prompt: "(photorealistic, 8k, landscape), pristine mountain lake with perfect reflection, snow-capped peaks, clear water, pine trees, blue sky, landscape photography, highly detailed, serene atmosphere, HDR, natural beauty",
    tags: ["mountain", "lake", "reflection", "landscape", "realistic"]
  },
  {
    title: "Art Deco Building",
    prompt: "(high quality, architectural photography), Art Deco building facade, geometric patterns, gold accents, symmetrical composition, 1920s architecture, detailed ornamental elements, urban photography, professional quality, 8k",
    tags: ["art-deco", "architecture", "building", "geometric", "detailed"]
  },
  {
    title: "Cosmic Nebula Space",
    prompt: "(masterpiece, 8k, ultra-detailed), colorful cosmic nebula, swirling gas clouds, newborn stars, deep space, astronomical photography quality, vibrant purples pinks and blues, sense of scale, Hubble telescope inspired",
    tags: ["nebula", "space", "cosmic", "colorful", "detailed"]
  },
  {
    title: "Victorian Portrait Woman",
    prompt: "(high quality, period accurate, detailed), Victorian era woman portrait, elaborate dress with lace, historical clothing, studio photography style, soft lighting, sepia tones, detailed fabric textures, elegant pose",
    tags: ["victorian", "portrait", "historical", "elegant", "detailed"]
  },
  {
    title: "Superhero Character Action",
    prompt: "(masterpiece, dynamic, highly detailed), superhero character in action pose, cape flowing, dramatic lighting, cityscape background, comic book style meets photorealistic, vibrant colors, powerful composition, 8k quality",
    tags: ["superhero", "action", "dynamic", "comic", "detailed"]
  },
  {
    title: "Zen Garden Minimalist",
    prompt: "(high quality, minimalist, peaceful), Japanese zen rock garden, raked sand patterns, carefully placed stones, minimalist composition, serene atmosphere, soft natural lighting, clean aesthetic, meditative quality, 4k",
    tags: ["zen", "garden", "minimalist", "japanese", "peaceful"]
  },
  {
    title: "Graffiti Street Art",
    prompt: "(high quality, vibrant, detailed), colorful street art graffiti mural, urban wall, spray paint textures, bold colors, modern street art style, photorealistic rendering, artistic expression, detailed work, 8k resolution",
    tags: ["graffiti", "street-art", "urban", "colorful", "detailed"]
  }
];

// GPT-4o Prompts (50+)
const gpt4oPrompts = [
  {
    title: "AI-Enhanced Product Mockup",
    prompt: "Create a photorealistic product mockup showing a smartphone displaying a mobile app interface. The phone should be positioned at a slight angle on a clean white desk alongside a succulent plant, wireless earbuds, and a minimal coffee cup. Natural window lighting from the left creates soft shadows. The app interface shows a modern design with gradients.",
    tags: ["product", "mockup", "realistic", "technology", "professional"]
  },
  {
    title: "Data Visualization Infographic",
    prompt: "Design a modern infographic showing quarterly sales growth data. Use a clean, professional layout with bar charts and pie charts. Color scheme: blues and teals. Include icons representing different product categories. The style should be suitable for a business presentation, with clear hierarchy and easy-to-read statistics.",
    tags: ["infographic", "data", "business", "professional", "modern"]
  },
  {
    title: "Educational Science Diagram",
    prompt: "Create an educational diagram explaining the water cycle for middle school students. Include labeled illustrations of evaporation, condensation, precipitation, and collection. Use bright, engaging colors and simple, clear arrows showing the flow. Add small informative text boxes with fun facts. Make it visually appealing and easy to understand.",
    tags: ["educational", "diagram", "science", "illustration", "informative"]
  },
  {
    title: "Corporate Team Photo Concept",
    prompt: "Generate a professional corporate team photo setup in a modern office environment. Five diverse professionals in business casual attire, standing in a bright conference room with floor-to-ceiling windows showing a city view. Natural poses, genuine smiles, good spacing between people. Professional photography lighting.",
    tags: ["corporate", "team", "professional", "office", "realistic"]
  },
  {
    title: "Recipe Blog Hero Image",
    prompt: "Create an appetizing overhead shot of a freshly baked homemade pizza on a wooden cutting board. The pizza has melted mozzarella, fresh basil leaves, and cherry tomatoes. Surrounding items include a pizza cutter, red and white checkered napkin, olive oil bottle, and scattered basil leaves. Natural daylight, food photography style.",
    tags: ["food", "photography", "recipe", "appetizing", "overhead"]
  },
  {
    title: "Real Estate Listing Visualization",
    prompt: "Generate a photorealistic exterior view of a modern two-story suburban home at golden hour. The house features large windows, a mix of stone and wood siding, manicured lawn, and a paved driveway. Include landscaping with small trees and flowering bushes. Clear blue sky with some clouds. Professional real estate photography quality.",
    tags: ["real-estate", "architecture", "exterior", "realistic", "professional"]
  },
  {
    title: "Social Media Quote Graphic",
    prompt: "Design an Instagram-ready motivational quote graphic with the text 'Believe in yourself'. Use a modern minimalist aesthetic with a gradient background transitioning from soft peach to lavender. The text should be in elegant serif font, centered, with subtle decorative elements like small stars or sparkles. Square format, 1:1 aspect ratio.",
    tags: ["social-media", "quote", "motivational", "graphic-design", "modern"]
  },
  {
    title: "Technical Process Flowchart",
    prompt: "Create a clean, professional flowchart diagram showing a customer service escalation process. Use standard flowchart shapes (rectangles for processes, diamonds for decisions). Color code different types of actions: green for starts, blue for standard processes, yellow for review points, red for escalations. Include connecting arrows with labels.",
    tags: ["flowchart", "technical", "process", "diagram", "professional"]
  },
  {
    title: "Fitness App Interface Design",
    prompt: "Design a modern mobile fitness app home screen interface. Show a dashboard with daily step count, calories burned, workout progress ring, and upcoming workout cards. Use energetic colors like orange and teal. Include bottom navigation icons for home, workouts, nutrition, and profile. Clean UI with plenty of white space.",
    tags: ["ui-design", "fitness", "app", "mobile", "modern"]
  },
  {
    title: "Historical Event Recreation",
    prompt: "Create a historically accurate visualization of a 1920s jazz club interior. Show musicians on a small stage, art deco decor, intimate round tables with white tablecloths, period-dressed patrons, warm amber lighting from wall sconces, and a polished dance floor. Capture the glamorous atmosphere of the prohibition era.",
    tags: ["historical", "1920s", "interior", "atmospheric", "period"]
  },
  {
    title: "Environmental Awareness Poster",
    prompt: "Design an impactful environmental awareness poster about ocean plastic pollution. Show a sea turtle swimming, with plastic bags and bottles integrated into the composition. Use a color palette of ocean blues and greens with plastic in stark white. Include bold text: 'Save Our Oceans'. Modern, clean design suitable for educational campaigns.",
    tags: ["environmental", "poster", "awareness", "ocean", "design"]
  },
  {
    title: "Weather App Widget Design",
    prompt: "Create a beautiful weather widget display showing current conditions. Include a large temperature reading, weather icon (partly cloudy), location name, and hourly forecast for the next 6 hours at the bottom. Use a soft gradient background that reflects the time of day (morning). Modern, glassmorphism design style.",
    tags: ["weather", "widget", "ui-design", "modern", "interface"]
  },
  {
    title: "Book Cover Design Concept",
    prompt: "Design a compelling book cover for a mystery thriller novel titled 'Midnight in Venice'. Show a atmospheric view of a Venice canal at night with old buildings, a gondola, and moonlight reflecting on the water. Add mysterious shadows and fog. Title in bold serif font at top, author name at bottom. Professional publishing quality.",
    tags: ["book-cover", "design", "mystery", "atmospheric", "professional"]
  },
  {
    title: "Pet Grooming Service Ad",
    prompt: "Create a cheerful advertisement image for a pet grooming service. Show a happy, fluffy dog (golden retriever) after grooming with a bow tie, sitting in a bright, clean grooming salon. Include text space for 'Professional Pet Grooming' and contact information. Use warm, inviting colors. Professional commercial photography style.",
    tags: ["pet", "commercial", "advertisement", "cheerful", "professional"]
  },
  {
    title: "Virtual Meeting Background",
    prompt: "Design a professional virtual meeting background showing a modern, minimalist home office. Include a bookshelf with books and tasteful decor, a plant, and soft natural lighting. The composition should work well with a person in front. Slightly blurred to look realistic. Neutral, professional colors. 16:9 aspect ratio.",
    tags: ["virtual-background", "office", "professional", "modern", "minimal"]
  },
  {
    title: "Restaurant Menu Design",
    prompt: "Create an elegant restaurant menu page layout for an Italian bistro. Include sections for appetizers, mains, and desserts with dish names and prices. Use a sophisticated color scheme of cream, gold, and dark green. Add subtle Italian-inspired decorative elements like olive branches. Leave space for a small logo at top. Upscale dining aesthetic.",
    tags: ["menu", "restaurant", "design", "elegant", "layout"]
  },
  {
    title: "Sustainability Report Cover",
    prompt: "Design a corporate sustainability report cover for an annual report. Feature an image combining nature (green leaves, clean water) with modern industry (wind turbines, solar panels). Use the company's professional aesthetic with blues and greens. Include space for title 'Sustainability Report 2024' and company logo. Modern, optimistic tone.",
    tags: ["corporate", "sustainability", "report", "professional", "design"]
  },
  {
    title: "Travel Destination Showcase",
    prompt: "Create a stunning travel photography composition showcasing Santorini, Greece. Include the iconic white buildings with blue domes, overlooking the caldera, during golden hour. Bougainvillea flowers in foreground, Aegean Sea in background. Perfect for travel agency marketing materials. Professional travel photography quality, vibrant but natural colors.",
    tags: ["travel", "destination", "photography", "scenic", "professional"]
  },
  {
    title: "Podcast Cover Art",
    prompt: "Design eye-catching podcast cover art for a show about entrepreneurship titled 'Startup Stories'. Use a modern, bold graphic design approach with geometric shapes, vibrant gradient colors (purple to orange), and strong typography. Include a microphone icon element. Square format, must be readable at small sizes. Professional podcast branding.",
    tags: ["podcast", "cover-art", "design", "modern", "branding"]
  },
  {
    title: "Medical Procedure Explanation",
    prompt: "Create a clear, professional medical illustration showing a cross-section of dental implant placement. Use accurate anatomy with appropriate colors (bone in beige, gum tissue in pink, implant in silver). Include labels and arrows pointing to key components. Clean, educational style suitable for patient information materials. Easy to understand.",
    tags: ["medical", "illustration", "educational", "anatomical", "professional"]
  },
  {
    title: "E-commerce Product Banner",
    prompt: "Design a promotional banner for an e-commerce website's summer sale. Show summer products (sunglasses, hat, beach bag) arranged attractively on a bright background. Include bold text '40% OFF SUMMER COLLECTION'. Use vibrant, summery colors like coral, turquoise, and yellow. Web banner format, 1200x400 pixels, modern and clean.",
    tags: ["e-commerce", "banner", "promotional", "summer", "design"]
  },
  {
    title: "Architecture Concept Rendering",
    prompt: "Create a photorealistic architectural rendering of a modern sustainable office building. Features: green walls, large glass panels, solar panels on roof, natural wood accents. Show the building at dusk with interior lights glowing warmly. Include landscaped grounds with walkways and trees. Professional architectural visualization quality.",
    tags: ["architecture", "rendering", "modern", "sustainable", "professional"]
  },
  {
    title: "Children's Book Illustration",
    prompt: "Illustrate a whimsical children's book scene showing a friendly dragon and a young child having a tea party in a colorful garden. The dragon should look gentle and kind, with bright scales. Include flowers, butterflies, and a small table with teacups. Bright, cheerful colors. Suitable for ages 4-8. Storybook illustration style.",
    tags: ["children", "illustration", "storybook", "whimsical", "friendly"]
  },
  {
    title: "Nonprofit Campaign Visual",
    prompt: "Design an emotional campaign image for a children's education nonprofit. Show a diverse group of children in a classroom, engaged in learning, with bright natural lighting. Their faces show joy and concentration. Include space for text overlay. Color grading should be warm and hopeful. Professional nonprofit campaign photography quality.",
    tags: ["nonprofit", "campaign", "educational", "emotional", "professional"]
  },
  {
    title: "Tech Startup Landing Page",
    prompt: "Create a hero section image for a tech startup's website. Show modern professionals collaborating around a laptop in a bright, contemporary office space with plants and natural light. The scene should convey innovation, teamwork, and accessibility. Clean, professional photography style. Suitable for overlaying white text.",
    tags: ["tech", "startup", "landing-page", "professional", "modern"]
  },
  {
    title: "Seasonal Greeting Card",
    prompt: "Design a warm holiday greeting card with a cozy winter scene: a snow-covered cabin in the woods with smoke from the chimney, warm light glowing from windows, pine trees dusted with snow, and a full moon. Soft, peaceful color palette of blues, whites, and warm yellows. Include space for 'Season's Greetings' text.",
    tags: ["greeting-card", "holiday", "winter", "cozy", "seasonal"]
  },
  {
    title: "Fitness Progress Tracker",
    prompt: "Design a visual fitness progress tracker showing before and after comparison. Create a side-by-side layout with measurement indicators, progress graphs, and achievement badges. Use motivating colors like green for progress. Include icons for different fitness metrics (weight, strength, endurance). Clean, modern dashboard aesthetic.",
    tags: ["fitness", "tracker", "progress", "dashboard", "motivational"]
  },
  {
    title: "Coffee Shop Ambiance",
    prompt: "Create an inviting image of a specialty coffee shop interior during morning hours. Show a barista preparing coffee, customers reading or working on laptops, warm pendant lighting, plants, wooden furniture, chalkboard menu on wall. Natural morning light through windows. Professional lifestyle photography capturing the cozy atmosphere.",
    tags: ["coffee-shop", "interior", "lifestyle", "cozy", "professional"]
  },
  {
    title: "Event Invitation Design",
    prompt: "Design an elegant wedding invitation with a botanical theme. Include delicate watercolor flowers (roses and eucalyptus) framing the edges, elegant script font for names, and classic serif for details. Soft color palette of blush pink, sage green, and cream. Leave centered white space for text. Formal and romantic aesthetic.",
    tags: ["invitation", "wedding", "elegant", "botanical", "design"]
  },
  {
    title: "Safety Signage Illustration",
    prompt: "Create a clear, universal safety sign showing 'Emergency Exit'. Use the standard green and white color scheme. Include a running figure and directional arrow. The design should be simple, instantly recognizable, and meet safety signage standards. Clean vector-style illustration. Suitable for printing at various sizes.",
    tags: ["safety", "signage", "universal", "emergency", "clear"]
  },
  {
    title: "Brand Identity Mockup",
    prompt: "Create a brand identity mockup showcase for a coffee company. Display the logo on various items: coffee cup, bag of coffee beans, business cards, letterhead, and tote bag. Arrange items tastefully on a wooden surface with coffee beans scattered artistically. Natural lighting. Professional brand presentation style.",
    tags: ["branding", "mockup", "identity", "professional", "coffee"]
  },
  {
    title: "Online Course Thumbnail",
    prompt: "Design an engaging thumbnail for an online photography course. Show a DSLR camera with lens, alongside text 'Photography Masterclass'. Use a modern, clean layout with vibrant accent colors. Include subtle elements like aperture icons or light rays. Must be eye-catching at small sizes. Professional e-learning aesthetic. 16:9 format.",
    tags: ["course", "thumbnail", "education", "photography", "design"]
  },
  {
    title: "Magazine Editorial Layout",
    prompt: "Create a double-page spread magazine layout for a fashion editorial. Left page: large high-fashion photograph of a model in avant-garde clothing. Right page: article text in columns with a pull quote highlighted. Use sophisticated typography and plenty of white space. Modern editorial design, suitable for a luxury fashion magazine.",
    tags: ["magazine", "editorial", "layout", "fashion", "sophisticated"]
  },
  {
    title: "App Onboarding Screen",
    prompt: "Design the first onboarding screen for a meditation app. Show a peaceful illustration of a person meditating in a serene landscape (mountains, lake, sunset). Include welcoming text 'Find Your Inner Peace'. Use calming colors: soft purples, blues, and pinks. Clean, minimalist UI with a 'Continue' button at bottom. Mobile screen format.",
    tags: ["app", "onboarding", "meditation", "ui-design", "peaceful"]
  },
  {
    title: "Corporate Headshot Background",
    prompt: "Create a professional corporate headshot background setup. Soft gradient from medium gray to light gray, clean and neutral. Subtle vignette effect. The background should not compete with the subject and should work well for business profiles, LinkedIn, and company websites. Professional photography studio quality.",
    tags: ["corporate", "headshot", "professional", "background", "neutral"]
  },
  {
    title: "Packaging Design Concept",
    prompt: "Design packaging for organic herbal tea. Show a rectangular tea box with a window panel, featuring botanical illustrations of herbs (chamomile, lavender, mint). Use earthy, natural colors: greens, browns, cream. Include clear product information area. The design should convey natural, organic, premium quality. Suitable for retail display.",
    tags: ["packaging", "product", "organic", "design", "natural"]
  },
  {
    title: "Newsletter Header Image",
    prompt: "Create a header image for a monthly business newsletter. Show abstract geometric shapes and subtle gradients in professional blues and greens, suggesting growth and innovation. Include space for newsletter title overlay. Modern, clean design that works well in email format. 600x200 pixels, optimized for email clients.",
    tags: ["newsletter", "header", "business", "design", "professional"]
  },
  {
    title: "Retail Store Display",
    prompt: "Visualize an attractive retail store window display for a fashion boutique during autumn season. Mannequins dressed in fall collection (cozy sweaters, scarves), surrounded by autumn leaves, pumpkins, and warm lighting. The display should draw attention and invite customers in. Professional retail merchandising aesthetic.",
    tags: ["retail", "display", "fashion", "seasonal", "merchandising"]
  },
  {
    title: "Webinar Presentation Slide",
    prompt: "Design a professional webinar presentation slide showing key statistics. Use a clean layout with three large numbers and icons, each representing a different metric (growth, engagement, satisfaction). Corporate color scheme: navy blue and teal. Include plenty of white space. Modern, data-driven aesthetic suitable for business presentation.",
    tags: ["webinar", "presentation", "slide", "statistics", "professional"]
  },
  {
    title: "Charity Event Poster",
    prompt: "Create an inspiring poster for a charity run event. Show silhouettes of runners against a sunrise backdrop, conveying energy and hope. Include event title '5K For A Cause', date, and location. Use motivational colors: oranges, yellows, and blues. Professional event marketing design. Suitable for both print and digital use.",
    tags: ["charity", "event", "poster", "motivational", "design"]
  },
  {
    title: "Comparison Chart Graphic",
    prompt: "Design a clear comparison chart showing features of three subscription tiers (Basic, Pro, Premium). Use a table format with checkmarks and X marks, highlighting the premium tier with subtle color. Professional color scheme: greys, whites, and a brand accent color. Clean, easy to read typography. Suitable for website or presentation.",
    tags: ["comparison", "chart", "pricing", "professional", "clear"]
  },
  {
    title: "Learning App Character",
    prompt: "Create a friendly mascot character for a children's learning app. Design a cute owl wearing glasses, holding a book, with a warm smile. The style should be simple, colorful, and appealing to kids ages 6-10. Clean vector illustration style with bold outlines. The character should feel trustworthy and encouraging.",
    tags: ["character", "mascot", "educational", "children", "friendly"]
  },
  {
    title: "Luxury Brand Advertisement",
    prompt: "Create a sophisticated advertisement image for a luxury watch brand. Show a close-up of an elegant watch on a marble surface with soft, dramatic lighting highlighting the craftsmanship. Minimal composition with lots of negative space. Color palette: blacks, silvers, and deep blues. High-end commercial photography quality.",
    tags: ["luxury", "advertisement", "watch", "sophisticated", "commercial"]
  },
  {
    title: "Employee Recognition Certificate",
    prompt: "Design a professional employee recognition certificate template. Include a formal border design with subtle gold accents, company logo placeholder at top, space for employee name and achievement in center, and signature line at bottom. Professional and dignified aesthetic. Suitable for printing on premium paper.",
    tags: ["certificate", "recognition", "professional", "formal", "template"]
  },
  {
    title: "Social Cause Awareness",
    prompt: "Create an impactful awareness image for mental health advocacy. Show a person meditating peacefully in nature with warm, soft lighting. Include positive, supportive text space. Use calming colors: soft greens, blues, and warm neutrals. The image should convey hope, peace, and support. Professional campaign photography quality.",
    tags: ["mental-health", "awareness", "advocacy", "peaceful", "supportive"]
  },
  {
    title: "Recipe Card Template",
    prompt: "Design a clean recipe card template with sections for ingredients list, cooking instructions, prep time, and serving size. Include a space at top for a food photo. Use a warm, inviting color scheme with clear typography. Add subtle food-related decorative elements like utensil icons. Suitable for printing or digital sharing.",
    tags: ["recipe", "template", "food", "design", "organized"]
  },
  {
    title: "Festival Event Lineup",
    prompt: "Create a vibrant music festival lineup poster showcasing multiple artist names in varying font sizes based on billing. Use energetic colors like electric purple, cyan, and yellow on a dark background. Include festival name, date, and venue. Modern, youth-oriented design with dynamic typography. Suitable for social media and print.",
    tags: ["festival", "music", "poster", "vibrant", "typography"]
  },
  {
    title: "App Screenshot Mockup",
    prompt: "Create a professional app store screenshot mockup showing a messaging app interface on an iPhone. The screen displays a clean chat interface with messages, contact avatar, and send button. Use realistic iOS design elements. Include subtle drop shadow. The mockup should look professional for app store listing. Light mode interface.",
    tags: ["app", "screenshot", "mockup", "mobile", "professional"]
  },
  {
    title: "Year in Review Summary",
    prompt: "Design an annual 'Year in Review' infographic summarizing a company's achievements. Include key metrics with icons (revenue growth, new customers, products launched), timeline of major milestones, and thank you message. Use corporate brand colors with celebratory gold accents. Clean, professional layout suitable for annual report or social media.",
    tags: ["infographic", "annual-review", "corporate", "achievements", "professional"]
  }
];

async function main() {
  console.log('🚀 Adding generator-specific prompts...\n');

  const startId = 1000; // Start IDs after existing prompts
  let currentId = startId;
  let totalImported = 0;

  // Import DALL-E 3 prompts
  console.log('📥 Importing DALL-E 3 prompts...');
  for (const promptData of dallePrompts) {
    const slug = createSlug(promptData.title, 'dalle3');

    await prisma.prompts.create({
      data: {
        id: `prompt-${currentId}`,
        title: promptData.title,
        prompt: promptData.prompt,
        description: promptData.prompt.substring(0, 150) + '...',
        imageUrl: `https://placeholder.com/800x600?text=${encodeURIComponent(promptData.title.substring(0, 30))}`,
        category: 'dalle-3',
        generator: 'dall-e-3',
        complexity: promptData.prompt.split(/\s+/).length < 40 ? 'beginner' : promptData.prompt.split(/\s+/).length < 80 ? 'intermediate' : 'advanced',
        slug,
        tags: promptData.tags,
        views: Math.floor(Math.random() * 500) + 100,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 50) + 10,
        isFeatured: currentId % 20 === 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    currentId++;
    totalImported++;
  }
  console.log(`✅ Imported ${dallePrompts.length} DALL-E 3 prompts\n`);

  // Import Midjourney prompts
  console.log('📥 Importing Midjourney prompts...');
  for (const promptData of midjourneyPrompts) {
    const slug = createSlug(promptData.title, 'midjourney');

    await prisma.prompts.create({
      data: {
        id: `prompt-${currentId}`,
        title: promptData.title,
        prompt: promptData.prompt,
        description: promptData.prompt.substring(0, 150) + '...',
        imageUrl: `https://placeholder.com/800x600?text=${encodeURIComponent(promptData.title.substring(0, 30))}`,
        category: 'midjourney',
        generator: 'midjourney',
        complexity: promptData.prompt.includes('--ar') ? 'advanced' : 'intermediate',
        slug,
        tags: promptData.tags,
        views: Math.floor(Math.random() * 500) + 100,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 50) + 10,
        isFeatured: currentId % 20 === 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    currentId++;
    totalImported++;
  }
  console.log(`✅ Imported ${midjourneyPrompts.length} Midjourney prompts\n`);

  // Import Stable Diffusion prompts
  console.log('📥 Importing Stable Diffusion prompts...');
  for (const promptData of stableDiffusionPrompts) {
    const slug = createSlug(promptData.title, 'sd');

    await prisma.prompts.create({
      data: {
        id: `prompt-${currentId}`,
        title: promptData.title,
        prompt: promptData.prompt,
        description: promptData.prompt.substring(0, 150) + '...',
        imageUrl: `https://placeholder.com/800x600?text=${encodeURIComponent(promptData.title.substring(0, 30))}`,
        category: 'stable-diffusion',
        generator: 'stable-diffusion',
        complexity: promptData.prompt.includes('8k') || promptData.prompt.includes('ultra-detailed') ? 'advanced' : 'intermediate',
        slug,
        tags: promptData.tags,
        views: Math.floor(Math.random() * 500) + 100,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 50) + 10,
        isFeatured: currentId % 20 === 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    currentId++;
    totalImported++;
  }
  console.log(`✅ Imported ${stableDiffusionPrompts.length} Stable Diffusion prompts\n`);

  // Import GPT-4o prompts
  console.log('📥 Importing GPT-4o prompts...');
  for (const promptData of gpt4oPrompts) {
    const slug = createSlug(promptData.title, 'gpt4o');

    await prisma.prompts.create({
      data: {
        id: `prompt-${currentId}`,
        title: promptData.title,
        prompt: promptData.prompt,
        description: promptData.prompt.substring(0, 150) + '...',
        imageUrl: `https://placeholder.com/800x600?text=${encodeURIComponent(promptData.title.substring(0, 30))}`,
        category: 'gpt-4o',
        generator: 'gpt-4o',
        complexity: promptData.prompt.split(/\s+/).length < 40 ? 'beginner' : promptData.prompt.split(/\s+/).length < 80 ? 'intermediate' : 'advanced',
        slug,
        tags: promptData.tags,
        views: Math.floor(Math.random() * 500) + 100,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 50) + 10,
        isFeatured: currentId % 20 === 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    currentId++;
    totalImported++;
  }
  console.log(`✅ Imported ${gpt4oPrompts.length} GPT-4o prompts\n`);

  // Update category counts
  console.log('📊 Updating category counts...');
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

  // Final summary
  console.log('📈 Import Summary:');
  console.log('─────────────────────────────────');
  console.log(`Total prompts added: ${totalImported}`);
  console.log(`  - DALL-E 3: ${dallePrompts.length}`);
  console.log(`  - Midjourney: ${midjourneyPrompts.length}`);
  console.log(`  - Stable Diffusion: ${stableDiffusionPrompts.length}`);
  console.log(`  - GPT-4o: ${gpt4oPrompts.length}`);

  console.log('\nUpdated category breakdown:');
  for (const category of categories) {
    const updatedCategory = await prisma.categories.findUnique({
      where: { id: category.id }
    });
    console.log(`  ${updatedCategory.name}: ${updatedCategory.promptCount} prompts`);
  }

  const totalPromptsNow = await prisma.prompts.count();
  console.log(`\nTotal prompts in database: ${totalPromptsNow}`);

  console.log('\n✨ All generator-specific prompts added successfully!');
}

main()
  .catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
