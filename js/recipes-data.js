/**
 * Savoria - Global Culinary Database
 * Comprehensive authentic world recipes with step-by-step instructions,
 * timers, nutritional info, ingredients with category and unit scaling,
 * and chef tips.
 */

const CUISINES = [
  { id: 'all', name: 'All Cuisines', icon: '🌐', count: 12 },
  { id: 'italian', name: 'Italian', icon: '🇮🇹', count: 2, banner: 'Essence of fresh herbs, rich ragùs, and artisanal doughs.' },
  { id: 'japanese', name: 'Japanese', icon: '🇯🇵', count: 2, banner: 'Balance of umami, precision slicing, and delicate broths.' },
  { id: 'indian', name: 'Indian', icon: '🇮🇳', count: 2, banner: 'Symphony of roasted spices, velvety curries, and hearth breads.' },
  { id: 'mexican', name: 'Mexican', icon: '🇲🇽', count: 2, banner: 'Vibrant chiles, smoky charred salsas, and slow-braised meats.' },
  { id: 'thai', name: 'Thai', icon: '🇹🇭', count: 2, banner: 'Harmonious interplay of sweet, sour, salty, and fiery heat.' },
  { id: 'french', name: 'French', icon: '🇫🇷', count: 1, banner: 'Foundational culinary techniques, rich reductions, and buttery finishes.' },
  { id: 'mediterranean', name: 'Mediterranean', icon: '🇬🇷', count: 1, banner: 'Sun-drenched olive oils, garlic, oregano, and zesty citrus.' },
  { id: 'moroccan', name: 'Moroccan', icon: '🇲🇦', count: 1, banner: 'Slow clay-pot tagines with saffron, preserved lemon, and warm cinnamon.' }
];

const DIETARY_FILTERS = [
  { id: 'all', label: 'All Diets' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'high-protein', label: 'High Protein' },
  { id: 'quick', label: 'Under 35 Mins' }
];

const PANTRY_ITEMS = [
  'Garlic', 'Olive Oil', 'Onion', 'Tomatoes', 'Chicken',
  'Rice', 'Pasta', 'Soy Sauce', 'Ginger', 'Eggs',
  'Butter', 'Cumin', 'Chili Peppers', 'Lemon', 'Parmesan'
];

