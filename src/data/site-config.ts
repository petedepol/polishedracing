export const siteConfig = {
  name: 'Pete Michaliszyn',
  title: 'Pete Michaliszyn — World Cup Mechanic',
  description: 'World Cup downhill mountain bike mechanic. Gee Atherton\'s personal wrencher for 7+ years across Trek Factory Racing and Atherton Racing.',
  url: 'https://polishedracing.co.uk',
  ogImage: '/images/og-image.jpg',
  social: {
    instagram: 'https://www.instagram.com/polishedracing',
    linkedin: 'https://www.linkedin.com/in/petemichaliszyn',
    email: 'pete@polishedracing.co.uk',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Timeline', href: '/timeline' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;
