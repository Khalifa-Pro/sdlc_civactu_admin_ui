import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { UserFormComponent } from './user-form.component';

import Swal from 'sweetalert2';

declare var bootstrap: any; // pour Bootstrap JS

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [CommonModule],
})
export class UserListComponent implements OnInit, AfterViewInit {
  private userService = inject(UserService);

  users: User[] = [];
  isLoading = false;

  // Flag contrôle la présence/modal
  isModalVisible = false;

  @ViewChild('modalContainer', { read: ElementRef }) modalElementRef?: ElementRef;
  @ViewChild('modalContent', { read: ViewContainerRef }) modalContentRef?: ViewContainerRef;

  private modalInstance?: any;
  private modalComponentRef?: ComponentRef<UserFormComponent>;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    if (this.modalElementRef) {
      this.modalInstance = new bootstrap.Modal(this.modalElementRef.nativeElement);
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Erreur: impossible de charger les utilisateurs');
      },
    });
  }

  async openUserForm(userId?: string, mode: 'create' | 'edit' | 'view' = 'create'): Promise<void> {
    this.isModalVisible = true;

    setTimeout(() => {
      if (!this.modalContentRef || !this.modalElementRef) {
        console.error('modalContentRef ou modalElementRef non défini');
        return;
      }

      if (!this.modalInstance) {
        this.modalInstance = new bootstrap.Modal(this.modalElementRef.nativeElement);
      }

      if (this.modalComponentRef) {
        this.modalComponentRef.destroy();
      }

      this.modalComponentRef = this.modalContentRef.createComponent(UserFormComponent);

      this.modalComponentRef.instance.data = { userId, mode };

      this.modalComponentRef.instance.closeFn = (result?: any) => {
        this.modalInstance!.hide();
        this.isModalVisible = false;
        if (result === 'saved') {
          this.loadUsers();
        }
      };

      this.modalInstance!.show();
    });
  }

  onDelete(id: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe({
          next: () => {
            Swal.fire('Supprimé !', 'Utilisateur supprimé avec succès.', 'success');
            this.loadUsers();
          },
          error: () => {
            Swal.fire('Erreur', 'Erreur lors de la suppression.', 'error');
          }
        });
      }
    });
  }
}
