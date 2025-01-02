import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedNavComponent } from '../../components/feed-nav/feed-nav.component';

@Component({
  imports: [RouterOutlet, FeedNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
