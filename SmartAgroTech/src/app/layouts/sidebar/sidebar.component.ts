import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonModule, AvatarModule, RippleModule, TooltipModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
logout() {
throw new Error('Method not implemented.');
}
  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  menuItems = [
    { icon: 'pi pi-home', label: 'Tableau de bord', route: '/dashboard' },
    { icon: 'pi pi-map', label: 'Mes champs', route: '/fields' },
    { icon: 'pi pi-upload', label: 'Importer shapefile', route: '/import' },
    { icon: 'pi pi-chart-bar', label: 'Analytique', route: '/analytics' },
    { icon: 'pi pi-users', label: 'Collaborateurs', route: '/team' },
    { icon: 'pi pi-cog', label: 'Paramètres', route: '/settings' },
  ];
}
