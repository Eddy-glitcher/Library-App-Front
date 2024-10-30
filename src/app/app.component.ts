import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from "./shared/components/menu-bar/menu-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LibraryApp';

  router = inject(Router);
}
