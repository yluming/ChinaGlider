export const questions = [
  // Phase 1 · Rational Orientation (Text-based)
  {
    id: 1,
    dimension: 'selfExpansion',
    text: "When you travel, what excites you most?",
    options: [
      { text: "Discovering a new side of myself and experiencing inner growth", value: "high" },
      { text: "Relaxing, enjoying good food, taking photos, and having fun", value: "low" }
    ]
  },
  {
    id: 2,
    dimension: 'placeResonance',
    text: "When you think back on a trip, what do you remember more easily?",
    options: [
      { text: "People’s stories, local smells, and the overall atmosphere", value: "high" },
      { text: "The places I visited and the itinerary I completed", value: "low" }
    ]
  },
  {
    id: 3,
    dimension: 'openness',
    text: "If you had one free day in a city, you would choose to:",
    options: [
      { text: "Wander into unmarked alleys or visit a hidden, niche exhibition", value: "high" },
      { text: "Go to the most famous landmarks and must-try restaurants", value: "low" }
    ]
  },
  {
    id: 4,
    dimension: 'structuration',
    text: "Before a trip, you usually:",
    options: [
      { text: "Make a detailed plan and check transportation and budget", value: "high" },
      { text: "Only book transportation and accommodation, and decide the rest along the way", value: "low" }
    ]
  },

  // Phase 2 · Intuitive Projection (Image-based)
  {
    id: 5,
    dimension: 'selfExpansion',
    text: "Which scene feels more like your ideal travel moment?",
    type: "image",
    options: [
      { text: "A person alone, quietly meditating or immersed in thought", value: "high" }, // [Image Placeholder A]
      { text: "Friends laughing together, raising glasses by the sea", value: "low" }      // [Image Placeholder B]
    ]
  },
  {
    id: 6,
    dimension: 'placeResonance',
    text: "Which type of travel experience attracts you more?",
    type: "image",
    options: [
      { text: "Chatting and interacting with local people", value: "high" },              // [Image Placeholder A]
      { text: "Standing alone at a high viewpoint, overlooking the city", value: "low" } // [Image Placeholder B]
    ]
  },
  {
    id: 7,
    dimension: 'openness',
    text: "Where would you rather spend an entire day?",
    type: "image",
    options: [
      { text: "A remote or unconventional art installation / natural setting", value: "high" }, // [Image Placeholder A]
      { text: "A lively, iconic tourist attraction", value: "low" }                             // [Image Placeholder B]
    ]
  },
  {
    id: 8,
    dimension: 'structuration',
    text: "Which image makes you feel more at ease?",
    type: "image",
    options: [
      { text: "A tightly planned itinerary filled with notes", value: "high" }, // [Image Placeholder A]
      { text: "A blank map with the words “go with the flow”", value: "low" }   // [Image Placeholder B]
    ]
  },

  // Phase 3 · Integrative & Situational Questions
  {
    id: 9,
    dimension: 'mixed',
    text: "A friend suddenly invites you to visit an island you’ve never heard of—leaving tomorrow. What do you do?",
    options: [
      { text: "Immediately check flights, safety, and logistics", impact: { structuration: 1 } },
      { text: "Say yes right away and figure things out as you go", impact: { structuration: -1, openness: 1 } },
      { text: "First think about whether this trip would be meaningful to me", impact: { selfExpansion: 1 } },
      { text: "Ask whether it’s fun and if there’s good food", impact: { selfExpansion: -1 } }
    ]
  },
  {
    id: 10,
    dimension: 'mixed',
    text: "Think of the most memorable trip you’ve ever had. It made you feel:",
    subtext: "(You may choose up to TWO options)",
    multiSelect: true,
    maxSelect: 2,
    options: [
      { id: 'A', text: "I understood myself better", impact: { selfExpansion: 1 } },
      { id: 'B', text: "I felt relaxed and genuinely happy", impact: { selfExpansion: -1 } },
      { id: 'C', text: "I felt a deep connection with the place", impact: { placeResonance: 1 } },
      { id: 'D', text: "I accomplished many goals and felt a strong sense of achievement", impact: { structuration: 1 } }
    ]
  },
  {
    id: 11,
    dimension: 'mixed',
    text: "Which image best represents your travel vibe?",
    type: "image",
    options: [
      { text: "Sitting quietly and reading in a bookstore", impact: { selfExpansion: 1, structuration: 1 } }, // [Image Placeholder A]
      { text: "Taking selfies with friends at a night market", impact: { selfExpansion: -1, placeResonance: 1 } }, // [Image Placeholder B]
      { text: "Walking alone through nature", impact: { openness: 1, placeResonance: -1 } } // [Image Placeholder C]
    ]
  },
  {
    id: 12,
    dimension: 'mixed',
    text: "Which sound feels more calming and comforting to you?",
    options: [
      { text: "The noise of a busy night market—voices, laughter, life", impact: { placeResonance: 1, selfExpansion: -1 } },
      { text: "The sound of wind in the forest and footsteps on a quiet path", impact: { placeResonance: -1, selfExpansion: 1 } }
    ]
  }
];


