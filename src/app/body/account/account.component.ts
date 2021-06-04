import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(public userService: UserService, private router:Router){}

  ngOnInit(): void {
  
    //forms
    this.signupForm = new FormGroup({
      '_id' : new FormControl(this.userService.selectedUser._id),
      'name' : new FormControl(this.userService.selectedUser.name, Validators.required),
      'mail': new FormControl(this.userService.selectedUser.mail, [Validators.required, Validators.email]),
      'pass': new FormControl(this.userService.selectedUser.pass, [Validators.required, Validators.minLength(6)]),
      'tasks' : new FormControl(this.userService.selectedUser.tasks),
    })

  }  

  onEdit(user:User){
    this.userService.putUser(user).subscribe((res)=>{
      this.userService.selectedUser = user
      console.log(res)
    })
  }

  onDelete(user:User){
    this.userService.deleteUser(user).subscribe((res)=>{
      this.userService.selectedUser = new User()
      console.log(res)
      this.router.navigate(['/']);
    })
  }

  onSubmit() {
    this.onEdit(this.signupForm.value)
  }
  

}
