import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './_layouts/navbar/navbar';
import { Sidebar } from './_layouts/sidebar/sidebar';
import { Footer } from './_layouts/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  protected title = 'civactu-admin-app';

}
