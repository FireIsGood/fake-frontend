import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';

type ColorTheme = 'light' | 'dark' | 'auto';

@Component({
  selector: 'app-theme-switcher',
  imports: [NgClass, MatMenuModule, MatButtonModule, MatTooltipModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  theme = signal(this.getTheme());
  iconClass = computed(() => this.computeIcon());

  readonly themeText: Record<ColorTheme, string> = {
    light: 'Light mode',
    dark: 'Dark mode',
    auto: 'Match system',
  };

  constructor() {
    this.setTheme(this.theme());
  }

  getTheme(): ColorTheme {
    if (typeof localStorage !== 'undefined') {
      const localTheme = localStorage.getItem('theme');
      if (localTheme === 'light' || localTheme === 'dark' || localTheme === 'auto') {
        return localTheme;
      }
    }

    return 'auto';
  }

  setTheme(theme: ColorTheme) {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }

  computeIcon() {
    if (
      this.theme() === 'dark' ||
      (this.theme() === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'theme-toggle--toggled';
    }
    return '';
  }
}
