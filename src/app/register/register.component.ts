import {Component, OnInit} from '@angular/core';
import {UserService} from "../profile/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private userService: UserService) {
  }

  inputForm!: FormGroup;

  ngOnInit() {
    this.inputForm = new FormGroup({
      inputUsername: new FormControl(null, [Validators.required]),
      inputPassword: new FormControl(null, [Validators.required]),
      inputEmail: new FormControl(null, [Validators.required]),
      inputName: new FormControl(null, [Validators.required]),
      inputPassword2: new FormControl(null, [Validators.required]),
    });
  }

  register(){
    console.log('Pokušavam se registrirati: ' + this.inputForm.value.inputUsername);

    this.userService.register(this.inputForm.value.inputUsername, this.inputForm.value.inputPassword, this.inputForm.value.inputEmail, this.inputForm.value.inputName);
  }

}
