import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-component',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    role: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.formData).subscribe({
      next: (res) => {
        console.log('Inscription réussie:', res);
        alert(res.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur d\'inscription:', err);
        alert('Échec de l’inscription.');
      }
    });
  }
}
