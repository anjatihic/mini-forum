import {Component, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../../models/post.model";
import {User} from "../../models/user.model";
import {AuthService} from "../../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{

  newPost: Post = new Post()
  users: User[] = [];

  currentUser!: User;

  constructor(private postService: PostService, private auth: AuthService, private http: HttpClient) {
  }

  addPost(){

    this.newPost.userId = this.users.map(user => user.username).indexOf(this.currentUser.username);

    console.log(this.newPost)
    this.postService.addPost(this.newPost);
  }

  ngOnInit() {
    this.currentUser = this.auth.fetchUser;

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
}

