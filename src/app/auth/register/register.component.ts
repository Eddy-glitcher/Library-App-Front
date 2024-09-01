import { Component } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ LogoComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

}
