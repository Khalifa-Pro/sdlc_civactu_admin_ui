import { Component } from '@angular/core';
import { Sidebar } from '../../_layouts/sidebar/sidebar';
import { Navbar } from '../../_layouts/navbar/navbar';
import { Footer } from '../../_layouts/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mainlayout',
  imports: [
    Sidebar,
    Navbar,
    Footer,
    RouterOutlet
  ],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.css'
})
export class Mainlayout {

}
