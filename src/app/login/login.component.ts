import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private auth: AuthService) {
  }

  inputForm!: FormGroup;
  errorMessage!: string;

  ngOnInit() {
    this.inputForm = new FormGroup({
      inputUsername: new FormControl(null, [Validators.required]),
      inputPassword: new FormControl(null, [Validators.required])
    });

    this.auth.error.subscribe(msg => this.errorMessage = msg);
  }

  login(){
    this.auth.login(this.inputForm.value.inputUsername.toString(), this.inputForm.value.inputPassword.toString());
  }

}
