import { Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: '[sidebar-right]',
  imports: [ThemeSwitcherComponent],
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.scss',
})
export class SidebarRightComponent {}
