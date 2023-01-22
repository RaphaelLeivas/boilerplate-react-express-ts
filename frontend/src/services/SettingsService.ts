import { ThemeModes } from '../@types';

class SettingsService {
  setThemeMode = (mode: ThemeModes) => {
    localStorage.setItem('themeMode', mode);
  };

  setLangauge = (language: string) => {
    localStorage.setItem('language', language);
  };

  getThemeMode = (): ThemeModes => localStorage.getItem('themeMode') === 'light' ? 'light' : 'dark';

  getLangauge = (): string => localStorage.getItem('language') ?? '';
}

export default new SettingsService();
