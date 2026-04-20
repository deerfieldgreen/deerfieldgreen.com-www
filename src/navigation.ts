import { getPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    { text: "Services", href: getPermalink("/services/") },
    { text: "Philanthropy", href: getPermalink("/philanthropy/") },
    { text: "Insights", href: getPermalink("/insights/") },
    { text: "@DFG", href: getPermalink("/life/") },
  ],
  actions: [{ text: "JP", href: "/ja/" }],
};

export const headerDataJa = {
  links: [
    { text: "サービス", href: "/ja/services/" },
    { text: "慈善活動", href: "/ja/philanthropy/" },
    { text: "インサイト", href: "/ja/insights/" },
    { text: "@DFG", href: "/ja/life/" },
  ],
  actions: [{ text: "EN", href: "/" }],
};

export const footerData = {
  links: [
    {
      title: "What We Do",
      links: [
        { text: "Investment", href: getPermalink("/investment/") },
        { text: "Services", href: getPermalink("/services/") },
        { text: "Incubator", href: getPermalink("/incubator/") },
        { text: "Private Equity", href: getPermalink("/private-equity/") },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "Team", href: getPermalink("/team/") },
        { text: "Philanthropy", href: getPermalink("/philanthropy/") },
        { text: "Life @DFG", href: getPermalink("/life/") },
        { text: "Contact", href: getPermalink("/contact/") },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: "LinkedIn",
      icon: "tabler:brand-linkedin",
      href: "https://www.linkedin.com/company/deerfieldgreen/",
    },
  ],
  footNote: "© 2026 Deerfield Green. All rights reserved.",
};

export const footerDataJa = {
  links: [
    {
      title: "事業内容",
      links: [
        { text: "投資", href: "/ja/investment/" },
        { text: "サービス", href: "/ja/services/" },
        { text: "インキュベーター", href: "/ja/incubator/" },
        { text: "プライベート・エクイティ", href: "/ja/private-equity/" },
      ],
    },
    {
      title: "会社情報",
      links: [
        { text: "チーム", href: "/ja/team/" },
        { text: "慈善活動", href: "/ja/philanthropy/" },
        { text: "Life @DFG", href: "/ja/life/" },
        { text: "お問い合わせ", href: "/ja/contact/" },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: "LinkedIn",
      icon: "tabler:brand-linkedin",
      href: "https://www.linkedin.com/company/deerfieldgreen/",
    },
  ],
  footNote: "© 2026 Deerfield Green. All rights reserved.",
};
