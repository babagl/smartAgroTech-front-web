import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { filter } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeService } from '../../services/theme.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
    imports: [RouterOutlet, SidebarComponent, ToolbarModule, ButtonModule, AvatarModule, RippleModule ,SharedModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
    darkMode = false;
  pageTitle = 'Tableau de bord';
  theme = inject(ThemeService);

  constructor(private router: Router) {
    // Change automatiquement le titre selon la route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        if (url.includes('fields')) this.pageTitle = 'Mes Champs';
        else if (url.includes('import')) this.pageTitle = 'Importer un Shapefile';
        else if (url.includes('dashboard')) this.pageTitle = 'Tableau de Bord';
        else this.pageTitle = 'SmartAgroTech';
      });
  }


  toggleDarkMode() {
    this.theme.toggleDarkMode();
  }

}
