import { Injectable } from '@angular/core';
import {Post, Posts} from "../../domain/post.model";
import {StateService} from "../state/state.service";
import {identity, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsStateService extends StateService<Posts> {
  posts$: Observable<Posts> = this.select(identity.bind(this));

  constructor() {
    super({posts: []}); // provide the initial state of the posts; the empty array
  }

  updatePosts(posts: Posts): void {
    this.setState(posts);
  }

}
