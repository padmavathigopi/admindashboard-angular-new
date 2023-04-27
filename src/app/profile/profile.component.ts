import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 @ViewChild('listOne', { read: ElementRef }) listOne: ElementRef | undefined;
@ViewChild('listTwo', { read: ElementRef }) listTwo: ElementRef | undefined;

  listOneItems: any[] = [];
  listTwoItems: any[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.http.get<any>('http://localhost:8082/api/admindbs/').subscribe(data => {
      this.listOneItems = data.filter((item: any) => item.status === 'followup');
      this.listTwoItems = data.filter((item: any) => item.status === 'finalized');
    });  
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
      const item = event.previousContainer.data[event.previousIndex];
      event.previousContainer.data.splice(event.previousIndex, 1);
      event.container.data.splice(event.currentIndex, 0, item);
  
      // Update the status of the item in the backend
      const updatedItem = { ...item, status: event.container.data === this.listTwoItems ? 'followup' : 'finalized' };
      console.log('Updated item:', updatedItem);
      this.http.put(`http://localhost:8082/api/admindbs/${updatedItem.id}`, updatedItem).subscribe(() => {
        this.snackBar.open('Item moved successfully', '', { duration: 2000 });
        console.log('update:', updatedItem);
        this.loadItems(); // Reload the items after the update is successful
        
      }, () => {
        this.snackBar.open('Failed to update item', '', { duration: 2000 });
         // Reload the items if the update failed
      });
    } else {
     
    }
  }
  
  
  
  
  
 
  
  
  
  
  
  
}