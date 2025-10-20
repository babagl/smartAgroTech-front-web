import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = false;

  toggleDarkMode(enable: boolean) {
    this.darkMode = enable;
    const app = document.querySelector('body');
    if (enable) app?.classList.add('app-dark');
    else app?.classList.remove('app-dark');
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}
