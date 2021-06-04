import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { User } from '../body/user'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[];

  constructor(private http:HttpClient) { 
    this.selectedUser = new User();
    this.users = []
  }

  getUsers(){
    return this.http.get('http://localhost:3000/api/users')
  }

  getUser(_id:string):Observable<User>{
    return this.http.get<User>('http://localhost:3000/api/users/'+_id)
  }

  postUser(user:User){
    return this.http.post('http://localhost:3000/api/users', user)
  }
  
  putUser(user:User){
    return this.http.put('http://localhost:3000/api/users/'+user._id, user)
  }

  deleteUser(user:User){
    return this.http.delete('http://localhost:3000/api/users/'+user._id)
  }

  connectUser(user:User){
    return this.http.post<any[]>('http://localhost:3000/api/users/connect', user)
  }

  postTask(task:Object,_id:String){    
    return this.http.post(`http://localhost:3000/api/users/${_id}/tache`, task)
  }

  deleteTask(_num:String,_id:String){    
    return this.http.delete(`http://localhost:3000/api/users/${_id}/tache/${_num}`)
  }

  putTask(_id:String, _num:String, task:Object){    
    return this.http.put(`http://localhost:3000/api/users/${_id}/tache/${_num}`, task)
  }
}
