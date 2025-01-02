import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FeedComponent } from './components/feed/feed.component';
import { BlogComponent } from './pages/blog/blog.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard/home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: FeedComponent,
        data: { feed: 'explore', reuseRoute: true },
      },
      {
        path: 'cats',
        title: 'Cat images wow',
        component: FeedComponent,
        data: { feed: 'cats', reuseRoute: true },
      },
    ],
  },
  {
    path: 'post/:id',
    title: 'Some post',
    component: SinglePostComponent,
    data: { reuseRoute: false },
  },
  {
    path: 'settings',
    title: 'Settings',
    component: SettingsComponent,
    data: { reuseRoute: false },
  },
  {
    path: 'blog/:id',
    title: 'Blog',
    component: BlogComponent,
    data: { reuseRoute: true },
  },
  {
    path: '**',
    title: 'Where did you go?',
    component: PageNotFoundComponent,
  },
];
