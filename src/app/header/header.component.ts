import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../body/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.userService.selectedUser = new User()
    this.router.navigate(['/']);

  }

  onIndex(){
    this.router.navigate(['/']);
  }

}
