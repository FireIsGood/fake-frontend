import { Component, computed, inject, signal } from '@angular/core';
import { Post, PostComponent } from '../post/post.component';
import { ActivatedRoute, Data } from '@angular/router';
import { getFeed } from '../../scripts/post-store';
import { LoaderComponent } from '../loader/loader.component';
import { CallbackDictionary, GlobalKeydownService } from '../../services/global-keydown-service.service';
import { Subject, takeUntil } from 'rxjs';

export type Feed = 'explore' | 'cats';

@Component({
  selector: 'app-feed',
  imports: [PostComponent, LoaderComponent],
  templateUrl: './feed.component.html',
})
export class FeedComponent {
  navOffset = 80 + 16;

  private KeyboardService = inject(GlobalKeydownService);
  destroyEvent = new Subject();
  shortcutList: CallbackDictionary = {
    j: () => this.scrollToPost(1),
    k: () => this.scrollToPost(-1),
  };

  readonly routeData = signal<Data>({});
  readonly postList = signal<Post[]>([]);
  readonly feedName = computed<string>(() => this.routeData()['feed'] ?? 'Unknown');
  postIndex: number = 0;
  loading = true;

  constructor(route: ActivatedRoute) {
    route.data.subscribe((data) => this.routeData.set(data));
  }

  ngOnInit(): void {
    this.getFeed();
    this.KeyboardService.keydownEvents.pipe(takeUntil(this.destroyEvent)).subscribe((key) => {
      this.KeyboardService.handleKeydown(key, this.shortcutList);
    });
  }

  async getFeed() {
    const feedName = this.routeData()['feed'] as Feed;
    const feed: Post[] | undefined = await getFeed(feedName);
    if (feed) {
      this.postList.set(feed);
    }
    this.loading = false;
  }

  scrollToPost(index: number) {
    console.log(index);
    this.postIndex = Math.max(Math.min(this.postIndex + index, this.postList().length - 1), 0);
    const post = document.querySelector(`#post-${this.postIndex}`) as HTMLElement;
    window.scrollTo(0, post.offsetTop - this.navOffset);
    post.focus();
  }
}
