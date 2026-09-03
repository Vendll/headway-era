export const site = {
  name: 'Headway',
  title: 'Headway',
  description: 'Stratégia, márka, kommunikáció. Partnerség, amely megmozgat.',
  url: 'https://www.example.com',
  logo: '/assets/logo.svg',
  ogImage: '/assets/images/F28LBHi9AnvHOxydAUWZvfcRI.png',
  favicon: '/favicon.svg',
  email: 'hello@example.com',
  linkedin: 'https://www.linkedin.com/in/placeholder/',
  instagram: 'https://www.instagram.com/placeholder/',
  instagramHandle: 'placeholder',
  /** primary call to action, used in the header, hero and footer */
  cta: { label: 'Lorem ipsum', href: 'mailto:hello@example.com' },
  /** legacy portfolio links, still read by the about page */
  resumeNav: '#',
  resumeView: '#',
  copyright: '© 2025 Headway',
} as const;

export const nav = [
  { label: 'Munkáink', href: '/#munkaink' },
  { label: 'Szolgáltatások', href: '/#szolgaltatasok' },
  { label: 'Rólunk', href: '/#rolunk' },
] as const;

/**
 * Home page services. Names come from the hero line; everything else is
 * placeholder copy. `example.href` points at a work card on the home page.
 */
export interface Service {
  name: string;
  /** one promise sentence, two lines at most */
  promise: string;
  /** what the client gets; rendered in two columns */
  deliverables: readonly string[];
  example: { label: string; href: string };
}

export const services: readonly Service[] = [
  {
    name: 'Stratégia',
    promise: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    deliverables: ['Lorem ipsum audit', 'Dolor sit amet', 'Consectetur elit', 'Adipiscing roadmap', 'Sed do eiusmod', 'Tempor incididunt'],
    example: { label: 'Client One', href: '#superreply' },
  },
  {
    name: 'Márka',
    promise: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    deliverables: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur elit', 'Adipiscing sed', 'Eiusmod tempor'],
    example: { label: 'Client Four', href: '#flex-d' },
  },
  {
    name: 'Kommunikáció',
    promise: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    deliverables: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur elit', 'Adipiscing sed', 'Eiusmod tempor', 'Incididunt ut'],
    example: { label: 'Client Two', href: '#slate' },
  },
];

export const experience = [
  { company: 'Company One', role: 'Job Title', when: 'Summer 2025' },
  { company: 'Company <em>Two (Lorem)</em>', role: 'Job Title', when: 'March 2025' },
  { company: 'Company Three', role: 'Job Title', when: 'May 2024' },
  { company: 'Company <em>Four</em>', role: 'Job Title <span class="accent">(Lorem ipsum)</span>', when: '2022 - 2024' },
] as const;
