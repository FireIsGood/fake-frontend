import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export type Post = {
  id: number;
  title: string;
  content: string;
};

@Component({
  selector: 'app-post',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './post.component.html',
})
export class PostComponent {
  readonly post = input.required<Post>();
}
