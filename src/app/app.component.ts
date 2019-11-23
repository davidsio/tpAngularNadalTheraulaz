import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tpAngular';
  role = '';
  nom = '';
  prenom = '';
  ndc = '';
  email = '';



  checkStorage() {
    if (localStorage.getItem('connected') === null) {
      return false;
    } else {
      this.role = JSON.parse(localStorage.getItem('connected')).role;
      this.nom = JSON.parse(localStorage.getItem('connected')).nom;
      this.prenom = JSON.parse(localStorage.getItem('connected')).prenom;
      this.ndc = JSON.parse(localStorage.getItem('connected')).ndc;
      this.email = JSON.parse(localStorage.getItem('connected')).email;
      return true;
    }
  }

  disconnect() {
    localStorage.removeItem('connected');
    location.href = '/index.html';
  }
}
