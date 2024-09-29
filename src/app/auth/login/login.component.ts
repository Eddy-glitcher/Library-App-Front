import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormValidatorService } from '../../shared/services/form-validator.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ LogoComponent, ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _renderer   = inject(Renderer2);
  private _elementRef = inject(ElementRef);
  private _showPassword!: boolean;

  private _formBuilder  = inject(FormBuilder);
  private _formValidatorSvc = inject(FormValidatorService);

  loginForm : FormGroup = this._formBuilder.group({
    email : ['', [Validators.required, Validators.pattern(this._formValidatorSvc.validEmail)]],
    password : ['', Validators.required]
  });

  login(){
    if(this.loginForm.invalid) this.loginForm.markAllAsTouched();
  }

  showPassword(id : string, event : any): void{
    event.preventDefault();

    this._showPassword = !this._showPassword;
    const element = this._elementRef.nativeElement.querySelector(`#${id}`);
    this._showPassword ? this._renderer.setProperty(element, 'type', 'text') : this._renderer.setProperty(element, 'type', 'password');
  }

  formValidator(control : string): boolean | ValidationErrors | null {
    return this.loginForm.controls[control]?.touched && this.loginForm.controls[control].invalid;
  }

  formFieldValidator(control : string): string | void{
    const controlErrors = this.loginForm.get(control)?.errors;

    if(controlErrors?.['required']) return 'Este campo es requerido';

    if (controlErrors?.['pattern']) return `Formato de correo inválido`;
  }

  showPasswordIcon(control : string) : boolean{
    return this.loginForm.get(control)?.value.length !== 0;
  }

}
