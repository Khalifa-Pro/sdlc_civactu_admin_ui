import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './_layouts/navbar/navbar';
import { Footer } from './_layouts/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    Navbar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  protected title = 'civactu-admin-app';
  search: string = '';
avis = [
    { id: 1, titre: "Avis sur les routes", contenu: "Les routes sont en mauvais état.", likes: 5, commentaires: 2 },
    { id: 2, titre: "Éclairage public", contenu: "Il manque des lampadaires.", likes: 3, commentaires: 1 },
    { id: 3, titre: "Eau potable", contenu: "L'eau n’est pas disponible dans toutes les zones.", likes: 7, commentaires: 4 }
  ];
  filteredAvis = [...this.avis];

  totalLikes = 0;
  totalCommentaires = 0;

  constructor() {
    this.updateStats();
  }

  filterAvis() {
    const q = this.search.toLowerCase();
    this.filteredAvis = this.avis.filter(a =>
      a.titre.toLowerCase().includes(q) || a.contenu.toLowerCase().includes(q)
    );
    this.updateStats();
  }

  updateStats() {
    this.totalLikes = this.filteredAvis.reduce((sum, a) => sum + a.likes, 0);
    this.totalCommentaires = this.filteredAvis.reduce((sum, a) => sum + a.commentaires, 0);
  }

  likeAvis(avis: any) {
    avis.likes++;
    this.updateStats();
  }

  commentAvis(avis: any) {
    avis.commentaires++;
    this.updateStats();
  }

  modifierAvis(avis: any) {
    alert("Modifier avis ID: " + avis.id);
  }

  supprimerAvis(avis: any) {
    this.avis = this.avis.filter(a => a.id !== avis.id);
    this.filterAvis();
  }
}
