import { Injectable } from '@angular/core';
import {Post} from "../../domain/post.model";
import {StateService} from "../state/state.service";
import {identity, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsStateService extends StateService<Post[]> {
  posts$: Observable<Post[]> = this.select(identity.bind(this));

  constructor() {
    super([]); // provide the initial state of the posts; the empty array
  }

  updatePosts(posts: Post[]): void {
    this.setState(posts);
  }

}
