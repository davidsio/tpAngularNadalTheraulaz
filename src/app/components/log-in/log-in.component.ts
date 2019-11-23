import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../register/register.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000000000,
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      ndc: new FormControl(
        '',
        [Validators.required]
      ),
      passe: new FormControl(
        '',
        [Validators.required]),
    });
    if (localStorage.getItem('inscrit') !== null) {
    this.openSnackBar('Inscription réalisée', 'Fermer');
    localStorage.removeItem('inscrit');
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login(value: any) {
    let account = JSON.parse(localStorage.getItem('account'));
    if (account === null || account[this.loginForm.value.ndc] === undefined) {
      alert('Identification incorrecte, vérifiez vos identifiants.');
    } else {
      if (this.loginForm.value.ndc === account[this.loginForm.value.ndc].ndc && this.loginForm.value.passe === account[this.loginForm.value.ndc].passe) {
        localStorage.setItem('connected', JSON.stringify(account[this.loginForm.value.ndc]));
        location.href = '/account';
      } else {
       alert('Identification incorrecte, vérifiez vos identifiants.');
      }
    }
    // console.log(this.loginForm.value.ndc);
  }
}
