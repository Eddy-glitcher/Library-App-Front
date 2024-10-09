import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ApiErrorResponse } from '../../shared/interfaces/api-error-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ LogoComponent, ReactiveFormsModule, CommonModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _renderer   = inject(Renderer2);
  private readonly _elementRef = inject(ElementRef);
  private readonly _formBuilder  = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authSvc = inject(AuthService);

  private _showPassword!: boolean;

  loginForm : FormGroup = this._formBuilder.group({
    email : ['', Validators.required],
    password : ['', Validators.required]
  });

  setFormError(control : string): void{
    this.loginForm.get(control)?.setErrors({
      authError : true
    })
  }

  hideFormErrors(control : string){
    const controlErrors = this.loginForm.get(control)?.errors;
    if(controlErrors && controlErrors!['authError']){
      this.loginForm.get(control)!.setErrors(null);
    }
  }

  login() : void{

    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value;
      this._authSvc.logIn(email, password).subscribe({
        next: (resp: any)=>{
          // this._router.navigateByUrl('/redirect....');
        },
        error: (error : ApiErrorResponse)=>{
          this.setFormError('password');
          this.setFormError('email');
        },
      });
    }

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

    if(controlErrors?.['required']) return 'contraseña y correo requeridos';

    if (controlErrors?.['authError']) return `correo o contraseña incorrecta`;
  }

  showPasswordIcon(control : string) : boolean{
    return this.loginForm.get(control)?.value.length !== 0;
  }

}
