import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/body/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  boolAlert = false;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    //forms
    this.signupForm = new FormGroup({
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'pass': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }  

  onLogin(user:User){
    this.userService.connectUser(user).subscribe((res)=>{
      if(res.toString() === "notfind"){
        this.boolAlert = true;
      }else {
      this.userService.getUser(res.toString()).subscribe((user:User)=> {
        this.userService.selectedUser = user
        this.boolAlert = false;
        this.router.navigate(['/']);
      })
    }
    })
  
  }

  onSubmit() {
    this.onLogin(this.signupForm.value)
  }

}