export const personalityTypes = {
  // High Self-Expansion (Soul Seeker)
  "high-high-high-high": {
    name: "Soul Pilgrim",
    title: "灵魂修行者",
    quote: "我在旅途中学会了与自己重逢。",
    description: "寻找意义、理解自我，与世界和解。喜欢结构化的深度旅程（文化仪式、志工、治愈行程）。",
    recommendation: "城隍庙文化仪式 → 志工项目（老弄堂修复） → 夜间反思工作坊（静安寺）"
  },
  "high-high-high-low": {
    name: "Wandering Poet",
    title: "流浪诗人",
    quote: "计划之外，灵魂才会呼吸。",
    description: "追求心灵的偶遇与灵感爆发。自发、即兴、富有艺术感与象征性。",
    recommendation: "M50 艺术区 → 黄浦江夜游 → 咖啡馆夜写分享"
  },
  "high-low-low-high": {
    name: "Inner Guardian",
    title: "内观守护者",
    quote: "我在安静中听见自己的声音。",
    description: "通过安静、安全的环境进行心灵整理。安静、细腻、偏内向与仪式化。",
    recommendation: "辰山植物园 → 禅修冥想课 → 书店写作"
  },
  "high-low-high-low": {
    name: "Dream Walker",
    title: "梦境旅人",
    quote: "我走的每一步，都是对梦的诠释。",
    description: "寻找自我灵性的隐喻，透过旅行理解梦境般的人生。随性而有象征意味。",
    recommendation: "武康路 → 油罐艺术中心 → 河畔写生或摄影"
  },
  "high-high-low-high": {
    name: "Silent Philosopher",
    title: "静默哲人",
    quote: "在连接他人的过程中，我终于理解自己。",
    description: "以理性与仪式整理自我与他人关系。偏好有序、可反思的社交与文化体验。",
    recommendation: "思南公馆讲座 → 社区文化参与 → 茶道体验"
  },
  "high-high-low-low": {
    name: "Mindful Artisan",
    title: "心灵旅匠",
    quote: "我在手作中重建心的形状。",
    description: "用手工、艺术、生活细节修复内在。即兴但温柔，喜欢带感官疗愈性的活动。",
    recommendation: "陶艺课 → 咖啡手冲工作坊 → 社区植物园漫步"
  },
  "high-low-high-high": {
    name: "Insight Scholar",
    title: "理性觉者",
    quote: "理解世界，是理解自己的起点。",
    description: "以知识和理性探索自我与世界意义。有计划、有研究主题的深度文化游。",
    recommendation: "博物馆深度导览 → 城市规划馆 → 晚间专题分享"
  },
  "high-low-low-low": { // Correction: Logic check needed. 
    // Let's re-verify combinations from doc.
    // Doc says: 
    // 8. Spirit Nomad: Soul Seeker + Wanderer + Comfort Keeper + Flow Walker
    // Soul Seeker (High Self-Exp)
    // Wanderer (Low Place-Res)
    // Comfort Keeper (Low Openness)
    // Flow Walker (Low Structuration)
    // -> high-low-low-low
    name: "Spirit Nomad",
    title: "灵性流者",
    quote: "我不在找答案，我在和风一起走。",
    description: "追求温柔的心灵自由，放下约束与控制。轻盈、感性、独行但不孤单。",
    recommendation: "衡山路晨行 → 书店 → 小众展览"
  },

  // Low Self-Expansion (Pleasure Seeker)
  "low-high-high-low": {
    name: "Festival Mover",
    title: "社群节拍者",
    quote: "快乐本身，就是答案。",
    description: "追求快乐、社交与新鲜感。活力十足、喜欢人群与活动。",
    recommendation: "田子坊 → 外滩夜市 → 音乐节或市集"
  },
  "low-high-high-high": {
    name: "Urban Adventurer",
    title: "都市玩家",
    quote: "我喜欢新奇，也喜欢确定。",
    description: "享受新奇体验，但希望掌握节奏与安全。外向、计划明确、拍照达人。",
    recommendation: "迪士尼主题日 → 环球港打卡 → 精致晚宴"
  },
  "low-high-low-high": {
    name: "Heritage Keeper",
    title: "记忆寻根者",
    quote: "在回望的路上，我看清了出发的方向。",
    description: "透过传统与历史连接自我根源。有结构的文化游与怀旧体验。",
    recommendation: "老弄堂寻根 → 档案馆访问 → 家族故事记录"
  },
  "low-high-low-low": {
    name: "Serene Bonvivant",
    title: "慢享生活家",
    quote: "不急不躁，生活本身就是旅行。",
    description: "享受生活、重视美感与放松。优雅、节奏慢、讲究氛围。",
    recommendation: "复兴公园午后 → 网红咖啡馆 → SPA或下午茶"
  },
  "low-low-high-high": {
    name: "Solo Observer",
    title: "独行观测者",
    quote: "世界是一本书，而我在安静地阅读。",
    description: "享受观察世界的过程，不求深入连接。独自、理性、有秩序的探索。",
    recommendation: "天文馆 → 浦东高空观景台 → 城市摄影"
  },
  "low-low-high-low": {
    name: "Gentle Drifter",
    title: "温柔旅客",
    quote: "风吹来时，我就知道我在旅行。",
    description: "享受路途、风景与自由。随性而宁静，重视体验感官与放松。",
    recommendation: "滨江步道 → 河畔咖啡 → 临水音乐表演"
  },
  "low-low-low-low": {
    name: "Calm Drifter",
    title: "从容漫游者",
    quote: "我不需要远方，平静就是我的远方。",
    description: "恢复能量，不追求转化或新奇。轻松、熟悉、近距离小游。",
    recommendation: "衡山路老洋房 → 老书店 → 茶馆"
  },
  "low-low-low-high": {
    name: "Classic Planner",
    title: "守序享乐家",
    quote: "秩序感，让幸福更稳固。",
    description: "喜欢安全、熟悉、计划性强的休闲旅行。理性、精致、注重品质。",
    recommendation: "精品酒店度假 → 高端餐厅 → 音乐厅夜场"
  }
};
