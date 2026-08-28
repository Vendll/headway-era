export const site = {
  name: 'Placeholder Name',
  title: 'Placeholder Name',
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  url: 'https://www.example.com',
  logo: '/assets/logo.svg',
  ogImage: '/assets/images/F28LBHi9AnvHOxydAUWZvfcRI.png',
  favicon: '/assets/images/dXhAilG5pWMihFG0BFDF6ivUyk.png',
  email: 'hello@example.com',
  linkedin: 'https://www.linkedin.com/in/placeholder/',
  instagram: 'https://www.instagram.com/placeholder/',
  instagramHandle: 'placeholder',
  /** "Resume" button in the floating nav */
  resumeNav: '#',
  /** "View Resume" button in the experience section */
  resumeView: '#',
  copyright: '© 2025 | Lorem ipsum dolor sit amet.',
} as const;

export const nav = [
  { label: 'Work', href: '/#projects' },
  { label: 'Play', href: '/play' },
  { label: 'About', href: '/about' },
  { label: 'Experimental', href: '/experimental' },
] as const;

export const experience = [
  { company: 'Company One', role: 'Job Title', when: 'Summer 2025' },
  { company: 'Company <em>Two (Lorem)</em>', role: 'Job Title', when: 'March 2025' },
  { company: 'Company Three', role: 'Job Title', when: 'May 2024' },
  { company: 'Company <em>Four</em>', role: 'Job Title <span class="accent">(Lorem ipsum)</span>', when: '2022 - 2024' },
] as const;
