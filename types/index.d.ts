export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    X: string;
    Github: string;
  };
};

export type MarketingConfig = {
  mainNav: NavItem[];
};
