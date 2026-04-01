import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Investment', href: getPermalink('/investment/') },
    { text: 'Consulting', href: getPermalink('/consulting/') },
    { text: 'Assets', href: getPermalink('/assets/') },
    { text: 'Philanthropy', href: getPermalink('/philanthropy/') },
    { text: 'Articles', href: getBlogPermalink() },
    { text: 'Contact', href: getPermalink('/contact/') },
  ],
  actions: [{ text: 'JP', href: '/ja/' }],
};

export const headerDataJa = {
  links: [
    { text: '投資', href: '/ja/investment/' },
    { text: 'コンサルティング', href: '/ja/consulting/' },
    { text: 'アセット', href: '/ja/assets/' },
    { text: '慈善活動', href: '/ja/philanthropy/' },
    { text: '記事', href: '/ja/articles/' },
    { text: 'お問い合わせ', href: '/ja/contact/' },
  ],
  actions: [{ text: 'EN', href: '/' }],
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

export const footerDataJa = {
  links: [
    {
      title: 'サービス',
      links: [
        { text: '投資', href: '/ja/investment/' },
        { text: 'コンサルティング', href: '/ja/consulting/' },
        { text: 'インキュベーター', href: '/ja/incubator/' },
        { text: 'プライベート・エクイティ', href: '/ja/private-equity/' },
      ],
    },
    {
      title: '会社情報',
      links: [
        { text: 'チーム', href: '/ja/team/' },
        { text: '慈善活動', href: '/ja/philanthropy/' },
        { text: 'Life @DFG', href: '/ja/life/' },
        { text: 'お問い合わせ', href: '/ja/contact/' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [{ ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/Kevinostoll' }],
  footNote: '© 2026 Deerfield Green. All rights reserved.',
};
