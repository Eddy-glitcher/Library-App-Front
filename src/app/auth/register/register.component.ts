import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ LogoComponent, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  private _renderer = inject(Renderer2);
  private _elementRef = inject(ElementRef);
  private _showPassword!: boolean;

  private _formBuilder = inject(FormBuilder);

  registerForm = this._formBuilder.group({
    name     : ['', Validators.required],
    email    : ['', Validators.required],
    password : ['', [Validators.required, Validators.minLength(8)]],
    confirm_password : ['', Validators.required]
  });

  showPassword(id : string): void{
    this._showPassword = !this._showPassword;
    const element = this._elementRef.nativeElement.querySelector(`#${id}`);
    this._showPassword ? this._renderer.setProperty(element, 'type', 'text') : this._renderer.setProperty(element, 'type', 'password');
  }

}
