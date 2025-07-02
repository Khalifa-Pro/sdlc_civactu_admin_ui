import { Routes } from "@angular/router";
import { Authlayout } from "./_components/authlayout/authlayout";
import { AvisComponent } from "./_components/avis-component/avis-component";
import { Dashboard } from "./_components/dashboard/dashboard";
import { LoginComponent } from "./_components/login-component/login-component";
import { Mainlayout } from "./_components/mainlayout/mainlayout";
import { RegisterComponent } from "./_components/register-component/register-component";
import { Statistique } from "./_components/statistique/statistique";
import { Utilisateur } from "./_components/utilisateur/utilisateur";

export const routes: Routes = [
  {
    path: '',
    component: Authlayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: '',
    component: Mainlayout,
    children: [
      { path: 'dashboard', redirectTo: 'utilisateurs', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'avis', component: AvisComponent },
      { path: 'utilisateurs', component: Utilisateur },
      { path: 'statistiques', component: Statistique }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
