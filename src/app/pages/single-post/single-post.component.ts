import { Component, Input } from '@angular/core';
import { Post, PostComponent } from '../../components/post/post.component';
import { getPost } from '../../scripts/post-store';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  imports: [PostComponent, MatButtonModule, LoaderComponent, FontAwesomeModule],
  templateUrl: './single-post.component.html',
})
export class SinglePostComponent {
  @Input()
  set id(id: string) {
    this.postId = Number(id);
  }

  readonly routeData = false;
  loading = true;
  postId: number | undefined;
  post: Post | undefined;

  postIcon = faNoteSticky;

  constructor(private location: Location) {}

  async ngOnInit() {
    this.post = await getPost(Number(this.postId));
    this.loading = false;
  }

  handleBack() {
    this.location.back();
  }
}
