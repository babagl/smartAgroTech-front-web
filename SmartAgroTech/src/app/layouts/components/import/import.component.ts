import { Component, EventEmitter, inject, Output } from '@angular/core';
import Feature from 'ol/Feature';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-import',
  imports: [SharedModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss'
})
export class ImportComponent {

  @Output() featuresImported = new EventEmitter<Feature[]>();
  visble = false;
  importedCount = 0;
  loading = false;
  messagerieService = inject(MessageService);


  open(){
    this.visble = true;
    this.importedCount = 0;
  }

  close(){
    this.visble = false;
  }

  onFileSelected(event: any) {
  }



}
