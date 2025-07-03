import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  
  isLoading = false;

  @Input() data!: { mode: 'create' | 'edit' | 'view'; userId?: string };
  @Input() closeFn?: (result?: any) => void;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [''],
    lastName: [''],
    password: [''],
    role: ['CITIZEN' as User['role']],
    status: ['ACTIVE' as User['status']],
  });

  ngOnInit(): void {
    if (this.data) {
      console.log('ngOnInit data:', this.data);
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      console.log('ngOnChanges data:', this.data);
      this.initForm();
    }
  }

  private initForm(): void {
    console.log('initForm called with data:', this.data);

    if (this.data.mode === 'view' || this.data.mode === 'edit') {
      if (this.data.userId) {
        this.isLoading = true;
        this.userService.getById(this.data.userId).subscribe({
          next: (response) => {
            console.log('user fetched:', response);
            
            this.isLoading = false;

            // Utiliser response.data et non response directement
            const user = response.data;

            this.form.patchValue({
              email: user.email ?? '',
              firstName: user.firstName ?? '',
              lastName: user.lastName ?? '',
              role: user.role ?? 'CITIZEN',
              status: user.status ?? 'ACTIVE',
            });

            if (this.data.mode === 'view') {
              this.form.disable({ emitEvent: false });
            } else {
              this.form.enable({ emitEvent: false });
            }

            if (this.data.mode === 'edit') {
              // Password facultatif en modification, mais si renseigné, doit être valide
              this.form.get('password')?.setValidators([
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
              ]);
            } else {
              this.form.get('password')?.clearValidators();
            }
          },
          error: () => {
            this.isLoading = false;
        
            alert('Erreur lors du chargement des données utilisateur');
            if (this.data.mode === 'view') {
              this.form.disable({ emitEvent: false });
            } else {
              this.form.enable({ emitEvent: false });
            }
          }
        });
      }
    } else if (this.data.mode === 'create') {
      this.form.reset({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: 'CITIZEN',
        status: 'ACTIVE',
      }, { emitEvent: false });

      this.form.get('password')?.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]);
      
      this.form.enable({ emitEvent: false });
    }

    this.form.get('password')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { status, password, ...rest } = this.form.value;

    const userPayload: Partial<User> = {
      ...rest,
      role: this.form.value.role as User['role'],
    };

    if (this.data.mode === 'create' || (this.data.mode === 'edit' && password)) {
      (userPayload as any).password = password;
    }

    const operation =
      this.data.mode === 'edit' && this.data.userId
        ? this.userService.update(this.data.userId, userPayload)
        : this.userService.create(userPayload);

    this.isLoading = true;

    operation.subscribe({
      next: () => {
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: this.data.mode === 'create' ? 'Utilisateur créé' : 'Utilisateur modifié',
          showConfirmButton: false,
          timer: 1500
        });

        this.closeFn?.('saved');
      },
      error: (err) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err?.message || 'Une erreur est survenue lors de la sauvegarde.',
        });
      }
    });
  }


  onCancel(): void {
    this.closeFn?.();
  }
}
