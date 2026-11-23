export interface MemoryPhoto {
  id: number;
  src: string;
  title: string;
  caption: string;
  momentTag: string;
}

export interface GiftSurprise {
  id: number;
  title: string;
  message: string;
  accent: 'lavender' | 'rose' | 'sky' | 'violet';
}

export interface LevelMeta {
  level: number;
  shortLabel: string;
  title: string;
}

export const LEVELS: LevelMeta[] = [
  { level: 1, shortLabel: 'Welcome', title: 'Welcome 💜' },
  { level: 2, shortLabel: 'The Door', title: 'Our First Month ♾️' },
  { level: 3, shortLabel: 'Memories', title: 'Our Memories 📸' },
  { level: 4, shortLabel: 'Surprises', title: 'Little Surprises 🎁' },
  { level: 5, shortLabel: 'Hearts', title: 'Heart Collection 💕' },
  { level: 6, shortLabel: 'The Letter', title: 'Our Special Letter 💌' },
  { level: 7, shortLabel: 'Celebration', title: 'Final Celebration 🎉' },
];

// All 13 personal uploaded photographs preserved with original colors and compositions
export const MEMORY_PHOTOS: MemoryPhoto[] = [
  {
    id: 1,
    src: '/assets/aistudio/file_00000000138c8208b8bdd7e1a4dcdc5b_b9d0bc69.png',
    title: 'Softest Pink Morning',
    caption: 'Graceful in pink, glowing effortlessly in the quiet sunlight.',
    momentTag: 'Memory 01',
  },
  {
    id: 2,
    src: '/assets/aistudio/XRecorder_20261021_02_2_9a2642b2.jpg',
    title: 'That Gentle Smile',
    caption: 'One look at this sweet expression makes every long day feel lighter.',
    momentTag: 'Memory 02',
  },
  {
    id: 3,
    src: '/assets/aistudio/8fad15e2679048b891bdb16fc4966641_27270fae.webp',
    title: 'Little White Bow',
    caption: 'Cutest little detail, cutest eyes, and my favorite person in the frame.',
    momentTag: 'Memory 03',
  },
  {
    id: 4,
    src: '/assets/aistudio/c28d0ba61a4340daa67c749998faeb13_86eb14fa.webp',
    title: 'Everyday Magic',
    caption: 'Even the simplest moment turns unforgettable when it is you.',
    momentTag: 'Memory 04',
  },
  {
    id: 5,
    src: '/assets/aistudio/XRecorder_20261024_02_2_7a24fa08.jpg',
    title: 'Golden Hour Breeze',
    caption: 'Emerald saree against the evening sky—pure poetry without a single word.',
    momentTag: 'Memory 05',
  },
  {
    id: 6,
    src: '/assets/aistudio/XRecorder_20261024_03_2_3231e59a.jpg',
    title: 'Quiet Elegance',
    caption: 'Sunlight tangled in your hair while the breeze stood still.',
    momentTag: 'Memory 06',
  },
  {
    id: 7,
    src: '/assets/aistudio/XRecorder_20261024_04_2_3d21de78.jpg',
    title: 'Sunset Horizon',
    caption: 'Looking out at the horizon, wishing I could stand right beside you.',
    momentTag: 'Memory 07',
  },
  {
    id: 8,
    src: '/assets/aistudio/bc450fe8bca041db998f243cbc00810e_37e62ecf.webp',
    title: 'Yellow Saree Radiance',
    caption: 'Soft bangles, gentle pleats, and timeless grace.',
    momentTag: 'Memory 08',
  },
  {
    id: 9,
    src: '/assets/aistudio/3be073463fdb467387ede7c247a31dda_7ccf92b8.webp',
    title: 'Classic Monochrome',
    caption: 'A little flower tucked gently by your ear, looking straight out of a dream.',
    momentTag: 'Memory 09',
  },
  {
    id: 10,
    src: '/assets/aistudio/31bf6c054ede4ef9a42c87664a292718_0757f677.webp',
    title: 'Warm Sunlight & Henna',
    caption: 'Warm golden light, delicate mehndi, and your peaceful presence.',
    momentTag: 'Memory 10',
  },
  {
    id: 11,
    src: '/assets/aistudio/XRecorder_20261024_01_2_61189131.jpg',
    title: 'Frames & Charm',
    caption: 'Those glasses, that calm look—effortlessly unforgettable.',
    momentTag: 'Memory 11',
  },
  {
    id: 12,
    src: '/assets/aistudio/e442d54a27cd429fb36bdccab22426e7_990ef1df.webp',
    title: 'Mirror Story I',
    caption: 'A quiet mirror snapshot I could look at a hundred times over.',
    momentTag: 'Memory 12',
  },
  {
    id: 13,
    src: '/assets/aistudio/682de7b54ce34db3b8e6d928fcbbf116_f2f978cc.webp',
    title: 'Mirror Story II',
    caption: 'Pure white simplicity—always carrying the sweetest aura.',
    momentTag: 'Memory 13',
  },
];

