import {Component} from '@angular/core';
import {Post} from "./domain/post.model";
import {Observable} from "rxjs";
import {PostsService} from "./services/posts/posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts$: Observable<Post[] | undefined> = this.postsService.posts$

  constructor(private postsService: PostsService) {
  }
}
