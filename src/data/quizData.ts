export interface Character {
  id: string;
  name: string;
  description: string;
  traits: string[];
  image: string;
}

export interface Question {
  id: number;
  question: string;
  answers: {
    text: string;
    character: string;
  }[];
}

export const characters: Character[] = [
  {
    id: "wednesday",
    name: "Wednesday Addams",
    description: "Dark, mysterious, and intensely focused. You have a fascination with the macabre and prefer solitude over social gatherings.",
    traits: ["Intelligent", "Independent", "Dark humor", "Loyal"],
    image: "wednesday"
  },
  {
    id: "morticia",
    name: "Morticia Addams",
    description: "Elegant, sophisticated, and deeply romantic. You appreciate beauty in darkness and maintain grace under any circumstance.",
    traits: ["Elegant", "Romantic", "Mysterious", "Passionate"],
    image: "morticia"
  },
  {
    id: "gomez",
    name: "Gomez Addams",
    description: "Passionate, enthusiastic, and devoted. You love life's pleasures and show unwavering dedication to those you care about.",
    traits: ["Passionate", "Charming", "Devoted", "Adventurous"],
    image: "gomez"
  },
  {
    id: "fester",
    name: "Uncle Fester",
    description: "Eccentric, energetic, and unpredictable. You embrace your quirks and find joy in unusual experiments.",
    traits: ["Eccentric", "Energetic", "Curious", "Unconventional"],
    image: "fester"
  },
  {
    id: "pugsley",
    name: "Pugsley Addams",
    description: "Mischievous, loyal, and creative. You enjoy playful chaos and have a knack for inventive schemes.",
    traits: ["Playful", "Loyal", "Creative", "Brave"],
    image: "pugsley"
  },
  {
    id: "thing",
    name: "Thing",
    description: "Helpful, expressive, and always present. You communicate in unique ways and are an invaluable friend.",
    traits: ["Helpful", "Loyal", "Expressive", "Resourceful"],
    image: "thing"
  },
  {
    id: "lurch",
    name: "Lurch",
    description: "Quiet, dependable, and surprisingly artistic. You prefer actions over words and have hidden depths.",
    traits: ["Dependable", "Loyal", "Musical", "Reserved"],
    image: "lurch"
  },
  {
    id: "grandmama",
    name: "Grandmama",
    description: "Wise, mystical, and unconventional. You possess ancient knowledge and aren't afraid to use it.",
    traits: ["Wise", "Mystical", "Creative", "Protective"],
    image: "grandmama"
  }
];

export const questions: Question[] = [
  {
    id: 1,
    question: "What's your ideal way to spend a Friday night?",
    answers: [
      { text: "Reading dark poetry in a cemetery", character: "wednesday" },
      { text: "Hosting an elegant dinner party", character: "morticia" },
      { text: "Dancing passionately with someone special", character: "gomez" },
      { text: "Conducting strange experiments", character: "fester" },
      { text: "Planning elaborate pranks", character: "pugsley" },
      { text: "Helping friends behind the scenes", character: "thing" },
      { text: "Playing the harpsichord alone", character: "lurch" },
      { text: "Brewing mysterious potions", character: "grandmama" }
    ]
  },
  {
    id: 2,
    question: "How do you handle conflict?",
    answers: [
      { text: "With calculated, cold precision", character: "wednesday" },
      { text: "With grace and subtle manipulation", character: "morticia" },
      { text: "With passionate dramatic flair", character: "gomez" },
      { text: "With explosive unpredictability", character: "fester" },
      { text: "With clever schemes", character: "pugsley" },
      { text: "By helping others without words", character: "thing" },
      { text: "With stoic silence and loyalty", character: "lurch" },
      { text: "With ancient wisdom and spells", character: "grandmama" }
    ]
  },
  {
    id: 3,
    question: "What's your greatest strength?",
    answers: [
      { text: "My intellect and independence", character: "wednesday" },
      { text: "My elegance and charm", character: "morticia" },
      { text: "My passion and devotion", character: "gomez" },
      { text: "My creativity and energy", character: "fester" },
      { text: "My playful ingenuity", character: "pugsley" },
      { text: "My helpfulness and loyalty", character: "thing" },
      { text: "My dependability and hidden talents", character: "lurch" },
      { text: "My wisdom and mystical knowledge", character: "grandmama" }
    ]
  },
  {
    id: 4,
    question: "Pick a Halloween activity:",
    answers: [
      { text: "Writing dark stories", character: "wednesday" },
      { text: "Arranging black roses", character: "morticia" },
      { text: "Sword fighting", character: "gomez" },
      { text: "Making things explode", character: "fester" },
      { text: "Building contraptions", character: "pugsley" },
      { text: "Delivering mysterious notes", character: "thing" },
      { text: "Playing eerie music", character: "lurch" },
      { text: "Fortune telling", character: "grandmama" }
    ]
  },
  {
    id: 5,
    question: "What's your fashion style?",
    answers: [
      { text: "All black, always", character: "wednesday" },
      { text: "Elegant Victorian gothic", character: "morticia" },
      { text: "Dapper pinstripes", character: "gomez" },
      { text: "Comfortable and eccentric", character: "fester" },
      { text: "Casual mischief wear", character: "pugsley" },
      { text: "No clothes needed", character: "thing" },
      { text: "Classic butler attire", character: "lurch" },
      { text: "Mystical robes and jewelry", character: "grandmama" }
    ]
  },
  {
    id: 6,
    question: "Choose your spirit animal:",
    answers: [
      { text: "A black raven", character: "wednesday" },
      { text: "A graceful black cat", character: "morticia" },
      { text: "A passionate wolf", character: "gomez" },
      { text: "An electric eel", character: "fester" },
      { text: "A mischievous raccoon", character: "pugsley" },
      { text: "A helpful spider", character: "thing" },
      { text: "A loyal dog", character: "lurch" },
      { text: "An ancient owl", character: "grandmama" }
    ]
  },
  {
    id: 7,
    question: "What motivates you most?",
    answers: [
      { text: "Understanding the darkness within", character: "wednesday" },
      { text: "Maintaining elegance and beauty", character: "morticia" },
      { text: "Expressing unbridled passion", character: "gomez" },
      { text: "Exploring the unconventional", character: "fester" },
      { text: "Creating joyful chaos", character: "pugsley" },
      { text: "Supporting those I care about", character: "thing" },
      { text: "Quiet dedication to duty", character: "lurch" },
      { text: "Sharing ancient wisdom", character: "grandmama" }
    ]
  }
];

export function calculateResult(answers: string[]): Character {
  const counts: Record<string, number> = {};
  
  answers.forEach(answer => {
    counts[answer] = (counts[answer] || 0) + 1;
  });
  
  const winnerId = Object.entries(counts).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0];
  
  return characters.find(c => c.id === winnerId) || characters[0];
}

export function shuffleAnswers(answers: { text: string; character: string }[]) {
  const shuffled = [...answers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
