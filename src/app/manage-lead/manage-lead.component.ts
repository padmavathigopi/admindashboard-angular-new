import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { admindata } from '../models/reports-table';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {CommonServicesService } from 'src/app/common-services.service';

@Component({
  selector: 'app-manage-lead',
  templateUrl: './manage-lead.component.html',
  styleUrls: ['./manage-lead.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
/**
 * @title Table with expandable rows
 */

export class ManageLeadComponent implements  OnInit{
  dataSource = new MatTableDataSource<admindata>();
    displayedColumns : string[] = ['select','name', 'course', 'status'];

    expandedElement !: admindata | null;
    selection = new SelectionModel<admindata>(true, []);
    selectAll = false;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
//selection checkbox end
toggleSelectAll() {
  this.selectAll = !this.selectAll;
 this.dataSource.data.forEach(row => this.selection.select(row));}

 openAddmodel(action:String){
  const dialogRef = this.dialog.open(DialogBoxComponent, {
    width: '500px',
    data: { action }
  });
  dialogRef.afterClosed().subscribe(data => {
    this.getAdmin();
  });
 }
    constructor(private commonServicesService:CommonServicesService,public dialog:MatDialog){}

  ngOnInit():void {
    this.getAdmin();
   
  }
  getAdmin() {
    this.commonServicesService.getAdmin().subscribe((response: admindata[]) => {
      this.dataSource.data = response;
    });
  }
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }










  deleteAdmin(id: number) {
    // Call the API to delete the row with the specified ID
    this.commonServicesService.delete(id).subscribe(
      data => {
        console.log(data);
        this.getAdmin();
      },
      error => {
        console.log(error);
      }
    );
  }
  
 

  openUpdateModal(id: number, data: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: { id, data }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getAdmin();
    });

      
 
  
  }
  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  
}
