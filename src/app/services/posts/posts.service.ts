import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, shareReplay} from "rxjs";
import {Post, Posts} from "../../domain/post.model";
import {PostsStateService} from "../posts-state/posts-state.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl: string = "https://jsonplaceholder.typicode.com/posts";
  posts$: Observable<Post[] | undefined> = this.postsStateService.posts$.pipe(map(wrapper => wrapper.posts));

  constructor(private httpClient: HttpClient, private postsStateService: PostsStateService) {
    this.getPosts().subscribe(posts => postsStateService.updatePosts(posts));
  }

  getPosts(): Observable<Posts> {
    return this.httpClient.get<Posts>(`${this.postsUrl}`)
      .pipe(
        catchError(this.handleError<Posts>('getPosts', {posts: []})),
        shareReplay()
      );
  }

  private handleError<T>(method: string, result: T) {
    return (error: any) => {
      console.error(method, 'failed:', error);
      return of(result as T);
    };
  }
}
