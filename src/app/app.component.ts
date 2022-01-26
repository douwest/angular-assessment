import {ChangeDetectorRef, Component} from '@angular/core';
import {PostsService} from "./services/posts/posts.service";
import {PostsStateService} from "./services/posts-state/posts-state.service";
import {Post} from "./domain/post.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts$: Observable<Post[]> = this.postsStateService.posts$;

  constructor(private postsService: PostsService, private postsStateService: PostsStateService, private cdr: ChangeDetectorRef) {
    this.postsService.getPosts().subscribe(posts => this.postsStateService.updatePosts(posts));
  }
}
