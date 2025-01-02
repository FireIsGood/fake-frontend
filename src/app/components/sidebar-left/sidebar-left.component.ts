import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: '[sidebar-left]',
  templateUrl: './sidebar-left.component.html',
  imports: [NavigationComponent, MatButtonModule, FontAwesomeModule, MatMenuModule, RouterLink],
  styleUrl: './sidebar-left.component.scss',
})
export class SidebarLeftComponent {
  readonly dotsIcon = faEllipsis;
  readonly userIcon = faUser;
  readonly settingsIcon = faGear;
}
