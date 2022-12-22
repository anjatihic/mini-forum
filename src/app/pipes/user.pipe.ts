import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../models/user.model";
import {Post} from "../models/post.model";

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(users: User[], arg: any): unknown {

    return users[arg].username;
  }

}
