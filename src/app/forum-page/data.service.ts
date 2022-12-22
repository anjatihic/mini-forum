import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  getPosts(){
    return this.http.get("https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
      .pipe(map((res:any) => {
        const posts = [];
        for(let key in res){
          posts.push({...res[key], id: key});
        }
        return posts;
      }))
  }

  addPost(post: Post){
    return this.http.post("https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/posts.json", post);
  }

  deletePost(id: string){
    return this.http.delete(`https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`);
  }

  editPost(post: Post){
    return this.http.patch(`https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}/.json`, post);
  }

  getUsers(){
    return this.http.get('https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(
        map((res:any) => {
          const users = [];
          for(let key in res){
            users.push({...res[key], id: key});
          }
          return users;
        })
      )
  }

}
