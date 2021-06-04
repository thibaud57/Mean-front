import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  signupForm!: FormGroup;
  boolEdit = false;
  taskId = "";

  constructor(public userService: UserService, private router:Router){}

  ngOnInit(): void {
    console.log("onInit");
    console.log("")

  
    //forms
    this.signupForm = new FormGroup({
      '_id' : new FormControl(this.userService.selectedUser._id),
      'tasks' : new FormControl(this.userService.selectedUser.tasks, Validators.required),
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
    })

  }  

  addTask(){
    const newTask = {
      "title":this.signupForm.value.title,
      "content":this.signupForm.value.content,
      "state":this.signupForm.value.state,
    }
    this.userService.postTask(newTask,this.signupForm.value._id ).subscribe((res) =>{
      console.log(res)
      this.userService.getUser(this.signupForm.value._id).subscribe((user)=> {
        this.userService.selectedUser = user
      })
    })
  }

  editTask(_num:String){
    for(let i=0; i < this.userService.selectedUser.tasks.length; i++){
      if(this.userService.selectedUser.tasks[i]._id == _num){
        const newTask = {
          "id":this.userService.selectedUser.tasks[i]._id,
          "title":this.userService.selectedUser.tasks[i].title,
          "content":this.userService.selectedUser.tasks[i].content,
          "state":this.userService.selectedUser.tasks[i].state,
        }
        this.userService.putTask(this.userService.selectedUser._id, _num, newTask).subscribe((res) =>{
          console.log(res)
          this.userService.getUser(this.signupForm.value._id).subscribe((user)=> {
            this.userService.selectedUser = user
            this.boolEdit = false;
          })
        })
      }
    }
  }


  deleteTask(_num:String){
    this.userService.deleteTask(_num, this.userService.selectedUser._id).subscribe((res)=>{
      console.log(res)
      this.userService.getUser(this.signupForm.value._id).subscribe((user)=> {
        this.userService.selectedUser = user
      })
    })

  }

  onAddOne(_num:String){
    for(let i=0; i < this.userService.selectedUser.tasks.length; i++){
      if(this.userService.selectedUser.tasks[i]._id == _num){
        const newTask = {
          "id":this.userService.selectedUser.tasks[i]._id,
          "title":this.userService.selectedUser.tasks[i].title,
          "content":this.userService.selectedUser.tasks[i].content,
          "state":this.userService.selectedUser.tasks[i].state + 1,
        }
        this.userService.putTask(this.userService.selectedUser._id, _num, newTask).subscribe((res) =>{
          console.log(res)
          this.userService.getUser(this.signupForm.value._id).subscribe((user)=> {
            this.userService.selectedUser = user
          })
        })
      }
    }
   }

  onReduceOne(_num:String){
    for(let i=0; i < this.userService.selectedUser.tasks.length; i++){
      if(this.userService.selectedUser.tasks[i]._id == _num){
        const newTask = {
          "id":this.userService.selectedUser.tasks[i]._id,
          "title":this.userService.selectedUser.tasks[i].title,
          "content":this.userService.selectedUser.tasks[i].content,
          "state":this.userService.selectedUser.tasks[i].state -1,
        }
        this.userService.putTask(this.userService.selectedUser._id, _num, newTask).subscribe((res) =>{
          console.log(res)
          this.userService.getUser(this.signupForm.value._id).subscribe((user)=> {
            this.userService.selectedUser = user
          })
        })
      }
    }
   }

}
