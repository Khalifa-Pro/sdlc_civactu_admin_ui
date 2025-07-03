import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list.component';
import { UserFormComponent } from './components/user-form.component';

export const usersRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'create', component: UserFormComponent },
  { path: ':id/edit', component: UserFormComponent }
];
