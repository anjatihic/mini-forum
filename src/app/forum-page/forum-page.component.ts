import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../post.model";
import {BehaviorSubject, map, Subscription} from "rxjs";
import {PostService} from "./post.service";

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit, OnDestroy{
  showHide: any;
  buttonMessage: any;
  posts: Post[] = [];
  postSubject: BehaviorSubject<Post[]> | null = null;
  subscription: Subscription | null = null;
  editingPost: Post = new Post();
  editingIndex: number | null = null;

  constructor(private postService: PostService) {
  }
  showHideComp(){
    this.showHide = !this.showHide;

    if(this.showHide === true){
      this.buttonMessage = "Cancel";
    }
    else{
      this.buttonMessage = "New post"
    }
  }

  ngOnInit(){
    this.buttonMessage = "New post";

    this.postSubject = this.postService.getPosts();
    this.subscription = this.postSubject
      .subscribe(res => {
        this.posts = res;
      })
  }

  setEdit(i:number){
    this.editingPost= {...this.posts[i]};
    this.editingIndex=i;
  }

  doneEditing(i: number){
    this.postService.editPost(this.editingPost);
    this.editingIndex = null;
    this.editingPost = new Post();
  }

  deletePost(i: number){
    let c = this.posts[i];
    this.postService.deletePost(c.id);
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
