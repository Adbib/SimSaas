import logo from "~/assets/imgs/logo.png";
export const siteConfigs = {
  siteTitle: "ShopiTrackr",
  siteDescription: "Tracking shopify products made easy!",
  siteKeywords:
    "react, nextjs, typescript, tailwindcss, prisma, shopify, tracking, products, shopitrackr",
  siteUrl: "https://shopitrackr.com",
  siteImage: "/images/og-image.jpg",
  siteAuthor: "#",
  siteTwitter: "#",
  siteFacebook: "#",
  siteInstagram: "#",
  siteLinkedin: "#",
  siteGithub: "#",
  siteThemeColor: "#000000",
  siteBackgroundColor: "#ffffff",
  siteLanguage: "en",
  siteLocale: "en_US",
  siteFavicon: logo, //"/favicon.ico",
  siteLogo: logo, //"/logo.svg",
  passwordMinLength: 3,
  usernameMinLength: 3,
} as const;
