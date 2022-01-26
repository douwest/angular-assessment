import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../domain/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUrl: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.postsUrl}`)
  }
}
