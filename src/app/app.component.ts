import { afterRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { FeedNavComponent } from './components/feed-nav/feed-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarLeftComponent, SidebarRightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Cool Name';
  constructor() {
    afterRender({
      write: () => {
        // IMPORTANT: HIDE THE SPLASH SCREEN
        const splashElement = document.getElementById('splash');
        splashElement?.classList.add('loaded');
      },
    });
  }
}
