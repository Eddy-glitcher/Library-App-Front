import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import { FormValidatorService } from '../../shared/services/form-validator.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { AuthResponse } from '../../shared/interfaces/auth-response';
import { ApiErrorResponse } from '../../shared/interfaces/api-error-response';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ LogoComponent, ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  private _renderer   = inject(Renderer2);
  private _elementRef = inject(ElementRef);
  private _authSvc    = inject(AuthService);
  private _showPassword!: boolean;

  private _formBuilder      = inject(FormBuilder);
  private _formValidatorSvc = inject(FormValidatorService);

  registerForm: FormGroup = this._formBuilder.group({
    name     : ['example', Validators.required],
    email    : ['example@gmail.com', [Validators.required, Validators.pattern(this._formValidatorSvc.validEmail)]],
    password : ['12345678', [Validators.required, Validators.minLength(8)]],
    confirm_password : ['12345678', Validators.required]
  },{
    validators : this._formValidatorSvc.formEqualPasswordsValidator('password', 'confirm_password')
  });

  showPassword(id : string, event : any): void{
    event.preventDefault();

    this._showPassword = !this._showPassword;
    const element = this._elementRef.nativeElement.querySelector(`#${id}`);
    this._showPassword ? this._renderer.setProperty(element, 'type', 'text') : this._renderer.setProperty(element, 'type', 'password');
  }

  formValidator(control : string): boolean | ValidationErrors | null {
    return this.registerForm.controls[control]?.touched && this.registerForm.controls[control].invalid;
  }

  formFieldValidator(control : string): string | void{
    const controlErrors = this.registerForm.get(control)?.errors;

    if(controlErrors?.['required']) return 'Este campo es requerido';

    if (controlErrors?.['minlength']) return `Este debe tener almenos ${controlErrors?.['minlength'].requiredLength} caracteres`;

    if (controlErrors?.['pattern']) return `Formato de correo inválido`;

    if (controlErrors?.['passwordIncorrect']) return `Las contraseñas deben cohinsidir`;
  }

  showPasswordIcon(control : string) : boolean{
    return this.registerForm.get(control)?.value.length !== 0;
  }

  registerUser(){
    this.registerForm.markAllAsTouched();

    const { name, email, password} = this.registerForm.value;

    this._authSvc.register(name, email, password).subscribe({
      next : (resp : AuthResponse)=>{
        // Redirect to...
        console.log("Redirect..: ", resp);
      },
      error : (error : ApiErrorResponse)=>{

        console.log("Error::", error);
        //Show screen error...
      }
    })

  }
}
