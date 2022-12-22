import { Injectable } from '@angular/core';
import {DataService} from "../forum-page/data.service";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private dataService: DataService, private router: Router, private http: HttpClient) {
    this.init();
  }

  users: User[] = [];
  userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  init(){
    this.dataService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      this.userSubject.next([...this.users]);
    })
  }

  getUsers(){
    return this.userSubject;
  }

  getUser(id: string){
    return this.users.find((u) => u.id == id);
  }

  register(username: string, password: string, email: string, name: string){
    let user = new User();

    user.username = username;
    user.email = email;
    user.password = password;
    user.name = name;

    this.users.push(user);
    this.userSubject.next([...this.users]);

    this.http.post('https://mini-forum-b5888-default-rtdb.europe-west1.firebasedatabase.app/users/' + user.id +'/.json', user)
      .subscribe((data: any) => {
        console.log(data);
      })

  }

}