export const GIFT_SURPRISES: GiftSurprise[] = [
  {
    id: 1,
    title: 'First Reason',
    message: 'Your voice is my favorite calm after any chaotic day, Taha.',
    accent: 'lavender',
  },
  {
    id: 2,
    title: 'Distance Can’t Win',
    message: 'Even miles apart, you still feel closer to my heart than anyone else.',
    accent: 'rose',
  },
  {
    id: 3,
    title: 'Your Kind Heart',
    message: 'The gentle way you care—even when you act strict—is everything to me.',
    accent: 'sky',
  },
  {
    id: 4,
    title: 'Every Little Picture',
    message: 'Every photo you share becomes a treasure I never get tired of admiring.',
    accent: 'violet',
  },
  {
    id: 5,
    title: 'Morning Thought',
    message: 'Waking up knowing you are mine is the sweetest start to every morning.',
    accent: 'rose',
  },
  {
    id: 6,
    title: 'Forever Promise',
    message: 'I do not just want days with you—I want a lifetime of choosing you.',
    accent: 'lavender',
  },
  {
    id: 7,
    title: 'Your Patience',
    message: 'Thank you for forgiving my silly mistakes and staying by my side.',
    accent: 'sky',
  },
  {
    id: 8,
    title: 'Brightest Smile',
    message: 'Keep smiling like that—your happiness means the whole world to Ayan.',
    accent: 'violet',
  },
  {
    id: 9,
    title: 'One Month Down',
    message: '30 days of memories already, and our very best chapters have not even started yet.',
    accent: 'rose',
  },
  {
    id: 10,
    title: 'Always You',
    message: 'No matter how busy or quiet life gets, my heart always looks for you first. 💜',
    accent: 'lavender',
  },
];

export const HEART_MESSAGES: string[] = [
  'You are my favorite notification every day 💜',
  'One month with you feels like magic ♾️',
  'Even your cute anger is adorable to me 🌸',
  'I pray every tomorrow keeps us together 🤲💜',
  'Nobody can replace your place in my heart 💕',
  'Missing your hand in mine, always 🫶',
  'You make ordinary days feel like poetry ✨',
  'My sweetest blessing this month is you 🌷',
  'Stay with me through every season, Taha 💜',
  'Forever starts with one gentle month ♾️',
  'You are deeply, truly, endlessly loved ❤️',
  'Ayan’s heart belongs right where you are 💗',
];

// EXACT verbatim message requested by user — do not translate, rewrite, or remove any words
export const SPECIAL_LETTER_TEXT = `Happy 1 month Anniversary TAHA 🫠

বলতে বলতে আমাদের রিলেশন এর ১ মাস কিন্তু আমার মনেই ছিলো নাহ তাই মন তেকে সরি 😭🫶🏻

তোমার সাথে আমার দেখা না হলে ও আমার কেনো জানি মনে হয় তোমার সাথে আমার প্রতিদিন দেখা হয় ! 🫠

জানে মাঝে মাঝে তোমার হাত দরে হাটতে অনেক ইচ্ছা করে তবে দুরুত্বর জন্যে হয়ে উঠে নাহ!😌

তবে আমাদের দেখা হোক তুমি আমার স্ত্রী আমি তোমার হাসব্যান্ড পরিচয় এ !🫠

কপালে কি আছে জানি না তবে আমি চাই তুমি যেনো গার্লফ্রেন্ড নাহ এভাবে সারাজীবন আমার স্ত্রীর পরিচয় এ থাকো !😌

তবে তুমি রাগ করলে বকা দিবা শাসন করবা তাও ছেড়ে যেও না ❤️🩹😊

এই অল্প সময়ে আমি তোমাকে অনেক ভালোবেসে ফেলেছি তুমি আমাকে কোনো সময় ভুল বুঝে চলে যেও না

I love you soo much..🥹🌷

Happy 1 month to us..♾️💜`;
