// -----------------------------------------------------------------------
// STRUCTURED CONTENT — kept separate from layout so a future CMS/backend
// can swap the data source without touching component code.
// -----------------------------------------------------------------------

export type Speaker = {
  name: string;
  country: string;
  region: 'non-saarc' | 'saarc';
  bio?: string;
  sessionTopic?: string;
};

export const speakers: Speaker[] = [
  { name: 'Dr. Samer Khader', country: 'USA', region: 'non-saarc' },
  { name: 'Dr. Lakshmi Harinath', country: 'USA', region: 'non-saarc' },
  { name: 'Dr. Tomoo Itoh', country: 'Japan', region: 'non-saarc' },
  {
    name: 'Dr. Pasupati Meenakshi Thanikachalam',
    country: 'Malaysia',
    region: 'non-saarc',
  },
  { name: 'Dr. Do Minh Hoang Trong', country: 'Vietnam', region: 'non-saarc' },
];

export type AwardCategory = {
  name: string;
  winners: string;
  eligibility: string;
  amount?: string;
  note?: string;
};

export const awards: AwardCategory[] = [
  {
    name: 'Young Investigator Award (YIA)',
    winners: '1 awardee',
    eligibility:
      'Presenting author of an accepted abstract, under 40 years of age.',
    note:
      'You will need to mention your YIA application and attach proof of age when submitting your abstract. Winner selected by the Juries following oral presentation.',
  },
  {
    name: 'Best Oral Presentation Awards',
    winners: '2 awardees',
    eligibility: 'Presenting author of an abstract accepted for oral presentation.',
    note: 'No separate application — all accepted oral abstracts are automatically considered.',
  },
  {
    name: 'Best Poster Presentation Awards',
    winners: '2 awardees',
    eligibility: 'Presenting author of an abstract accepted for poster presentation.',
    note: 'No separate application — all accepted poster abstracts are automatically considered.',
  },
  {
    name: 'Academic/Travel Grant',
    winners: '5 awardees',
    eligibility: 'Registered abstract presenter, under 30 years of age.',
    amount: 'USD 100 for each awardee',
    note: 'Proof of date of birth will be required later.',
  },
];

export type Attraction = {
  name: string;
  category: 'Diving' | 'Nature' | 'Cultural';
  description: string;
};

export const attractions: Attraction[] = [
  {
    name: 'Hanifaru Bay',
    category: 'Nature',
    description:
      'UNESCO Biosphere Reserve in Baa Atoll, famous for gatherings of up to 200 manta rays at once.',
  },
  {
    name: 'South Ari Atoll',
    category: 'Diving',
    description: "One of the world's most reliable places to swim with whale sharks year-round.",
  },
  {
    name: 'Vaadhoo Island',
    category: 'Nature',
    description:
      'The "Sea of Stars" — bioluminescent plankton light up the shoreline after dark.',
  },
  {
    name: 'Scuba Diving & Snorkeling',
    category: 'Diving',
    description:
      'Visibility up to 40 metres, warm waters, and reef life including manta rays, reef sharks, and turtles.',
  },
  {
    name: 'Sandbank Picnics',
    category: 'Nature',
    description:
      'Private excursions to tiny sandbanks surrounded by turquoise lagoons.',
  },
  {
    name: 'Local Island Visits',
    category: 'Cultural',
    description:
      'Fishing villages, mosques, and pastel-coloured houses. Dress modestly outside resort islands.',
  },
  {
    name: 'Sunset Dolphin Cruises',
    category: 'Nature',
    description: 'Spinner dolphins often gather near the reefs in late afternoon.',
  },
];

export type LeadershipContact = {
  name: string;
  roles: string[];
  email: string;
  phone: string;
};

export const leadership: LeadershipContact[] = [
  {
    name: 'Prof. (Dr.) R. G. W. Pinto',
    roles: ['President, SACH', 'Organizing Chairman, SACH 2027'],
    email: 'rgwpinto@gmail.com',
    phone: '+91-9422641170',
  },
  {
    name: 'Prof. (Dr.) K. K. Prasad',
    roles: ['Secretary, SACH', 'Organizing Secretary, SACH 2027'],
    email: 'kaushalkp10@hotmail.com',
    phone: '+91-9872836195',
  },
];

export const eventManager = {
  agency: 'Air Yatra Online',
  address: 'SCO No. 116-117, First floor, Madhya Marg, Sector 8C, Chandigarh – 160009, INDIA',
  email: 'ach2026.registration@airyatraonline.com',
  phones: ['+91 91151 15278', '+91 99143 89549', '+91 82890 99298'],
};
