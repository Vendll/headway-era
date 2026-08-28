export interface Project {
  id: string;
  num: string;
  year: string;
  title: string;
  /** HTML allowed (bold spans) */
  description: string;
  discipline: string;
  role: string;
  timeline: string;
  href: string;
  external?: boolean;
  media: { type: 'image' | 'video'; src: string; alt: string; fit?: 'contain' | 'cover' };
  mediaBg: string;
}

export const projects: Project[] = [
  {
    id: 'superreply',
    num: '01',
    year: '2024',
    title: 'Project One: Lorem ipsum dolor sit amet consectetur elit',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod tempor, <strong>100,000+ in labore et dolore.</strong>',
    discipline: 'Lorem ipsum dolor',
    role: 'Job Title',
    timeline: '6 weeks for the MVP',
    href: '/superreply',
    media: { type: 'image', src: '/assets/images/gAtztWfqOBOUmmIsslCnlYYMK4.png', alt: 'Placeholder product screenshot', fit: 'contain' },
    mediaBg: '#1a191c',
  },
  {
    id: 'slate',
    num: '02',
    year: '2025',
    title: 'Project Two: Lorem ipsum dolor consectetur adipiscing elit',
    description:
      'Explored 3 lorem ipsum flows for dolor sit amet, consectetur adipiscing, elit sed eiusmod, and tempor incididunt,  with 5+ practical lorem ipsum dolor embedded directly into each interaction.',
    discipline: 'Lorem ipsum, Dolor sit amet, consectetur adipiscing, Elit sed',
    role: 'Lorem ipsum, Dolor sit amet, and consectetur',
    timeline: '5 weeks',
    href: '/slate',
    media: { type: 'video', src: '/assets/videos/uGNNU56piHUH41aR287ifwKCcIk.mp4', alt: 'Placeholder dashboard walkthrough', fit: 'contain' },
    mediaBg: '#151515',
  },
  {
    id: 'gemini',
    num: '03',
    year: '2026',
    title: 'Project Three: Lorem Ipsum Dolor\nConsectetur - Elit',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod, tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation.',
    discipline: 'Lorem Ipsum, Dolor Sit Amet, Consectetur Elit',
    role: 'Lorem ipsum - dolor, sit amet, consectetur elit, and adipiscing',
    timeline: '24-hour design sprint',
    href: '/gemini',
    media: { type: 'video', src: '/assets/videos/FvveIJjwYvECP5KivTV9HCAYBc.mp4', alt: 'Placeholder mobile prototype', fit: 'contain' },
    mediaBg: '#262626',
  },
  {
    id: 'flex-d',
    num: '04',
    year: '2025',
    title: 'Project Four - Lorem Ipsum Dolor',
    description:
      'Lorem ipsum dolor sit amet consectetur for Project Four, a placeholder mobile app built around expressive, character-driven interactions across 50+ screens.',
    discipline: 'Lorem, Ipsum dolor, Sit amet, Consectetur elit, Adipiscing sed',
    role: 'Lorem ipsum, Dolor sit, amet consectetur, Elit adipiscing',
    timeline: '10 weeks',
    href: '/flex-d',
    media: { type: 'image', src: '/assets/images/2PuOsJBSQPuprBpxp1Lq35tCVM.png', alt: 'Placeholder brand artwork', fit: 'contain' },
    mediaBg: '#151515',
  },
  {
    id: 'speakaboo',
    num: '05',
    year: '2025',
    title: 'Project Five - Lorem Ipsum Dolor Consectetur',
    description:
      'Lorem ipsum dolor and sit amet consectetur for Project Five. a placeholder mobile app helping lorem ipsum dolor understand their consectetur through adipiscing elit and sed eiusmod tempor.<br><br><em>(Opens in a new tab)</em>',
    discipline: 'Lorem ipsum, Dolor sit, Amet consectetur, Elit adipiscing',
    role: '1 of 4 lorem, ipsum dolor, sit amet consectetur, adipiscing elit',
    timeline: '3 months',
    href: '#',
    external: true,
    media: { type: 'image', src: '/assets/images/UeY2gYaW5v6UmyzfzpzNKvtmpg.png', alt: 'Placeholder app on a phone held in a hand', fit: 'cover' },
    mediaBg: '#151515',
  },
];

export const testimonials = [
  {
    quote:
      'Placeholder lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore. Et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    role: 'Job Title | Company Name',
    name: 'Person One',
  },
  {
    quote:
      'Placeholder lorem ipsum dolor sit amet consectetur adipiscing elit, sed do, eiusmod tempor incididunt, ut labore et dolore magna aliqua.',
    role: 'Job Title | Company Name',
    name: 'Person Two',
  },
  {
    quote:
      'Placeholder’s dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
    role: 'Job Title | Company Name',
    name: 'Person Three',
  },
  {
    quote:
      'Placeholder’s lorem ipsum dolor sit amet consectetur adipiscing. Elit sed do eiusmod tempor incididunt ut labore, et dolore magna aliqua enim ad minim veniam quis nostrud exercitation.',
    role: 'Job Title | Company Name',
    name: 'Person Four',
  },
];
