import {Component, OnChanges, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {Post} from "../models/post.model";
import {BehaviorSubject, map, Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {PostService} from "../forum-page/post.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser!: User;
  usersPosts: Post[] = []
  posts: Post[] = [];
  postSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  subscription: Subscription | null = null;
  users: User[] = [];

  constructor(private auth: AuthService, private postService: PostService, private http: HttpClient) {
  }

  ngOnInit() {

    this.currentUser = this.auth.fetchUser;
    console.log('trenutni user ' + this.currentUser.username)


    this.postSubject = this.postService.getPosts();

    this.subscription = this.postSubject.subscribe((res) => {
      this.posts = res;
    });

    this.http
      .get('https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map((response: any) => {
          const users: User[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              users.push({ ...response[key], id: key });
            }
          }
          console.log('useri je');
          console.log(users);
          return users;
        })
      )
      .subscribe((response: User[]) => {
        console.log(response);
        this.users = response;
      });





    console.log('svi useri')
    console.log(this.users)
    let currentId = this.users.map(user => user.username).indexOf(this.currentUser.username)
    console.log('moj id je' + currentId)
    this.usersPosts = this.posts.filter((post) => post.userId == currentId);
    console.log('ovo su moji postovi' + this.usersPosts)
    console.log(this.usersPosts)



  }


}
