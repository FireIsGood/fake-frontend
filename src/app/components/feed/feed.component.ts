import { Component, computed, inject, signal, viewChildren } from '@angular/core';
import { Post, PostComponent } from '../post/post.component';
import { ActivatedRoute, Data } from '@angular/router';
import { getFeed } from '../../scripts/post-store';
import { LoaderComponent } from '../loader/loader.component';
import { CallbackDictionary, GlobalKeydownService } from '../../services/global-keydown-service.service';
import { Subject, takeUntil } from 'rxjs';

export type Feed = 'explore' | 'cats';

export enum PostAction {
  Repost,
  Like,
}

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
    '.': () => this.scrollToPost(0, true),
    l: () => this.postAction(PostAction.Like),
    r: () => this.postAction(PostAction.Repost),
  };

  readonly routeData = signal<Data>({});
  readonly postList = signal<Post[]>([]);
  readonly feedName = computed<string>(() => this.routeData()['feed'] ?? 'Unknown');
  activePostIndex = signal<number>(0);
  activePostId = computed<number>(() => this.postList()[this.activePostIndex()].id);

  loading = true;

  postListElements = viewChildren(PostComponent);

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

  scrollToPost(index: number, absolute: boolean = false) {
    if (absolute) {
      this.activePostIndex.set(index);
    } else {
      this.activePostIndex.set(Math.max(Math.min(this.activePostIndex() + index, this.postList().length - 1), 0));
    }
    const post = document.querySelector(`#post-${this.activePostId()}`) as HTMLElement | null;
    if (post === null) return;
    post.focus();
    window.scrollTo(0, post.offsetTop - this.navOffset);
  }

  postAction(action: PostAction) {
    const activePost = this.postListElements().find((e) => e.post().id === this.activePostId());
    if (activePost === undefined) return;
    switch (action) {
      case PostAction.Repost:
        activePost.repostPost();
        break;
      case PostAction.Like:
        activePost.likePost();
        break;
    }
  }
}
