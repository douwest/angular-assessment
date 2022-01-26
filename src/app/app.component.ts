import { Component } from '@angular/core';
import {Post} from "./domain/post.model";
import {Observable} from "rxjs";
import {PostsService} from "./services/posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-assessment';
  posts$?: Observable<Post[]>;

  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getPosts();
  }
}
