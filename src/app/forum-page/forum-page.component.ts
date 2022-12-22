import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post.model";
import {BehaviorSubject, map, Subscription} from "rxjs";
import {PostService} from "./post.service";
import {User} from "../models/user.model";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

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


  currentUser!: User;
  users: User[]= [];


  constructor(private postService: PostService, private auth: AuthService, private http: HttpClient, private router: Router) {
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
    this.currentUser = this.auth.fetchUser;
    console.log('Ovo je trenutni user: ' + this.currentUser.name);
    this.buttonMessage = "New post";

    this.postSubject = this.postService.getPosts();
    this.subscription = this.postSubject
      .subscribe(res => {
        this.posts = res;
      })

    this.http
      .get('https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map((response: any) => {
          console.log(response);
          const users: User[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              users.push({ ...response[key], id: key });
            }
          }
          return users;
        })
      )
      .subscribe((response: User[]) => {
        console.log(response);
        this.users = response;
      });

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

  logout(){
    this.auth.logout();
  }

  goToProfile(){
  this.router.navigate(['/profile'], {state: {data: this.currentUser}})
  }

}
