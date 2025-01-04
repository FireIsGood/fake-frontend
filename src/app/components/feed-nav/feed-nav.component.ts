import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-feed-nav',
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './feed-nav.component.html',
})
export class FeedNavComponent {}
