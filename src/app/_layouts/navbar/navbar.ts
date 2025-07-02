import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
