import { Component, OnInit, Input, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BroadcastObjectService } from '../../shared/broadcast-object.service'


@Component({
  selector: './login-dialog',
  templateUrl: './login-dialog.component.html',
})

export class LoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private broadcastObjectService: BroadcastObjectService) {

    console.log(data)
    
  }

  onNoClick(): void {
    this.dialogRef.close();    
  }

  login(){
    this.broadcastObjectService.broadcastAction('open')
    this.dialogRef.close();
  }

}