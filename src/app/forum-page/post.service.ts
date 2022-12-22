import { Injectable } from '@angular/core';
import {Post} from "../models/post.model";
import {BehaviorSubject} from "rxjs";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[] = [];
  postSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private dataService: DataService) {
    this.init();
  }

  init(){
    this.dataService.getPosts()
      .subscribe(res => {
        this.posts = res;
        this.postSubject.next([...this.posts]);
      })
  }

  getPosts(){
    return this.postSubject;
  }

  addPost(post: Post){
    this.dataService.addPost(post)
      .subscribe((res => {
        console.log(res);
        this.posts.push(post);
        this.postSubject.next([...this.posts]);
      }))
  }

  editPost(post: Post){
    this.dataService.editPost(post)
      .subscribe((res => {
        console.log(res);
        this.posts[this.posts.findIndex(c => c.id == post.id)] = post;
        this.postSubject.next([...this.posts]);
      }),error => {
        console.log(error);
      });
  }

  deletePost(id: string){
    this.dataService.deletePost(id)
      .subscribe((res => {
        console.log(res);
        this.posts = this.posts.filter(c => c.id != id);
        this.postSubject.next([...this.posts]);
      }))
  }
}
