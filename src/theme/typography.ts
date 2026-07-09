export const fonts = { regular: 'System', medium: 'System', bold: 'System' };
export const fontSizes = { xs: 11, sm: 13, base: 15, md: 17, lg: 20, xl: 24, xxl: 30, hero: 38, display: 48 };
export const lineHeights = { xs: 16, sm: 20, base: 24, md: 28, lg: 32, xl: 36, xxl: 42, hero: 50, display: 60 };
export const textStyles = {
  hero: { fontWeight: '700' as const, fontSize: fontSizes.hero, lineHeight: lineHeights.hero },
  h1: { fontWeight: '700' as const, fontSize: fontSizes.xxl, lineHeight: lineHeights.xxl },
  h2: { fontWeight: '700' as const, fontSize: fontSizes.xl, lineHeight: lineHeights.xl },
  h3: { fontWeight: '600' as const, fontSize: fontSizes.lg, lineHeight: lineHeights.lg },
  body: { fontWeight: '400' as const, fontSize: fontSizes.base, lineHeight: lineHeights.base },
  bodySmall: { fontWeight: '400' as const, fontSize: fontSizes.sm, lineHeight: lineHeights.sm },
  caption: { fontWeight: '400' as const, fontSize: fontSizes.xs, lineHeight: lineHeights.xs },
  button: { fontWeight: '600' as const, fontSize: fontSizes.base, lineHeight: lineHeights.base },
  tab: { fontWeight: '500' as const, fontSize: fontSizes.xs, lineHeight: lineHeights.xs },
} as const;