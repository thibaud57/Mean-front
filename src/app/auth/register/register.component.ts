import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from 'src/app/body/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    //forms
    this.signupForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'pass': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

  }  

  onRegister(user:User){
    this.userService.postUser(user).subscribe((res)=>{
      this.userService.selectedUser = new User()
      console.log(res)
      this.router.navigate(['/login']);    
    })
  }

  onSubmit() {
    this.onRegister(this.signupForm.value)
  }
  
}
