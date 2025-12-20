export const questions = [
  // Phase 1 · Rational Orientation (Text-based) - Weight 1.0
  {
    id: 1,
    weight: 1.0,
    dimension: 'selfExpansion',
    text: "When you travel, what excites you most?",
    options: [
      { id: 'A', text: "Discovering a new side of myself and experiencing inner growth", impact: { soulSeeker: 1 } },
      { id: 'B', text: "Relaxing, enjoying good food, taking photos, and having fun", impact: { pleasureSeeker: 1 } }
    ]
  },
  {
    id: 2,
    weight: 1.0,
    dimension: 'placeResonance',
    text: "When you think back on a trip, what do you remember more easily?",
    options: [
      { id: 'A', text: "People’s stories, local smells, and the overall atmosphere", impact: { connector: 1 } },
      { id: 'B', text: "The places I visited and the itinerary I completed", impact: { wanderer: 1 } }
    ]
  },
  {
    id: 3,
    weight: 1.0,
    dimension: 'openness',
    text: "If you had one free day in a city, you would choose to:",
    options: [
      { id: 'A', text: "Wander into unmarked alleys or visit a hidden, niche exhibition", impact: { explorer: 1 } },
      { id: 'B', text: "Go to the most famous landmarks and must-try restaurants", impact: { comfortKeeper: 1 } }
    ]
  },
  {
    id: 4,
    weight: 1.0,
    dimension: 'structuration',
    text: "Before a trip, you usually:",
    options: [
      { id: 'A', text: "Make a detailed plan and check transportation and budget", impact: { architect: 1 } },
      { id: 'B', text: "Only book transportation and accommodation, and decide the rest along the way", impact: { flowWalker: 1 } }
    ]
  },

  // Phase 2 · Intuitive Projection (Image-based) - Weight 1.5
  {
    id: 5,
    weight: 1.5,
    dimension: 'selfExpansion',
    text: "Which scene feels more like your ideal travel moment?",
    type: "image",
    options: [
      { id: 'A', text: "A person alone, quietly meditating or immersed in thought", impact: { soulSeeker: 1 } },
      { id: 'B', text: "Friends laughing together, raising glasses by the sea", impact: { pleasureSeeker: 1 } }
    ]
  },
  {
    id: 6,
    weight: 1.5,
    dimension: 'placeResonance',
    text: "Which type of travel experience attracts you more?",
    type: "image",
    options: [
      { id: 'A', text: "Chatting and interacting with local people", impact: { connector: 1 } },
      { id: 'B', text: "Standing alone at a high viewpoint, overlooking the city", impact: { wanderer: 1 } }
    ]
  },
  {
    id: 7,
    weight: 1.5,
    dimension: 'openness',
    text: "Where would you rather spend an entire day?",
    type: "image",
    options: [
      { id: 'A', text: "A remote or unconventional art installation / natural setting", impact: { explorer: 1 } },
      { id: 'B', text: "A lively, iconic tourist attraction", impact: { comfortKeeper: 1 } }
    ]
  },
  {
    id: 8,
    weight: 1.5,
    dimension: 'structuration',
    text: "Which image makes you feel more at ease?",
    type: "image",
    options: [
      { id: 'A', text: "A tightly planned itinerary filled with notes", impact: { architect: 1 } },
      { id: 'B', text: "A blank map with the words “go with the flow”", impact: { flowWalker: 1 } }
    ]
  },

  // Phase 3 · Integrative & Situational Questions
  {
    id: 9,
    weight: 2.0,
    dimension: 'mixed',
    text: "A friend suddenly invites you to visit an island you’ve never heard of—leaving tomorrow. What do you do?",
    options: [
      { id: 'A', text: "Immediately check flights, safety, and logistics", impact: { architect: 1 } },
      { id: 'B', text: "Say yes right away and figure things out as you go", impact: { flowWalker: 0.5, explorer: 0.5 } }, // Note: Weight 2.0 * 0.5 = 1.0 for each as per doc
      { id: 'C', text: "First think about whether this trip would be meaningful to me", impact: { soulSeeker: 1 } },
      { id: 'D', text: "Ask whether it’s fun and if there’s good food", impact: { pleasureSeeker: 1 } }
    ]
  },
  {
    id: 10,
    weight: 1.0,
    dimension: 'mixed',
    text: "Think of the most memorable trip you’ve ever had. It made you feel:",
    subtext: "(You may choose up to TWO options)",
    multiSelect: true,
    maxSelect: 2,
    options: [
      { id: 'A', text: "I understood myself better", impact: { soulSeeker: 1 } },
      { id: 'B', text: "I felt relaxed and genuinely happy", impact: { pleasureSeeker: 1 } },
      { id: 'C', text: "I felt a deep connection with the place", impact: { connector: 1 } },
      { id: 'D', text: "I accomplished many goals and felt a strong sense of achievement", impact: { architect: 1 } }
    ]
  },
  {
    id: 11,
    weight: 1.0,
    dimension: 'mixed',
    text: "Which image best represents your travel vibe?",
    type: "image",
    options: [
      { id: 'A', text: "Sitting quietly and reading in a bookstore", impact: { architect: 1, soulSeeker: 1 } },
      { id: 'B', text: "Taking selfies with friends at a night market", impact: { connector: 1, pleasureSeeker: 1 } },
      { id: 'C', text: "Walking alone through nature", impact: { explorer: 1, wanderer: 1 } }
    ]
  },
  {
    id: 12,
    weight: 0.5,
    dimension: 'mixed',
    text: "Which sound feels more calming and comforting to you?",
    options: [
      { id: 'A', text: "The noise of a busy night market—voices, laughter, life", impact: { connector: 1, pleasureSeeker: 1 } },
      { id: 'B', text: "The sound of wind in the forest and footsteps on a quiet path", impact: { wanderer: 1, soulSeeker: 1 } }
    ]
  }
];


