import { Component, computed, signal } from '@angular/core';
import { Post, PostComponent } from '../post/post.component';
import { ActivatedRoute, Data } from '@angular/router';
import { getFeed } from '../../scripts/post-store';
import { LoaderComponent } from '../loader/loader.component';

export type Feed = 'explore' | 'cats';

@Component({
  selector: 'app-feed',
  imports: [PostComponent, LoaderComponent],
  templateUrl: './feed.component.html',
})
export class FeedComponent {
  readonly routeData = signal<Data>({});
  readonly postList = signal<Post[]>([]);
  readonly feedName = computed<string>(() => this.routeData()['feed'] ?? 'Unknown');
  loading = true;

  constructor(route: ActivatedRoute) {
    route.data.subscribe((data) => this.routeData.set(data));
  }

  ngOnInit(): void {
    this.getFeed();
  }

  async getFeed() {
    const feedName = this.routeData()['feed'] as Feed;
    const feed: Post[] | undefined = await getFeed(feedName);
    if (feed) {
      this.postList.set(feed);
    }
    this.loading = false;
  }
}
