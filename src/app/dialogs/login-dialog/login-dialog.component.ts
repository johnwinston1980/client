import { Component, OnInit, Input, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: './login-dialog',
  templateUrl: './login-dialog.component.html',
})
export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
     }

  onNoClick(): void {
    this.dialogRef.close();    
  }

}