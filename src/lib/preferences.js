export const LOCALE_COOKIE = 'ds-locale'
export const THEME_COOKIE = 'ds-theme'

export function parseLocale(value) {
  return value === 'km' ? 'km' : 'en'
}

export function parseTheme(value) {
  return value === 'light' ? 'light' : 'dark'
}
