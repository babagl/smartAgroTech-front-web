import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  toggleDarkMode() {
    const newState = !this.darkModeSubject.value;
    this.darkModeSubject.next(newState);
    document.body.classList.toggle('app-dark', newState);
  }

  isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }
}
