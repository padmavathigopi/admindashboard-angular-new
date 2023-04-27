//dialog-box.component.ts
import { Component, Inject, Optional, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonServicesService } from '../common-services.service';
import { admindata } from '../models/reports-table';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit{

  admind:admindata ={
    name:'',
  course:'',
  status:'',
  marketer_name:'',
  service_type:'',
  joining_date:new Date,
  email:'',
  qualification:'',
  working_sts:'',
  source:'',
  address:'',
  required_services:'',
  color_val:'',
  followup_date:'',
 
  contact_no:'',
  };
local_data:any;
action:string;
  constructor(
    public commonServicesService:CommonServicesService,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.local_data = {...data.data};
  this.action = data.action;}

  ngOnInit() {
    // Initialize the form with the existing data
  }

  updateData(id:number,data:any) {
this.commonServicesService.update(id,data).subscribe();


    // Update the data using the service and close the modal
    this.dialogRef.close();
  }
 addData():void{
const data={
  name:this.admind.name,
  course:this.admind.course,
  status:this.admind.status,
  marketer_name:this.admind.marketer_name,
  service_type:this.admind.service_type,
  joining_date:this.admind.joining_date,
  email:this.admind.email,
  qualification:this.admind.qualification,
  working_sts:this.admind.working_sts,
  source:this.admind.source,
  address:this.admind.address,
  required_services:this.admind.required_services,
  color_val:this.admind.color_val,
  followup_date:this.admind.followup_date,
  
  contact_no:this.admind.contact_no,
};
this.commonServicesService.createAdmin(data).subscribe({
  next:(res)=>{
    res.send(data);
  },
  error:(e)=>console.error(e)
});
 }

}




 
