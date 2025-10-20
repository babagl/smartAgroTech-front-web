import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeNgModule } from "./prime-ng.module";

@NgModule({
  exports:[
     CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class SharedModule {}
