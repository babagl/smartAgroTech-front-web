import { NgModule } from "@angular/core";
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
   exports: [
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    FileUploadModule,
    DialogModule,
    ToastModule,
    TooltipModule,
    ProgressSpinnerModule,
    MenuModule,
    RippleModule,
    AvatarModule

  ]
})
export class PrimeNgModule {}
