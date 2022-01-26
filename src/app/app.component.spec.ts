import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {PostsService} from "./services/posts.service";
import {of} from "rxjs";
import {Post} from "./domain/post.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatToolbarModule} from "@angular/material/toolbar";

describe('AppComponent', () => {
  let postsService: PostsService;
  let posts: Post[] = [{id: 1} as Post];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provider: PostsService,
          useValue: {getPosts: () => {of(posts)}}
        }
      ]
    }).compileComponents();
    postsService = TestBed.get(PostsService);
  });

  it('should create the app, do a call to the posts service to retrieve posts', () => {
    const getPostsSpy = spyOn(postsService, 'getPosts');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();
    expect(getPostsSpy).toHaveBeenCalled();
  });

  it(`should have as title 'angular-assessment'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-assessment');
  });
});
