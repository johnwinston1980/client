import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatButtonModule,   
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule,  
  MatCheckboxModule,
  MatGridListModule,
  MatGridTile,
  MatListModule,
  MatNavList,
  MatListItem,  
  MatIconModule,
  MatIcon,
  MatToolbarModule,  
  MatDialogModule,
  MatRadioModule,
  MatSidenavModule } from '@angular/material'

  import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    MatCardModule,   
    MatCheckboxModule, 
    MatGridListModule,
    MatListModule,
    MatIconModule,   
    MatRadioModule, 
    MatDialogModule,    
    MatTabsModule,
    MatSidenavModule],
  exports: [
    MatButtonModule, 
    MatToolbarModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    MatCardModule,   
    MatCheckboxModule, 
    MatGridListModule,
    MatListModule,
    MatIconModule,    
    MatRadioModule, 
    MatTabsModule,   
    MatSidenavModule]  
})

export class MaterialModule { }