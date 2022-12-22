import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../profile/user.service";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public user! : User;
  users : User[] = [];
  subscription: Subscription = new Subscription();
  error: Subject<string> = new Subject<string>();
  authState: Subject<boolean> = new Subject<boolean>();

  get fetchUser(){
    if(!this.user){
      this.user = JSON.parse(localStorage.getItem('user') as string);
    }
    return {...this.user};
  }

  login(username: string, password: string){
    this.error.next('');
    console.log('Trying to log in: ' + username);

    let user = new User();
    user.username = username;
    user.password = password;

    this.userSubject = this.userService.getUsers();
    this.subscription = this.userSubject.subscribe((res) => {
      this.users = res;
    })

    new Observable((observer) => {
      setTimeout(() => {
        let userNext = this.users.find((u) => {
          if(u.username == username && u.password == password){
            return u;
          }else return null;
        });

        observer.next(userNext);
      }, 1000);
    }).subscribe((user: any) => {
      if(user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.authState.next(true);
        this.router.navigate(['/']);
      }else{
        this.error.next('Wrong credentials!');
      }
    })
  }

  logout(){
    this.user = new User();

    localStorage.removeItem('user');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }
}
