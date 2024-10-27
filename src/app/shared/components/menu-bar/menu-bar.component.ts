import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [LogoComponent, CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

  isMenuBarActive : boolean = false;

  @ViewChild('activeTheme') activeTheme!: ElementRef<HTMLElement>;

  themes: any = [
    {
      theme : 'light-theme',
      value : 'Modo Claro'
    },
    {
      theme : 'dark-theme',
      value : 'Modo Oscuro'
    },
  ];

  isThemeSelectorActive : boolean = false;
  selectedTheme : string = this.themes[0].value;

  selectTheme(theme : string){
    this.selectedTheme = theme;
    this.isThemeSelectorActive = false;
  }

  @ViewChild('sidemenu') sidemenu!: ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement : Node): void {
    const clickedInside = this.sidemenu.nativeElement.contains(targetElement);

    if (!clickedInside && this.isMenuBarActive) {
      this.isMenuBarActive = false;
    }
  }

}
