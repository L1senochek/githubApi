export enum Theme {
  dark = 'dark',
  light = 'light',
}

export interface IThemeState {
  theme: Theme.dark | Theme.light;
}
