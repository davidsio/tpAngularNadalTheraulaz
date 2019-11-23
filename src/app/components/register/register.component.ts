import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  Roles: any = ['Admin', 'Utilisateur'];

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      nom: new FormControl(
        '',
        [Validators.required]
      ),
      prenom: new FormControl(
        '',
        [Validators.required]
      ),
      ndc: new FormControl(
        '',
        [Validators.required]
      ),
      email: new FormControl(
        '',
        [Validators.required, Validators.pattern(EMAIL_REGEX)]
      ),
      role: new FormControl(
        '',
        [Validators.required]
      ),
      passe: ['', [Validators.required]],
      passeConfirm: ['', [Validators.required]]
    }, {validator: passwordMatchValidator});
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  get passe() {
    return this.registerForm.get('passe');
  }

  get passeConfirm() {
    return this.registerForm.get('passeConfirm');
  }

  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch')) {
      this.passe.setErrors([{passwordMismatch: true}]);
    } else {
      this.passe.setErrors(null);
      this.passeConfirm.setErrors(null);
    }
  }
  register(value: any) {
    let account = JSON.parse(localStorage.getItem('account'));

    if (account === null) {
      account = {};
    }

    if (account[this.registerForm.value.ndc] !== undefined) {
      alert('Le nom de compte : ' + this.registerForm.value.ndc + ' existe déjà.');
    } else {
      account[this.registerForm.value.ndc] = this.registerForm.value;
      localStorage.setItem('account', JSON.stringify(account));
      localStorage.setItem('inscrit', 'true');
      location.href = '/index.html';
    }

  }
}

export const passwordMatchValidator: ValidatorFn = (registerForm: FormGroup): ValidationErrors | null => {
  if (registerForm.get('passe').value === registerForm.get('passeConfirm').value) {
    return null;
  } else {
    registerForm.get('passeConfirm').setErrors([{passwordMismatch: true}]);
    return {passwordMismatch: true};
  }
}