const RECIPES = [
  {
    id: 'tagliatelle-bolognese',
    title: 'Authentic Tagliatelle al Ragù Bolognese',
    cuisine: 'italian',
    cuisineLabel: 'Italian',
    flag: '🇮🇹',
    origin: 'Bologna, Emilia-Romagna, Italy',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281744?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Medium',
    prepTime: 25,
    cookTime: 120,
    totalTime: 145,
    calories: 680,
    servings: 4,
    rating: 4.9,
    reviewsCount: 342,
    spiceLevel: 0,
    dietary: ['high-protein'],
    summary: 'The benchmark of Northern Italian gastronomy. Slow-braised minced beef and pork simmered in milk, dry white wine, and sweet soffritto, clinging to silky golden tagliatelle ribbons.',
    chefTip: 'Never use spaghetti! Authentic Bolognese ragù clings to wide tagliatelle ribbons or tube pasta like rigatoni. Cook the milk first to tenderize the meat fibers before adding wine.',
    winePairing: 'Sangiovese di Romagna or full-bodied Chianti Classico Riserva',
    nutrition: {
      calories: 680,
      protein: '38g',
      carbs: '62g',
      fat: '31g',
      fiber: '4g'
    },
    ingredients: [
      { name: 'Ground Beef Chuck (coarse grind)', amount: 400, unit: 'g', imperialAmount: 14, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Ground Pork Shoulder', amount: 200, unit: 'g', imperialAmount: 7, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Pancetta (finely diced)', amount: 100, unit: 'g', imperialAmount: 3.5, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Yellow Onion (finely minced)', amount: 1, unit: 'med', imperialAmount: 1, imperialUnit: 'med', category: 'Produce' },
      { name: 'Celery Rib (finely minced)', amount: 1, unit: 'stalk', imperialAmount: 1, imperialUnit: 'stalk', category: 'Produce' },
      { name: 'Carrot (finely minced)', amount: 1, unit: 'med', imperialAmount: 1, imperialUnit: 'med', category: 'Produce' },
      { name: 'Whole Milk', amount: 250, unit: 'ml', imperialAmount: 1, imperialUnit: 'cup', category: 'Dairy' },
      { name: 'Dry White Wine', amount: 250, unit: 'ml', imperialAmount: 1, imperialUnit: 'cup', category: 'Pantry' },
      { name: 'San Marzano Tomato Passata', amount: 350, unit: 'ml', imperialAmount: 1.5, imperialUnit: 'cups', category: 'Pantry' },
      { name: 'Beef or Bone Broth', amount: 300, unit: 'ml', imperialAmount: 1.25, imperialUnit: 'cups', category: 'Pantry' },
      { name: 'Extra Virgin Olive Oil', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Unsalted Butter', amount: 30, unit: 'g', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Dairy' },
      { name: 'Fresh Egg Tagliatelle', amount: 400, unit: 'g', imperialAmount: 14, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Parmigiano-Reggiano (freshly grated)', amount: 60, unit: 'g', imperialAmount: 0.5, imperialUnit: 'cup', category: 'Dairy' },
      { name: 'Nutmeg & Sea Salt', amount: 1, unit: 'pinch', imperialAmount: 1, imperialUnit: 'pinch', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Soffritto Foundation',
        text: 'In a heavy enameled Dutch oven, melt butter with olive oil over medium-low heat. Add the diced pancetta and render fat for 5 minutes until lightly golden. Add the minced onion, celery, and carrot. Sweat gently for 10 minutes until soft and fragrant without browning.',
        technique: 'Sweating aromatics on low heat releases deep natural sweetness without bitterness.',
        timerSeconds: 600
      },
      {
        stepNumber: 2,
        title: 'Brown Meats Gently',
        text: 'Increase heat to medium. Add the ground beef and pork. Break down into tiny crumbles using a wooden spoon. Cook just until meat loses its raw pink color (about 6-8 minutes). Do not crisp or scorch.',
        technique: 'Bolognese meat is gently poached in its fats rather than hard-seared.',
        timerSeconds: 480
      },
      {
        stepNumber: 3,
        title: 'The Milk Infusion',
        text: 'Pour in the whole milk and grate in fresh nutmeg with a pinch of sea salt. Simmer gently over medium heat, stirring occasionally, until the milk has evaporated completely into the meat.',
        technique: 'Milk protects the meat fibers from the acid of wine and tomatoes, keeping it melt-in-mouth tender.',
        timerSeconds: 900
      },
      {
        stepNumber: 4,
        title: 'Deglaze with White Wine',
        text: 'Pour in dry white wine. Scrape any delicate pan residue and simmer over medium heat until the wine has reduced completely and the fragrance changes from sharp alcohol to sweet grape aroma.',
        technique: 'Northern Italian purists use crisp white wine instead of heavy red wine for balanced elegance.',
        timerSeconds: 600
      },
      {
        stepNumber: 5,
        title: 'Slow Gentle Simmer',
        text: 'Stir in tomato passata and half of the warm beef broth. Lower heat to the lowest possible flame so only gentle bubbles surface occasionally. Cover partially with lid and simmer for 2 to 2.5 hours, stirring every 20 minutes and adding remaining broth as needed.',
        technique: 'Low heat transformation creates an emulsion where gelatin from meat and fats harmonize.',
        timerSeconds: 7200
      },
      {
        stepNumber: 6,
        title: 'Finish & Toss Tagliatelle',
        text: 'Bring a large pot of salted water to rolling boil. Drop fresh tagliatelle for just 2 to 3 minutes until al dente. Reserve half a cup of starchy pasta water. Drain pasta and transfer directly into the warm ragù pan with a knob of butter and a splash of pasta water. Toss vigorously off-heat for 60 seconds. Plate and shower with Parmigiano-Reggiano.',
        technique: 'Mantecatura: Vigorously tossing pasta emulsifies fats and pasta starch into velvet sauce.',
        timerSeconds: 180
      }
    ]
  },
  {
    id: 'tokyo-shoyu-ramen',
    title: 'Artisanal Tokyo Shoyu Ramen with Chashu',
    cuisine: 'japanese',
    cuisineLabel: 'Japanese',
    flag: '🇯🇵',
    origin: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Hard',
    prepTime: 35,
    cookTime: 180,
    totalTime: 215,
    calories: 720,
    servings: 4,
    rating: 5.0,
    reviewsCount: 512,
    spiceLevel: 1,
    dietary: ['high-protein'],
    summary: 'A golden double-broth of roast chicken and dashi steeped with kombu and bonito flakes, seasoned with aged soy tare, topped with melt-in-mouth rolled pork belly chashu and jammy ajitsuke tamago.',
    chefTip: 'Never boil ramen noodles in your broth! Boil in abundant clean unsalted water and shake out all excess water with a noodle basket before sliding into the bowl with hot soup.',
    winePairing: 'Dry Junmai Ginjo Sake or cold Japanese Rice Lager (Asahi Super Dry)',
    nutrition: {
      calories: 720,
      protein: '42g',
      carbs: '74g',
      fat: '28g',
      fiber: '3g'
    },
    ingredients: [
      { name: 'Fresh Alkaline Ramen Noodles', amount: 480, unit: 'g', imperialAmount: 17, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Pork Belly (rolled & tied)', amount: 600, unit: 'g', imperialAmount: 21, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Chicken Bones & Wings', amount: 1000, unit: 'g', imperialAmount: 35, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Japanese Soy Sauce (Koikuchi)', amount: 150, unit: 'ml', imperialAmount: 0.6, imperialUnit: 'cup', category: 'Pantry' },
      { name: 'Mirin (sweet rice wine)', amount: 100, unit: 'ml', imperialAmount: 0.4, imperialUnit: 'cup', category: 'Pantry' },
      { name: 'Sake', amount: 80, unit: 'ml', imperialAmount: 0.3, imperialUnit: 'cup', category: 'Pantry' },
      { name: 'Kombu Kelp sheet', amount: 15, unit: 'g', imperialAmount: 0.5, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Katsuobushi (bonito flakes)', amount: 25, unit: 'g', imperialAmount: 0.9, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Ajitsuke Tamago (Ramen eggs)', amount: 4, unit: 'pcs', imperialAmount: 4, imperialUnit: 'pcs', category: 'Dairy' },
      { name: 'Scallions / Negi (thinly sliced)', amount: 4, unit: 'stalks', imperialAmount: 4, imperialUnit: 'stalks', category: 'Produce' },
      { name: 'Fresh Ginger (sliced)', amount: 40, unit: 'g', imperialAmount: 1.4, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Garlic Cloves (crushed)', amount: 6, unit: 'cloves', imperialAmount: 6, imperialUnit: 'cloves', category: 'Produce' },
      { name: 'Toasted Nori Seaweed sheets', amount: 4, unit: 'sheets', imperialAmount: 4, imperialUnit: 'sheets', category: 'Pantry' },
      { name: 'Menma (seasoned bamboo shoots)', amount: 80, unit: 'g', imperialAmount: 2.8, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Aromatic Scallion Oil', amount: 4, unit: 'tbsp', imperialAmount: 4, imperialUnit: 'tbsp', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Double Broth Simmer',
        text: 'Blanch chicken bones in boiling water for 3 minutes, then rinse cleanly. Place in a tall stockpot with 3 liters of fresh cold water, ginger, garlic, and leek greens. Bring to gentle simmer and skim off all scum. Simmer on low heat for 3 hours for crystal-clear golden broth. In the last 30 minutes, steep kombu and katsuobushi.',
        technique: 'Never let the broth reach a rolling boil; high turbulence creates cloudy soup rather than pristine chintan.',
        timerSeconds: 10800
      },
      {
        stepNumber: 2,
        title: 'Chashu Pork Braise',
        text: 'Sear rolled pork belly on all sides in a hot skillet until bronze. Transfer to a saucepan with soy sauce, mirin, sake, water, and brown sugar. Simmer covered on gentle heat for 90 minutes until fork-tender. Chill in liquid before thinly slicing.',
        technique: 'Chilling pork before slicing produces restaurant-grade immaculate round cuts without falling apart.',
        timerSeconds: 5400
      },
      {
        stepNumber: 3,
        title: 'Shoyu Tare & Aroma Oil',
        text: 'Reduce braising liquid with additional dark soy, kombu extract, and sea salt. Heat lard or neutral oil with scallion whites and garlic until caramelized to yield fragrant aroma oil (Mayu/Kiyu).',
        technique: 'The aroma oil forms a thin hot film on the ramen surface that locks in heat and hits the nose first.',
        timerSeconds: 900
      },
      {
        stepNumber: 4,
        title: 'Assemble the Masterpiece',
        text: 'Preheat serving bowls with boiling water, then empty. In each bowl, add 2 tbsp Tare and 1 tbsp hot aroma oil. Boil fresh ramen noodles in rolling water for exactly 75 to 90 seconds. Strain aggressively. Pour 350ml hot clear broth into each bowl, fold noodles in an S-curve, and top with chashu slices, halved ramen egg, menma, scallions, and crisp nori.',
        technique: 'Speed is king: ramen must be served within 45 seconds of noodles leaving boiling water.',
        timerSeconds: 90
      }
    ]
  },
  {
    id: 'murgh-makhani-butter-chicken',
    title: 'Royal Delhi Butter Chicken (Murgh Makhani)',
    cuisine: 'indian',
    cuisineLabel: 'Indian',
    flag: '🇮🇳',
    origin: 'Old Delhi, India',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Medium',
    prepTime: 30,
    cookTime: 45,
    totalTime: 75,
    calories: 610,
    servings: 4,
    rating: 4.95,
    reviewsCount: 680,
    spiceLevel: 2,
    dietary: ['high-protein', 'gluten-free'],
    summary: 'Tender tandoori-marinated chicken thighs charred over high heat, bathed in a velvety makhani gravy of San Marzano tomatoes, cashew cream, rich butter, and crushed Kasuri methi (fenugreek).',
    chefTip: 'Kasuri Methi (dried fenugreek leaves) is non-negotiable! Rub it between your warm palms right before sprinkling into the simmer to release aromatic essential oils.',
    winePairing: 'Off-dry German Riesling or refreshing Mango Lassi',
    nutrition: {
      calories: 610,
      protein: '45g',
      carbs: '22g',
      fat: '38g',
      fiber: '4g'
    },
    ingredients: [
      { name: 'Boneless Skinless Chicken Thighs', amount: 750, unit: 'g', imperialAmount: 26, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Greek Yogurt (thick curd)', amount: 150, unit: 'g', imperialAmount: 0.6, imperialUnit: 'cup', category: 'Dairy' },
      { name: 'Kashmiri Chili Powder (vibrant & mild)', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Spices' },
      { name: 'Ginger-Garlic Paste (fresh)', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Produce' },
      { name: 'Garam Masala', amount: 1.5, unit: 'tsp', imperialAmount: 1.5, imperialUnit: 'tsp', category: 'Spices' },
      { name: 'Ripe Vine Tomatoes (pureed)', amount: 800, unit: 'g', imperialAmount: 28, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Raw Cashews (soaked in warm water)', amount: 60, unit: 'g', imperialAmount: 0.5, imperialUnit: 'cup', category: 'Pantry' },
      { name: 'Unsalted Butter (cold cubed)', amount: 75, unit: 'g', imperialAmount: 5, imperialUnit: 'tbsp', category: 'Dairy' },
      { name: 'Heavy Cream', amount: 100, unit: 'ml', imperialAmount: 0.4, imperialUnit: 'cup', category: 'Dairy' },
      { name: 'Kasuri Methi (dried fenugreek leaves)', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Spices' },
      { name: 'Green Cardamom Pods (bruised)', amount: 4, unit: 'pods', imperialAmount: 4, imperialUnit: 'pods', category: 'Spices' },
      { name: 'Honey or Jaggery', amount: 1, unit: 'tbsp', imperialAmount: 1, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Mustard Oil or Ghee', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Double Marinate Chicken',
        text: 'Cut chicken into bite-sized chunks. Rub first with lemon juice, salt, and 1 tbsp Kashmiri chili; rest 15 mins. Add Greek yogurt, 2 tbsp ginger-garlic paste, garam masala, and mustard oil. Massage thoroughly and marinate for at least 1 hour (overnight is best).',
        technique: 'Yogurt acids and enzymes tenderize chicken meat without making it mushy.',
        timerSeconds: 3600
      },
      {
        stepNumber: 2,
        title: 'Tandoori-Style Charring',
        text: 'Preheat oven to max broil or fire up a smoking hot cast-iron grill pan. Thread chicken onto skewers or arrange on rack. Char chicken for 12-14 minutes, turning once, until edges show dark caramelized spots and juices run clear.',
        technique: 'The smoky charred crust creates authentic tandoor depth when combined with sweet gravy.',
        timerSeconds: 780
      },
      {
        stepNumber: 3,
        title: 'Silky Makhani Gravy',
        text: 'In a deep pot, melt 2 tbsp butter with green cardamoms. Add remaining ginger-garlic paste, sauté 1 min. Add pureed tomatoes, salt, and remaining Kashmiri chili. Simmer 18 minutes until oil separates. Blend the soaked cashews with 100ml water until silky smooth, then pour into the tomato sauce.',
        technique: 'Cashew paste provides the signature royal body and natural sweetness without excessive flour or starch.',
        timerSeconds: 1200
      },
      {
        stepNumber: 4,
        title: 'Harmonize & Finish with Kasuri Methi',
        text: 'Stir charred chicken into the bubbling gravy. Simmer gently for 8 minutes to absorb flavors. Whisk in heavy cream, honey, and remaining cold butter cubes for a mirror gloss. Crush Kasuri methi between palms and stir in. Serve bubbling with hot garlic butter naan.',
        technique: 'Cold butter whisked into hot sauce creates a silky restaurant-quality emulsion (monter au beurre).',
        timerSeconds: 480
      }
    ]
  },
  {
    id: 'birria-de-res-tacos',
    title: 'Slow-Braised Birria de Res Tacos con Consomé',
    cuisine: 'mexican',
    cuisineLabel: 'Mexican',
    flag: '🇲🇽',
    origin: 'Jalisco, Mexico',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Medium',
    prepTime: 30,
    cookTime: 180,
    totalTime: 210,
    calories: 780,
    servings: 6,
    rating: 4.98,
    reviewsCount: 890,
    spiceLevel: 2,
    dietary: ['high-protein', 'gluten-free'],
    summary: 'Shredded beef shank and chuck slow-braised in an earthy adobo of guajillo, ancho, and chipotle chiles. Corn tortillas dipped in rendered crimson chili fat, griddled with Oaxaca cheese, and served with rich dipping consomé.',
    chefTip: 'Skim the fragrant crimson tallow that floats on top of the braising pot! That chili-scented fat is what you dip the tortillas in before crisping on the flat top.',
    winePairing: 'Mexican Michelada, cold Negra Modelo, or fresh Hibiscus Agua de Jamaica',
    nutrition: {
      calories: 780,
      protein: '52g',
      carbs: '48g',
      fat: '42g',
      fiber: '6g'
    },
    ingredients: [
      { name: 'Beef Chuck Roast & Bone-in Shank', amount: 1400, unit: 'g', imperialAmount: 3.1, imperialUnit: 'lbs', category: 'Protein' },
      { name: 'Dried Guajillo Chiles (stemmed & seeded)', amount: 6, unit: 'pcs', imperialAmount: 6, imperialUnit: 'pcs', category: 'Spices' },
      { name: 'Dried Ancho Chiles', amount: 3, unit: 'pcs', imperialAmount: 3, imperialUnit: 'pcs', category: 'Spices' },
      { name: 'Chipotles in Adobo sauce', amount: 2, unit: 'pcs', imperialAmount: 2, imperialUnit: 'pcs', category: 'Pantry' },
      { name: 'Oaxaca or Monterey Jack Cheese (shredded)', amount: 350, unit: 'g', imperialAmount: 12, imperialUnit: 'oz', category: 'Dairy' },
      { name: 'Yellow Corn Tortillas', amount: 16, unit: 'pcs', imperialAmount: 16, imperialUnit: 'pcs', category: 'Pantry' },
      { name: 'White Onion & Fresh Cilantro (diced)', amount: 1, unit: 'cup', imperialAmount: 1, imperialUnit: 'cup', category: 'Produce' },
      { name: 'Mexican Oregano & Ground Cumin', amount: 1, unit: 'tbsp', imperialAmount: 1, imperialUnit: 'tbsp', category: 'Spices' },
      { name: 'Cinnamon Stick & Cloves', amount: 1, unit: 'stick', imperialAmount: 1, imperialUnit: 'stick', category: 'Spices' },
      { name: 'Apple Cider Vinegar', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Beef Bone Broth', amount: 1000, unit: 'ml', imperialAmount: 4, imperialUnit: 'cups', category: 'Pantry' },
      { name: 'Fresh Lime Wedges', amount: 3, unit: 'limes', imperialAmount: 3, imperialUnit: 'limes', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Toast Chiles & Prepare Adobo',
        text: 'In a dry skillet over medium heat, toast seeded guajillo and ancho chiles for 15-20 seconds per side until fragrant. Transfer into hot water to soften for 15 mins. Blend softened chiles with chipotles, garlic, roasted onion, vinegar, cumin, oregano, and 1 cup broth until ultra-smooth. Strain if needed.',
        technique: 'Toasting dried chiles awakens essential capsaicin oils and nuttiness; do not scorch or they turn bitter.',
        timerSeconds: 900
      },
      {
        stepNumber: 2,
        title: 'Sear & Slow Braise Beef',
        text: 'Season beef chunks heavily with coarse sea salt. In a heavy Dutch oven, sear beef in hot oil on high until dark mahogany crusted. Pour the chili adobo and remaining beef broth over meat. Drop cinnamon stick and bay leaves. Cover tightly and braise on low simmer (or 300°F / 150°C oven) for 3 hours until spoon-tender.',
        technique: 'Braised chuck + bone-in shank imparts rich collagen into the liquid for silky dipping consomé.',
        timerSeconds: 10800
      },
      {
        stepNumber: 3,
        title: 'Shred Meat & Collect Chili Fat',
        text: 'Remove beef to a carving board and shred into succulent ribbons using two forks. Ladle the top layer of shimmering red chili fat into a bowl for taco assembly. Keep shredded meat moist with ladles of hot broth.',
        technique: 'Separating the seasoned surface fat gives you the signature red glow on your taco shells.',
        timerSeconds: 600
      },
      {
        stepNumber: 4,
        title: 'Crisp Quesabirria on the Comal',
        text: 'Heat a cast-iron skillet or comal to medium-high. Dip a corn tortilla lightly into the reserved red beef fat and place flat on the griddle. Top with a layer of shredded Oaxaca cheese and juicy birria meat. Fold in half into a crescent. Crisp 2 minutes per side until crunchy and molten cheese oozes out. Serve with hot cups of consomé garnished with onion and cilantro.',
        technique: 'Dip tortillas quickly so they absorb seasoning without becoming soggy before hitting the hot pan.',
        timerSeconds: 240
      }
    ]
  },
  {
    id: 'pad-thai-kung',
    title: 'Street-Style Pad Thai Kung (Fresh Prawns)',
    cuisine: 'thai',
    cuisineLabel: 'Thai',
    flag: '🇹🇭',
    origin: 'Bangkok, Thailand',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Easy',
    prepTime: 20,
    cookTime: 12,
    totalTime: 32,
    calories: 540,
    servings: 2,
    rating: 4.88,
    reviewsCount: 420,
    spiceLevel: 2,
    dietary: ['quick', 'high-protein'],
    summary: 'Chewy rice noodles wok-tossed over searing heat with jumbo prawns, pressed tofu, sweet preserved radish, eggs, and an authentic tamarind-palm sugar glaze. Finished with roasted peanuts and lime.',
    chefTip: 'Never soak Pad Thai noodles in boiling water! Soak them in lukewarm water for 45 minutes until pliable yet firm. They will cook to perfect chewy al dente directly in the wok sauces.',
    winePairing: 'Thai Iced Tea with condensed milk or chilled Off-Dry Gewürztraminer',
    nutrition: {
      calories: 540,
      protein: '32g',
      carbs: '65g',
      fat: '16g',
      fiber: '4g'
    },
    ingredients: [
      { name: 'Medium Rice Noodles (dry weight)', amount: 160, unit: 'g', imperialAmount: 5.6, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Jumbo Tiger Prawns (peeled, tail on)', amount: 8, unit: 'pcs', imperialAmount: 8, imperialUnit: 'pcs', category: 'Protein' },
      { name: 'Extra Firm Yellow Tofu (cubed)', amount: 80, unit: 'g', imperialAmount: 2.8, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Tamarind Paste Concentrate', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Fish Sauce (Nam Pla)', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Palm Sugar (shaved)', amount: 2.5, unit: 'tbsp', imperialAmount: 2.5, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Large Eggs', amount: 2, unit: 'pcs', imperialAmount: 2, imperialUnit: 'pcs', category: 'Dairy' },
      { name: 'Fresh Garlic Chives (cut 2-inch)', amount: 50, unit: 'g', imperialAmount: 1.8, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Crisp Bean Sprouts', amount: 100, unit: 'g', imperialAmount: 3.5, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Roasted Peanuts (coarsely crushed)', amount: 40, unit: 'g', imperialAmount: 0.3, imperialUnit: 'cup', category: 'Pantry' },
      { name: 'Sweet Preserved Radish (minced)', amount: 1.5, unit: 'tbsp', imperialAmount: 1.5, imperialUnit: 'tbsp', category: 'Produce' },
      { name: 'Thai Chili Flakes & Lime Wedges', amount: 1, unit: 'tsp', imperialAmount: 1, imperialUnit: 'tsp', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Master the Pad Thai Glaze',
        text: 'In a small saucepan, combine tamarind concentrate, fish sauce, palm sugar, and 2 tbsp water over low heat. Whisk until palm sugar dissolves into a luscious amber syrup. The flavor profile must hit all three notes: tart tamarind, salty fish sauce, and sweet palm sugar.',
        technique: 'Authentic Thai street stalls never use ketchup or generic soy sauce in their glaze.',
        timerSeconds: 300
      },
      {
        stepNumber: 2,
        title: 'High Heat Wok Sear',
        text: 'Set your carbon steel wok over maximum heat until wisps of smoke rise. Swirl in 2 tbsp high smoke-point peanut oil. Sear prawns for 90 seconds until pink and curled; remove to side plate so they do not overcook. Add cubed firm tofu and sweet radish; fry until tofu develops golden crisp edges.',
        technique: 'Wok Hei (breath of the wok) requires blistering heat and rapid tossing.',
        timerSeconds: 180
      },
      {
        stepNumber: 3,
        title: 'Toss Noodles & Emulsify Glaze',
        text: 'Add drained soaked rice noodles directly into the wok with 3-4 tbsp of warm water. Toss continuously for 60 seconds as noodles absorb steam. Pour in prepared tamarind glaze. Stir-fry rapidly as noodles turn bronze and chewy.',
        technique: 'Adding a splash of water lets noodles steam to tenderness without turning oily.',
        timerSeconds: 120
      },
      {
        stepNumber: 4,
        title: 'Scramble Egg & Final Assembly',
        text: 'Push noodles to one side of wok. Drizzle a teaspoon of oil in the empty space and crack in two eggs. Scramble vigorously until 80% set, then fold eggs into the noodles. Return prawns, toss in garlic chives and bean sprouts for 20 seconds. Transfer immediately to warm plates. Garnish with crushed peanuts, chili powder, and fresh lime.',
        technique: 'Bean sprouts should only be tossed for 20 seconds so they stay crunchy against tender noodles.',
        timerSeconds: 90
      }
    ]
  },
  {
    id: 'pizza-margherita-napoletana',
    title: 'Neapolitan Margherita Pizza with San Marzano & Fior di Latte',
    cuisine: 'italian',
    cuisineLabel: 'Italian',
    flag: '🇮🇹',
    origin: 'Naples, Campania, Italy',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Medium',
    prepTime: 30,
    cookTime: 10,
    totalTime: 40,
    calories: 620,
    servings: 2,
    rating: 4.94,
    reviewsCount: 470,
    spiceLevel: 0,
    dietary: ['vegetarian'],
    summary: 'The holy grail of pizza: a 65% hydration slow-fermented dough stretched by hand, crushed sweet San Marzano tomatoes, tear-apart fresh Fior di Latte mozzarella, fragrant basil leaves, and cold-pressed olive oil.',
    chefTip: 'Never use a rolling pin! A rolling pin destroys the precious air pockets in the cornicione (crust edge). Always stretch with the pads of your fingers outwards from the center.',
    winePairing: 'Greco di Tufo or light-bodied Lacryma Christi del Vesuvio',
    nutrition: {
      calories: 620,
      protein: '26g',
      carbs: '82g',
      fat: '22g',
      fiber: '4g'
    },
    ingredients: [
      { name: 'Tipo 00 Italian Flour', amount: 320, unit: 'g', imperialAmount: 11.3, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Lukewarm Water (65% hydration)', amount: 210, unit: 'ml', imperialAmount: 0.9, imperialUnit: 'cup', category: 'Pantry' },
      { name: 'Fine Sea Salt', amount: 8, unit: 'g', imperialAmount: 1.5, imperialUnit: 'tsp', category: 'Spices' },
      { name: 'Instant Active Dry Yeast', amount: 1.5, unit: 'g', imperialAmount: 0.5, imperialUnit: 'tsp', category: 'Pantry' },
      { name: 'San Marzano D.O.P. Tomatoes (crushed by hand)', amount: 200, unit: 'g', imperialAmount: 7, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Fresh Fior di Latte Mozzarella (drained)', amount: 180, unit: 'g', imperialAmount: 6.3, imperialUnit: 'oz', category: 'Dairy' },
      { name: 'Fresh Basil Leaves', amount: 12, unit: 'leaves', imperialAmount: 12, imperialUnit: 'leaves', category: 'Produce' },
      { name: 'Extra Virgin Olive Oil (Tuscan)', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Semolina flour for dusting', amount: 30, unit: 'g', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Dough Fermentation & Shaping',
        text: 'Dissolve yeast in water, incorporate flour and salt, knead for 10 minutes until smooth and satiny. Ferment 12-24 hours at cool room temp. Divide into two 260g dough balls and rest 2 hours before stretching.',
        technique: 'Long slow fermentation breaks down complex starches, making the crust feather-light and easy to digest.',
        timerSeconds: 7200
      },
      {
        stepNumber: 2,
        title: 'Hand Stretching the Disc',
        text: 'Dust work surface with semolina. Press dough ball with fingers from the center outwards, pushing air bubbles outward into the rim (cornicione). Gently drape over back of hands to stretch into an 11-inch thin circle.',
        technique: 'Leave a 1-inch outer rim untouched to allow explosive oven spring during baking.',
        timerSeconds: 300
      },
      {
        stepNumber: 3,
        title: 'Topping with Restraint',
        text: 'Spread 3 tablespoons of crushed San Marzano tomatoes in a gentle swirl, leaving the rim bare. Scatter torn pieces of drained Fior di Latte mozzarella. Drizzle with extra virgin olive oil in a spiraling "6" motion.',
        technique: 'Drain fresh mozzarella in a strainer for 1 hour beforehand to avoid soggy pooling in the center.',
        timerSeconds: 180
      },
      {
        stepNumber: 4,
        title: 'Blistering Bake & Basil Crown',
        text: 'Bake on a preheated pizza stone or steel at highest oven setting (500°F-550°F / 285°C) for 6 to 8 minutes until the crust is puffed with leopard-spotted char and cheese is bubbling golden. Crown immediately with fresh basil and slice.',
        technique: 'Adding basil right after taking pizza out of the oven preserves its sweet herbal oils from charring.',
        timerSeconds: 420
      }
    ]
  },
  {
    id: 'palak-paneer-delight',
    title: 'Creamy Amritsari Palak Paneer with Charred Naan',
    cuisine: 'indian',
    cuisineLabel: 'Indian',
    flag: '🇮🇳',
    origin: 'Punjab, India',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Easy',
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    calories: 490,
    servings: 4,
    rating: 4.89,
    reviewsCount: 380,
    spiceLevel: 1,
    dietary: ['vegetarian', 'gluten-free'],
    summary: 'Golden pan-seared cubes of fresh Indian cottage cheese (paneer) nestled in an aromatic, vibrant emerald spinach gravy infused with toasted cumin, garlic tadka, and a touch of cream.',
    chefTip: 'Blanch your spinach leaves in boiling water for exactly 2 minutes, then plunge IMMEDIATELY into an ice water bath. This halts cooking and locks in that photogenic electric green color!',
    winePairing: 'Crisp Pinot Grigio or chilled Cardamom-Rose Lassi',
    nutrition: {
      calories: 490,
      protein: '24g',
      carbs: '18g',
      fat: '34g',
      fiber: '7g'
    },
    ingredients: [
      { name: 'Fresh Paneer (cubed into 1-inch squares)', amount: 400, unit: 'g', imperialAmount: 14, imperialUnit: 'oz', category: 'Dairy' },
      { name: 'Baby Spinach leaves (washed)', amount: 600, unit: 'g', imperialAmount: 21, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Onion (finely chopped)', amount: 1, unit: 'large', imperialAmount: 1, imperialUnit: 'large', category: 'Produce' },
      { name: 'Tomatoes (finely pureed)', amount: 2, unit: 'med', imperialAmount: 2, imperialUnit: 'med', category: 'Produce' },
      { name: 'Garlic cloves (slivered for tadka)', amount: 8, unit: 'cloves', imperialAmount: 8, imperialUnit: 'cloves', category: 'Produce' },
      { name: 'Fresh Ginger (grated)', amount: 1.5, unit: 'tbsp', imperialAmount: 1.5, imperialUnit: 'tbsp', category: 'Produce' },
      { name: 'Green Thai Chiles', amount: 2, unit: 'pcs', imperialAmount: 2, imperialUnit: 'pcs', category: 'Produce' },
      { name: 'Pure Cow Ghee', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Dairy' },
      { name: 'Cumin seeds (Jeera)', amount: 1, unit: 'tsp', imperialAmount: 1, imperialUnit: 'tsp', category: 'Spices' },
      { name: 'Garam Masala', amount: 1, unit: 'tsp', imperialAmount: 1, imperialUnit: 'tsp', category: 'Spices' },
      { name: 'Heavy Cream', amount: 50, unit: 'ml', imperialAmount: 3.5, imperialUnit: 'tbsp', category: 'Dairy' },
      { name: 'Kasuri Methi', amount: 1, unit: 'tsp', imperialAmount: 1, imperialUnit: 'tsp', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Ice-Bath Spinach Blanch',
        text: 'Bring 2 liters of salted water to rapid boil. Submerge spinach and green chilies for 120 seconds. Drain immediately into ice-cold water. Once chilled, blend into a silky smooth, emerald green puree with 2 tbsp of ice water.',
        technique: 'Shocking in ice water sets the chlorophyll bonds so your spinach never turns army green.',
        timerSeconds: 120
      },
      {
        stepNumber: 2,
        title: 'Pan-Sear Paneer Golden',
        text: 'Heat 1 tbsp ghee in a non-stick skillet over medium-high. Add paneer cubes and sear for 2 minutes per side until lightly toasted golden. Transfer cubes into a bowl of warm salted water for 10 minutes to keep them spongy and soft.',
        technique: 'Soaking seared paneer in warm water prevents it from becoming rubbery.',
        timerSeconds: 300
      },
      {
        stepNumber: 3,
        title: 'Slow Masala Base',
        text: 'In your main saucepan, heat 2 tbsp ghee. Add cumin seeds; let them crackle. Add chopped onions, sauté until golden brown (7-8 mins). Stir in ginger and tomato puree with coriander powder and garam masala. Cook until ghee glistens at the edges.',
        technique: 'Deeply caramelized onions provide the savory backbone against the mineral sweetness of spinach.',
        timerSeconds: 480
      },
      {
        stepNumber: 4,
        title: 'Combine & Garlic Tadka Crown',
        text: 'Pour the emerald spinach puree into the onion-tomato masala. Simmer on low for 5 minutes. Fold in drained paneer cubes and heavy cream. In a small butter warmer, sizzle slivered garlic in 1 tbsp ghee until golden and pour sizzle over the dish.',
        technique: 'The final sizzling garlic tadka delivers an intoxicating initial aroma to the dining table.',
        timerSeconds: 300
      }
    ]
  },
  {
    id: 'tom-yum-goong',
    title: 'Authentic Tom Yum Goong (Hot & Sour Prawn Soup)',
    cuisine: 'thai',
    cuisineLabel: 'Thai',
    flag: '🇹🇭',
    origin: 'Central Thailand',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Easy',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    calories: 310,
    servings: 3,
    rating: 4.92,
    reviewsCount: 310,
    spiceLevel: 3,
    dietary: ['quick', 'gluten-free', 'high-protein'],
    summary: 'The iconic Thai hot and sour soup infused with bruised lemongrass, fresh galangal, torn kaffir lime leaves, juicy tiger prawns, oyster mushrooms, and roasted chili paste (Nam Prik Pao).',
    chefTip: 'Never chop your herbs finely! Bruise lemongrass and galangal with the flat of your cleaver and tear lime leaves by hand. This releases their aromatic oils into the broth without turning the soup into grit.',
    winePairing: 'Dry sparkling Prosecco or aromatic French Viognier',
    nutrition: {
      calories: 310,
      protein: '28g',
      carbs: '14g',
      fat: '12g',
      fiber: '2g'
    },
    ingredients: [
      { name: 'Fresh Tiger Prawns (heads & shells reserved)', amount: 450, unit: 'g', imperialAmount: 1, imperialUnit: 'lb', category: 'Protein' },
      { name: 'Lemongrass stalks (bruised & cut 2-inch)', amount: 3, unit: 'stalks', imperialAmount: 3, imperialUnit: 'stalks', category: 'Produce' },
      { name: 'Fresh Galangal (thinly sliced)', amount: 50, unit: 'g', imperialAmount: 1.8, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Kaffir Lime Leaves (torn, center vein removed)', amount: 6, unit: 'leaves', imperialAmount: 6, imperialUnit: 'leaves', category: 'Produce' },
      { name: 'Thai Bird\'s Eye Chilis (lightly smashed)', amount: 5, unit: 'pcs', imperialAmount: 5, imperialUnit: 'pcs', category: 'Produce' },
      { name: 'Oyster or Straw Mushrooms (quartered)', amount: 180, unit: 'g', imperialAmount: 6.3, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Nam Prik Pao (Thai chili jam in oil)', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Fish Sauce (Premium Nam Pla)', amount: 3.5, unit: 'tbsp', imperialAmount: 3.5, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Fresh Lime Juice (squeezed off-heat)', amount: 4, unit: 'tbsp', imperialAmount: 4, imperialUnit: 'tbsp', category: 'Produce' },
      { name: 'Evaporated Milk (for Tom Yum Nam Khon version)', amount: 60, unit: 'ml', imperialAmount: 0.25, imperialUnit: 'cup', category: 'Dairy' },
      { name: 'Fresh Cilantro / Sawtooth Herb', amount: 1, unit: 'handful', imperialAmount: 1, imperialUnit: 'handful', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Extract Rich Prawn Head Stock',
        text: 'In a pot with 1 tbsp oil, sear prawn heads and shells for 3 minutes until crimson and deeply fragrant. Pour in 1 liter of water. Simmer gently for 12 minutes, then strain to yield an intensely flavored orange seafood broth.',
        technique: 'The golden tomalley inside prawn heads is the secret to authentic deep flavor.',
        timerSeconds: 720
      },
      {
        stepNumber: 2,
        title: 'Steep Holy Trinity Aromatics',
        text: 'Bring prawn stock to a gentle simmer. Add the bruised lemongrass, sliced galangal, torn kaffir lime leaves, and smashed bird chilis. Simmer for 5 minutes until your kitchen fills with citrusy aromatic steam.',
        technique: 'Bruising releases volatile essential oils into water without requiring long boiling.',
        timerSeconds: 300
      },
      {
        stepNumber: 3,
        title: 'Add Mushrooms & Prawns',
        text: 'Whisk in the Nam Prik Pao chili jam and fish sauce. Add mushrooms and peeled tiger prawns. Simmer for just 2 to 3 minutes until prawns turn opaque pink and curl into a C-shape.',
        technique: 'Overcooking prawns turns them rubbery; remove heat the second they become opaque.',
        timerSeconds: 180
      },
      {
        stepNumber: 4,
        title: 'Off-Heat Citrus Magic & Milk',
        text: 'Turn OFF the stove heat completely. Stir in evaporated milk and fresh lime juice. Taste and adjust: it should be vividly tangy, spicy, and savory. Garnish with fresh cilantro leaves.',
        technique: 'Boiling lime juice causes it to become bitter; always stir it in off the flame.',
        timerSeconds: 60
      }
    ]
  },
  {
    id: 'salmon-teriyaki-donburi',
    title: 'Glazed Atlantic Salmon Teriyaki Rice Bowl',
    cuisine: 'japanese',
    cuisineLabel: 'Japanese',
    flag: '🇯🇵',
    origin: 'Hokkaido, Japan',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Easy',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    calories: 590,
    servings: 2,
    rating: 4.91,
    reviewsCount: 395,
    spiceLevel: 0,
    dietary: ['quick', 'high-protein'],
    summary: 'Crisp-skinned Atlantic salmon fillets lacquered in a glossy scratch-made reduction of aged soy, mirin, and sake, served over steamed Japanese short-grain rice with steamed edamame, pickled ginger, and toasted sesame.',
    chefTip: 'Pat the salmon skin bone-dry with paper towels before searing, and score the skin slightly so it remains completely flat and ultra-crisp in the pan!',
    winePairing: 'Pinot Noir or crisp dry Japanese Green Tea (Sencha)',
    nutrition: {
      calories: 590,
      protein: '41g',
      carbs: '58g',
      fat: '21g',
      fiber: '4g'
    },
    ingredients: [
      { name: 'Fresh Atlantic Salmon Fillets (skin-on)', amount: 360, unit: 'g', imperialAmount: 12.7, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Japanese Soy Sauce', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Mirin (sweet rice seasoning)', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Sake (Japanese cooking wine)', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Cane Sugar', amount: 1.5, unit: 'tbsp', imperialAmount: 1.5, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Fresh Ginger (finely grated)', amount: 1, unit: 'tsp', imperialAmount: 1, imperialUnit: 'tsp', category: 'Produce' },
      { name: 'Cooked Japanese Short-Grain Rice', amount: 350, unit: 'g', imperialAmount: 2, imperialUnit: 'cups', category: 'Pantry' },
      { name: 'Steamed Edamame & Pickled Ginger', amount: 80, unit: 'g', imperialAmount: 2.8, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Toasted White & Black Sesame Seeds', amount: 1, unit: 'tbsp', imperialAmount: 1, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Scallions (thinly shaved)', amount: 2, unit: 'stalks', imperialAmount: 2, imperialUnit: 'stalks', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Authentic 1:1:1 Teriyaki Glaze',
        text: 'In a small bowl, whisk soy sauce, mirin, sake, sugar, and grated ginger until sugar granules dissolve. Authentic Japanese teriyaki uses no cornstarch—the natural sugars in mirin and sugar reduce to mirror shine.',
        technique: 'Teriyaki translates to "shine (teri)" and "grill (yaki)".',
        timerSeconds: 180
      },
      {
        stepNumber: 2,
        title: 'Sear Crispy Salmon Skin',
        text: 'Season salmon lightly with fine sea salt. Heat 1 tbsp oil in a non-stick skillet over medium-high. Lay salmon skin-side DOWN. Press gently with a spatula for 15 seconds. Sear undisturbed for 4-5 minutes until skin is crackling crisp and flesh is half-cooked.',
        technique: 'Gentle pressure prevents the skin from curling upwards as proteins contract.',
        timerSeconds: 300
      },
      {
        stepNumber: 3,
        title: 'Flip & Lacquer with Glaze',
        text: 'Flip salmon to flesh side for 60 seconds. Pour the teriyaki sauce around the pan. As the sauce bubbles vigorously, spoon the glaze continuously over the salmon for 2 minutes until thick and syrupy.',
        technique: 'Basting lacquers the salmon with an even caramelized glaze without burning the fish.',
        timerSeconds: 180
      },
      {
        stepNumber: 4,
        title: 'Assemble Donburi Bowls',
        text: 'Mound warm Japanese steamed rice into bowls. Drizzle a spoonful of pan teriyaki reduction over rice. Place the glossy salmon fillet in the center. Arrange edamame, pickled ginger, shaved scallions, and toasted sesame seeds.',
        technique: 'Short-grain sushi rice absorbs the sweet-savory tare sauce without collapsing.',
        timerSeconds: 120
      }
    ]
  },
  {
    id: 'moroccan-lamb-tagine',
    title: 'Fragrant Moroccan Lamb & Apricot Tagine with Fluffy Couscous',
    cuisine: 'moroccan',
    cuisineLabel: 'Moroccan',
    flag: '🇲🇦',
    origin: 'Fez, Morocco',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Medium',
    prepTime: 25,
    cookTime: 120,
    totalTime: 145,
    calories: 710,
    servings: 4,
    rating: 4.96,
    reviewsCount: 280,
    spiceLevel: 1,
    dietary: ['high-protein'],
    summary: 'Tender cubes of grass-fed lamb shoulder slow-braised in a traditional clay tagine with Ras el Hanout, saffron threads, sweet Turkish apricots, toasted almonds, and fresh mint over steamed couscous.',
    chefTip: 'The conical lid of the tagine acts as an internal moisture condenser, recycling steam back into the braise so the meat stays exceptionally juicy without drowning in liquid.',
    winePairing: 'Moroccan Syrah or hot Moroccan Fresh Mint Tea with honey',
    nutrition: {
      calories: 710,
      protein: '46g',
      carbs: '64g',
      fat: '30g',
      fiber: '6g'
    },
    ingredients: [
      { name: 'Lamb Shoulder (trimmed & cut into 1.5-inch cubes)', amount: 800, unit: 'g', imperialAmount: 28, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Dried Turkish Apricots', amount: 120, unit: 'g', imperialAmount: 4.2, imperialUnit: 'oz', category: 'Produce' },
      { name: 'Ras el Hanout Spice Blend', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Spices' },
      { name: 'Saffron threads (steeped in 3 tbsp warm water)', amount: 1, unit: 'pinch', imperialAmount: 1, imperialUnit: 'pinch', category: 'Spices' },
      { name: 'Yellow Onions (thinly sliced)', amount: 2, unit: 'med', imperialAmount: 2, imperialUnit: 'med', category: 'Produce' },
      { name: 'Garlic cloves (minced)', amount: 4, unit: 'cloves', imperialAmount: 4, imperialUnit: 'cloves', category: 'Produce' },
      { name: 'Cinnamon stick & Ground Ginger', amount: 1, unit: 'tsp', imperialAmount: 1, imperialUnit: 'tsp', category: 'Spices' },
      { name: 'Raw Honey', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Blanched Toasted Almonds', amount: 50, unit: 'g', imperialAmount: 1.8, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Steamed Couscous', amount: 300, unit: 'g', imperialAmount: 10.5, imperialUnit: 'oz', category: 'Pantry' },
      { name: 'Fresh Mint & Cilantro leaves', amount: 1, unit: 'bunch', imperialAmount: 1, imperialUnit: 'bunch', category: 'Produce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Spice Rub & Brown Lamb',
        text: 'Toss lamb pieces with Ras el Hanout, ground ginger, and salt. Heat olive oil in a heavy tagine base or Dutch oven. Brown meat in small batches until seared and golden on all sides (8 mins). Transfer to a plate.',
        technique: 'Browning caramelizes the surface amino acids (Maillard reaction) creating rich foundation.',
        timerSeconds: 480
      },
      {
        stepNumber: 2,
        title: 'Sweet Onion Fond & Saffron',
        text: 'In the same pan, cook sliced onions with garlic and cinnamon stick over medium-low heat for 10 minutes until soft and caramelized. Pour in saffron water and scrape all tasty brown bits off the bottom.',
        technique: 'Saffron yields both royal golden hue and complex earthy honey aroma.',
        timerSeconds: 600
      },
      {
        stepNumber: 3,
        title: 'Gentle Tagine Braise',
        text: 'Return lamb to the pot with 400ml of lamb or vegetable broth. Cover tightly with the tagine cone lid. Lower heat to very low and braise for 90 minutes until the meat yields to the gentlest touch.',
        technique: 'Cooking at low temperature melts the tough connective tissue in lamb shoulder into gelatin.',
        timerSeconds: 5400
      },
      {
        stepNumber: 4,
        title: 'Glaze with Apricots & Almonds',
        text: 'Uncover, add dried apricots and honey. Simmer uncovered for 15 minutes until the sauce reduces to a rich, glossy glaze clinging to the meat. Scatter with toasted almonds, fresh mint, and serve over airy couscous.',
        technique: 'Adding apricots in the final stretch allows them to plump up without disintegrating.',
        timerSeconds: 900
      }
    ]
  },
  {
    id: 'greek-lamb-souvlaki-platter',
    title: 'Authentic Greek Souvlaki with Tzatziki & Warm Pita',
    cuisine: 'mediterranean',
    cuisineLabel: 'Mediterranean',
    flag: '🇬🇷',
    origin: 'Athens, Greece',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Easy',
    prepTime: 25,
    cookTime: 15,
    totalTime: 40,
    calories: 580,
    servings: 4,
    rating: 4.93,
    reviewsCount: 360,
    spiceLevel: 0,
    dietary: ['high-protein'],
    summary: 'Skewers of succulent marinated lamb or chicken scented with wild Greek oregano, lemon, garlic, and cold-pressed olive oil, paired with cool grated cucumber tzatziki, Kalamata olives, and char-grilled pita.',
    chefTip: 'To make authentic thick tzatziki, squeeze your grated cucumber inside a clean kitchen towel until completely dry before folding into Greek yogurt!',
    winePairing: 'Greek Assyrtiko from Santorini or chilled Ouzo with ice and water',
    nutrition: {
      calories: 580,
      protein: '44g',
      carbs: '42g',
      fat: '26g',
      fiber: '4g'
    },
    ingredients: [
      { name: 'Boneless Lamb Leg or Chicken Breast (cubed)', amount: 700, unit: 'g', imperialAmount: 25, imperialUnit: 'oz', category: 'Protein' },
      { name: 'Greek Extra Virgin Olive Oil', amount: 4, unit: 'tbsp', imperialAmount: 4, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Fresh Lemon Juice', amount: 3, unit: 'tbsp', imperialAmount: 3, imperialUnit: 'tbsp', category: 'Produce' },
      { name: 'Dried Wild Greek Oregano', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Spices' },
      { name: 'Garlic cloves (crushed)', amount: 6, unit: 'cloves', imperialAmount: 6, imperialUnit: 'cloves', category: 'Produce' },
      { name: 'Full-fat Greek Strained Yogurt', amount: 250, unit: 'g', imperialAmount: 1, imperialUnit: 'cup', category: 'Dairy' },
      { name: 'English Cucumber (grated & squeezed dry)', amount: 1, unit: 'med', imperialAmount: 1, imperialUnit: 'med', category: 'Produce' },
      { name: 'Fresh Dill & Mint (minced)', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Produce' },
      { name: 'Greek Pita Breads', amount: 4, unit: 'pcs', imperialAmount: 4, imperialUnit: 'pcs', category: 'Pantry' },
      { name: 'Kalamata Olives & Crumbled Feta', amount: 100, unit: 'g', imperialAmount: 3.5, imperialUnit: 'oz', category: 'Dairy' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mediterranean Marinade',
        text: 'Whisk olive oil, fresh lemon juice, wild oregano, crushed garlic, sea salt, and black pepper. Toss cubed lamb/chicken in marinade; thread tightly onto wooden or metal skewers. Marinate for 30 minutes.',
        technique: 'Thread skewers tightly together so the meat remains tender and juicy inside while charring outside.',
        timerSeconds: 1800
      },
      {
        stepNumber: 2,
        title: 'Master Creamy Tzatziki',
        text: 'Coarsely grate cucumber and squeeze firmly in a tea towel to eliminate water. In a bowl, combine strained Greek yogurt, drained cucumber, 1 clove minced garlic, dill, lemon juice, and a splash of olive oil. Chill in fridge.',
        technique: 'Removing cucumber water prevents the yogurt sauce from separating and becoming watery.',
        timerSeconds: 600
      },
      {
        stepNumber: 3,
        title: 'High Heat Charcoal or Pan Grilling',
        text: 'Fire up your grill or cast-iron skillet to high heat. Sear skewers for 3-4 minutes per side until charred on exterior and medium-juicy inside. Remove and rest 3 minutes.',
        technique: 'High heat creates caramelized grill marks without drying out tender meat.',
        timerSeconds: 480
      },
      {
        stepNumber: 4,
        title: 'Warm Pitas & Festive Platter',
        text: 'Brush pita breads lightly with olive oil and oregano; warm on the grill for 60 seconds until puffed. Arrange skewers on a wooden board with bowls of tzatziki, feta, Kalamata olives, sliced tomatoes, red onions, and hot pita.',
        technique: 'Warm pitas stay pliable and wrap easily around hot skewers.',
        timerSeconds: 120
      }
    ]
  },
  {
    id: 'classic-ratatouille-nicoise',
    title: 'Provencal Confit Byaldi (Classic Layered Ratatouille)',
    cuisine: 'french',
    cuisineLabel: 'French',
    flag: '🇫🇷',
    origin: 'Nice, Provence, France',
    image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=1200&q=85',
    difficulty: 'Medium',
    prepTime: 35,
    cookTime: 60,
    totalTime: 95,
    calories: 290,
    servings: 4,
    rating: 4.87,
    reviewsCount: 240,
    spiceLevel: 0,
    dietary: ['vegetarian', 'vegan', 'gluten-free'],
    summary: 'A breathtaking spiral of razor-thin sliced zucchini, Japanese eggplant, yellow squash, and Roma tomatoes slow-baked over a sweet Piperade pepper puree with thyme, garlic, and rosemary oil.',
    chefTip: 'Use a Japanese mandoline slicer set to 1.5mm thickness for uniform vegetable discs so they cook evenly in the oven and look stunningly artistic!',
    winePairing: 'Dry Bandol Rosé from Provence or light fruity Pinot Noir',
    nutrition: {
      calories: 290,
      protein: '6g',
      carbs: '28g',
      fat: '18g',
      fiber: '9g'
    },
    ingredients: [
      { name: 'Japanese Eggplants (thin & uniform)', amount: 2, unit: 'med', imperialAmount: 2, imperialUnit: 'med', category: 'Produce' },
      { name: 'Green Zucchini', amount: 2, unit: 'med', imperialAmount: 2, imperialUnit: 'med', category: 'Produce' },
      { name: 'Yellow Squash', amount: 2, unit: 'med', imperialAmount: 2, imperialUnit: 'med', category: 'Produce' },
      { name: 'Firm Roma Tomatoes', amount: 4, unit: 'pcs', imperialAmount: 4, imperialUnit: 'pcs', category: 'Produce' },
      { name: 'Red & Yellow Bell Peppers (roasted & peeled)', amount: 2, unit: 'pcs', imperialAmount: 2, imperialUnit: 'pcs', category: 'Produce' },
      { name: 'Extra Virgin Olive Oil', amount: 4, unit: 'tbsp', imperialAmount: 4, imperialUnit: 'tbsp', category: 'Pantry' },
      { name: 'Fresh Thyme & Rosemary', amount: 2, unit: 'tbsp', imperialAmount: 2, imperialUnit: 'tbsp', category: 'Produce' },
      { name: 'Garlic cloves (finely minced)', amount: 4, unit: 'cloves', imperialAmount: 4, imperialUnit: 'cloves', category: 'Produce' },
      { name: 'Shallots (minced)', amount: 2, unit: 'pcs', imperialAmount: 2, imperialUnit: 'pcs', category: 'Produce' },
      { name: 'Sea Salt & Fresh Black Pepper', amount: 1, unit: 'tsp', imperialAmount: 1, imperialUnit: 'tsp', category: 'Spices' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Create the Piperade Base',
        text: 'In a skillet, sauté shallots and garlic in 2 tbsp olive oil until translucent. Add peeled roasted bell peppers and diced ripe tomato. Simmer 12 minutes with a pinch of thyme. Blend into a smooth, vibrant sweet pepper coulis. Spread evenly across the bottom of a round baking dish.',
        technique: 'The Piperade bed steams the vegetables from underneath while imparting sweet pepper essence.',
        timerSeconds: 720
      },
      {
        stepNumber: 2,
        title: 'Precision Mandoline Slicing',
        text: 'Slice eggplants, zucchini, yellow squash, and Roma tomatoes into uniform 1.5mm rounds using a mandoline. Keep slices in neat rows for fast assembly.',
        technique: 'Uniform thickness ensures every vegetable cooks at the exact same rate.',
        timerSeconds: 600
      },
      {
        stepNumber: 3,
        title: 'Arrange the Iconic Spiral',
        text: 'Alternating slices (eggplant, zucchini, yellow squash, tomato), arrange the vegetables in tight concentric circles starting from the outer edge towards the center until the dish is densely packed. Drizzle with herb-infused olive oil and season with sea salt and black pepper.',
        technique: 'Tight packing prevents the vegetable slices from curling and drying out during baking.',
        timerSeconds: 900
      },
      {
        stepNumber: 4,
        title: 'Cartouche Parchment Bake',
        text: 'Cover dish with a round parchment paper cartouche (with a tiny center hole for steam). Bake at 300°F (150°C) for 45 minutes until vegetables are tender. Remove paper and broil 5 minutes for slight roasted edges. Serve warm with crusty French baguette.',
        technique: 'The cartouche traps steam to tenderize the vegetables without boiling them.',
        timerSeconds: 3000
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CUISINES, DIETARY_FILTERS, PANTRY_ITEMS, RECIPES };
}
