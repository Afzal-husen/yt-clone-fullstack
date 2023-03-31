const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tabletAdjustm: "579px",
  tabletAdjust: "580px",
  tablet: "768px",
  ipad: "950px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  tabletm: `(min-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  ipad: `(max-width: ${size.ipad})`,
  adjust: `(min-width: ${size.tabletAdjust})`,
  adjustm: `(max-width: ${size.tabletAdjustm})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};
