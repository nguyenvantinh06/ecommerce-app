export interface IThemeState {
  isDark: boolean;
  fontSelect: IFontSelect;
  themeSelect: IThemeSelect;
}

export interface IFontSelect {
  title: string;
  value: string;
}

export interface IThemeSelect {
  id?: number | undefined;
  title: string;
  value: string;
  keyWord: string;
}
