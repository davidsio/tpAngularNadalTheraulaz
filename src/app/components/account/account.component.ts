import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  role = JSON.parse(localStorage.getItem('connected')).role;
  nom = JSON.parse(localStorage.getItem('connected')).nom;
  prenom = JSON.parse(localStorage.getItem('connected')).prenom;
  ndc = JSON.parse(localStorage.getItem('connected')).ndc;
  email = JSON.parse(localStorage.getItem('connected')).email;

  constructor() { }

  ngOnInit() {
  }

  checkStorage() {
    if (localStorage.getItem('connected') === null) {
      location.href = '/login';
    } else {
      return true;
    }
  }

}
