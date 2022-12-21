import {Component, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../../post.model";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  newPost: Post = new Post()

  constructor(private postService: PostService) {
  }

  addPost(){
    console.log(this.newPost);
    this.postService.addPost(this.newPost);
  }
}

