import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Investment', href: getPermalink('/investment/') },
    { text: 'Consulting', href: getPermalink('/consulting/') },
    { text: 'Team', href: getPermalink('/team/') },
    { text: 'Philanthropy', href: getPermalink('/philanthropy/') },
    { text: 'Articles', href: getBlogPermalink() },
    { text: 'Contact', href: getPermalink('/contact/') },
  ],
  actions: [{ text: 'JP', href: '/ja/' }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Investment', href: getPermalink('/investment/') },
        { text: 'Consulting', href: getPermalink('/consulting/') },
        { text: 'Incubator', href: getPermalink('/incubator/') },
        { text: 'Private Equity', href: getPermalink('/private-equity/') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'Team', href: getPermalink('/team/') },
        { text: 'Philanthropy', href: getPermalink('/philanthropy/') },
        { text: 'Life @DFG', href: getPermalink('/life/') },
        { text: 'Contact', href: getPermalink('/contact/') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [{ ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/Kevinostoll' }],
  footNote: '© 2026 Deerfield Green. All rights reserved.',
};
