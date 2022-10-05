const colors = {
  color_text_body: 'var(--color-text-body)',
  color_background_body: 'var(--color-background-body)',

  gray_100: 'var(--color-gray_100)',
  gray_200: 'var(--color-gray_200)',
  gray_300: 'var(--color-gray_300)',
  gray_400: 'var(--color-gray_400)',
  gray_500: 'var(--color-gray_500)',
  gray_600: 'var(--color-gray_600)',
  gray_700: 'var(--color-gray_700)',
  gray_800: 'var(--color-gray_800)',
  gray_900: 'var(--color-gray_900)',
};

export const theme = {
  colors,
};

export type ThemeType = typeof theme;
