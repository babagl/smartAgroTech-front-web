import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from '../../../shared/shared.module';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
    imports: [RouterOutlet, SidebarComponent, ToolbarModule, ButtonModule, AvatarModule, RippleModule, NgClass,SharedModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
    darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
}
