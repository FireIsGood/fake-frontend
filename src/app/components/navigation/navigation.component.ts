import { Component } from '@angular/core';
import { MatListModule, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faGear,
  faHouse,
  faInbox,
  faMagnifyingGlass,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

type PageLink = {
  icon: IconDefinition;
  path: string;
  label: string;
};

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatNavList, FontAwesomeModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly pageLinks: PageLink[] = [
    {
      icon: faHouse,
      path: '/dashboard',
      label: 'Dashboard',
    },
    {
      icon: faBell,
      path: '/404',
      label: 'Notifications',
    },
    {
      icon: faMagnifyingGlass,
      path: '/404',
      label: 'Search',
    },
    {
      icon: faInbox,
      path: '/404',
      label: 'Inbox',
    },
  ];
}
