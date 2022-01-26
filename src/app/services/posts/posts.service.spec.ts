import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Post} from "../../domain/post.model";

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the posts', (done) => {
    service.getPosts()
      .subscribe((res: any) => {
        expect(res).toEqual([{id: 1} as Post]);
        done();
      });

    let postsRequest = httpMock.expectOne("https://jsonplaceholder.typicode.com/posts");
    postsRequest.flush([{id: 1} as Post])
    httpMock.verify();
  });
});