export const personalityTypes = {
  // High Self-Expansion (Soul Seeker)
  "high-high-high-high": {
    name: "Soul Pilgrim",
    title: "Seeking meaning and self-understanding",
    quote: "Through travel, I reunite with myself.",
    description: "Prefers structured, in-depth journeys such as cultural rituals, volunteering, or healing itineraries. Feels fulfilled through spiritual growth and inner integration.",
    recommendation: "Chenghuang Temple cultural rituals → volunteering projects (old lane restoration) → evening reflection workshops at Jing’an Temple"
  },
  "high-high-high-low": {
    name: "Wandering Poet",
    title: "Pursues soulful encounters and moments of inspiration",
    quote: "My soul breathes best outside the plan.",
    description: "Spontaneous, improvisational, artistic, and symbolic. Finds insight and emotional awakening through unexpected encounters.",
    recommendation: "M50 Art District → Huangpu River night cruise → late-night writing and sharing in cafés"
  },
  "high-low-low-high": {
    name: "Inner Guardian",
    title: "Seeks inner organization through quiet, safe environments",
    quote: "In silence, I finally hear myself.",
    description: "Calm, introspective, inward-oriented, and ritualized. Achieves balance through ordered solitude and quiet reflection.",
    recommendation: "Chenshan Botanical Garden → Zen meditation sessions → writing in independent bookstores"
  },
  "high-low-high-low": {
    name: "Dream Walker",
    title: "Explores spiritual metaphors of the self",
    quote: "Every step I take is an interpretation of a dream.",
    description: "Fluid and symbolic, often documenting travel through images or stories. Feels connected to a “larger self” through movement and flow.",
    recommendation: "Wukang Road → Tank Shanghai Art Center → riverside sketching or photography"
  },
  "high-high-low-high": {
    name: "Silent Philosopher",
    title: "Uses reason and ritual to reflect on self and relationships",
    quote: "By connecting with others, I come to understand myself.",
    description: "Prefers orderly, reflective social and cultural experiences. Finds self-positioning through stable communities and tradition.",
    recommendation: "Talks at Sinan Mansions → community cultural participation → traditional tea ceremony experiences"
  },
  "high-high-low-low": {
    name: "Mindful Artisan",
    title: "Repairs the inner world through hands-on creation",
    quote: "I reshape my heart with my hands.",
    description: "Gentle, sensory, and improvisational. Finds calm and insight through making and doing.",
    recommendation: "Pottery classes → coffee hand-brewing workshops → leisurely walks in community botanical gardens"
  },
  "high-low-high-high": {
    name: "Insight Scholar",
    title: "Explores meaning through knowledge and rational understanding",
    quote: "Understanding the world is where self-understanding begins.",
    description: "Well-planned, research-driven, and theme-oriented cultural travel. Moves from understanding the world to understanding the self.",
    recommendation: "In-depth museum guided tours → Shanghai Urban Planning Exhibition Center → evening themed talks or discussions"
  },
  "high-low-low-low": {
    name: "Spirit Nomad",
    title: "Seeks gentle inner freedom, releasing control",
    quote: "I’m not searching for answers—I’m walking with the wind.",
    description: "Light, intuitive, often solo, yet not lonely. Finds peace through flow and emotional lightness.",
    recommendation: "Morning walks along Hengshan Road → bookstores → small, niche exhibitions"
  },

  // Low Self-Expansion (Pleasure Seeker)
  "low-high-high-low": {
    name: "Festival Mover",
    title: "Seeks joy, social energy, and novelty",
    quote: "Joy itself is the destination.",
    description: "Energetic, crowd-loving, activity-driven. Gains energy through rhythm, people, and shared excitement.",
    recommendation: "Tianzifang → Bund night markets → music festivals or creative markets"
  },
  "low-high-high-high": {
    name: "Urban Adventurer",
    title: "Enjoys novelty while maintaining control and safety",
    quote: "I enjoy the new—but I trust what’s certain.",
    description: "Outgoing, well-planned, and photo-oriented. Finds satisfaction in exploration within clear boundaries.",
    recommendation: "Shanghai Disneyland themed day → Global Harbor photo check-ins → refined dinner experiences"
  },
  "low-high-low-high": {
    name: "Heritage Keeper",
    title: "Reconnects with identity through tradition and history",
    quote: "By looking back, I understand where I stand.",
    description: "Structured cultural travel with a nostalgic tone. Finds belonging through revisiting the past.",
    recommendation: "Old lane (longtang) heritage walks → archive visits → recording family or personal stories"
  },
  "low-high-low-low": {
    name: "Serene Bonvivant",
    title: "Values comfort, aesthetics, and relaxation",
    quote: "When I slow down, life itself becomes the journey.",
    description: "Elegant, slow-paced, atmosphere-focused. Feels restored through ease, beauty, and human warmth.",
    recommendation: "Afternoons in Fuxing Park → trendy cafés → spa sessions or afternoon tea"
  },
  "low-low-high-high": {
    name: "Solo Observer",
    title: "Enjoys observing the world without deep engagement",
    quote: "The world is a book—I read it in silence.",
    description: "Independent, rational, and orderly. Finds pleasure in control and quiet discovery.",
    recommendation: "Shanghai Astronomy Museum → Pudong high-rise observation decks → urban photography"
  },
  "low-low-high-low": {
    name: "Gentle Drifter",
    title: "Enjoys the road, scenery, and freedom of movement",
    quote: "When the wind moves, I know I’m traveling.",
    description: "Relaxed, unhurried, and sensory-oriented. Feels content through flow and low-pressure travel.",
    recommendation: "Riverside promenades → riverside cafés → waterside music performances"
  },
  "low-low-low-low": {
    name: "Calm Drifter",
    title: "Seeks rest and recovery rather than novelty",
    quote: "Peace itself is my faraway place.",
    description: "Easy, familiar, and close-to-home journeys. Regains balance through calm repetition and comfort.",
    recommendation: "Historic villas along Hengshan Road → second-hand bookstores → traditional teahouses"
  },
  "low-low-low-high": {
    name: "Classic Planner",
    title: "Prefers safety, familiarity, and well-planned leisure",
    quote: "Order makes happiness last.",
    description: "Rational, refined, quality-focused. Finds happiness in the certainty of a perfectly executed trip.",
    recommendation: "Boutique hotel stays → high-end dining → evening concerts at music halls"
  }
};
