import { Component, OnInit ,AfterViewInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSort,Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatRadioChange } from '@angular/material/radio';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export  class UserListComponent implements OnInit {
  Active:boolean = true;

  Inactive:boolean = false;
    @ViewChild('paginator') paginator:MatPaginator;
   @ViewChild(MatSort) sort:MatSort;
  displayedColumns: string[] = ['userid', 'username', 'emailid','status','action'];
  dataSource:MatTableDataSource<UserList>;  
  service: any;
  selection = new SelectionModel<UserList>(false, []);
  selectedItem = <UserList>{};
  constructor(private _liveAnnouncer:LiveAnnouncer) { }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    
  });
  ngAfterViewInit(){
    this.dataSource=new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }
  listSortChange(sortState:Sort)
  {
    if(sortState.direction)
    {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      
    }
  }
  ngOnInit() {

   this.dataSource=new MatTableDataSource(ELEMENT_DATA);
   this.dataSource.paginator=this.paginator;
}
selectItem(row: UserList) {
  this.selection.toggle(row);
  this.selectedItem = row;
}

 onactiveclick()
{
  alert("called");
  this.Active=false;
  this.Inactive=true;
}
oninactiveclick()
{
  this.Active=true;
  this.Inactive=false;
}

}
export interface UserList {
  userid: number;
  username: string;
  emailid: string;
  status:string;
  action:string;
 
}
const ELEMENT_DATA: UserList[] = [
  {userid: 1, username: 'yogita', emailid: 'test1@gmail.com', status:'Active',action:'true' },
  {userid: 2, username: 'umesh',  emailid: 'test2@gmail.com', status:'Inactive' ,action:'true'},
  {userid: 3, username: 'riyansh',  emailid: 'test3@gmail.com',status:'Inactive' ,action:'true'},
  {userid: 4, username: 'yogesh',  emailid: 'test4@gmail.com', status:'Inactive' ,action:'true'},
  {userid: 5, username: 'asmita', emailid: 'test5@gmail.com',status:'Inactive' ,action:'true'},
  {userid: 6, username: 'vijaya',  emailid: 'test6@gmail.com',status:'Active' ,action:'true'},
  {userid: 7, username: 'anugraha',  emailid: 'test7@gmail.com',status:'Active' ,action:'true'},
  {userid: 8, username: 'hrudisha', emailid: 'test8@gmail.com',status:'Active' ,action:'true'},
  {userid: 9, username: 'tridha', emailid: 'test9@gmail.com', status:'Inactive' ,action:'true'},
  {userid: 10, username: 'mayuri', emailid: 'test10@gmail.com', status:'Inactive',action:'true' },
  {userid:11, username: 'reeva', emailid: 'test11@gmail.com', status:'Active',action:'true' },
  {userid: 12, username: 'hemant', emailid: 'test12@gmail.com', status:'Active' ,action:'true'},
  {userid: 13, username: 'reyu', emailid: 'test13@gmail.com', status:'Active',action:'true' },
];
