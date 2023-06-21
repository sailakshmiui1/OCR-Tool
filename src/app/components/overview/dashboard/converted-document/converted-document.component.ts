import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-converted-document',
  templateUrl: './converted-document.component.html',
  styleUrls: ['./converted-document.component.scss']
})

export class ConvertedDocumentComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pipe: DatePipe;
  displayedColumns: string[] = ['position', 'name', 'filename', 'filetype', 'status', 'size', 'time', 'createddate'];
  dataSource: MatTableDataSource<Convertedlist>;
  service: any;
  searchText;
  constructor(private _liveAnnouncer: LiveAnnouncer) { 
   
  }
  get fromDate() { return this.range.get('start').value; }
get toDate() { return this.range.get('end').value; }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),

  });
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  listSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  btnSearch()
  {
    
    debugger;
    if(this.searchText!=null && this.fromDate==null && this.toDate==null)
    {
      debugger;
    this.searchText = this.searchText.toLocaleLowerCase();
    
    this.dataSource.filter =  (this.searchText);
    }
    if(this.fromDate!=null && this.toDate!=null)
    {
      this.dataSource.filterPredicate = (data, filter) =>{
        var createddate=new Date(data.createddate );
        if (this.fromDate && this.toDate) {
          return createddate >= this.fromDate && createddate <= this.toDate;
        }
        return true;
      }
  
    
  if(this.searchText!=null)
  {
    this.dataSource.filter = ''+Math.random() && this.searchText;
  }
  else{
    this.dataSource.filter = ''+Math.random();
  }
}
  }
}


export interface Convertedlist {
  name: string;
  position: number;
  filename: string;
  filetype: string;
  status: string;
  size: string;
  time: string;
  createddate: string;
}
const ELEMENT_DATA: Convertedlist[] = [
  { position: 1, name: 'yogita', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/01' },
  { position: 2, name: 'umesh', filename: 'test1', filetype: 'jpg', status: 'pass', size: '100kb', time: '9.10', createddate: '2023/05/02' },
  { position: 3, name: 'riyansh', filename: 'test2', filetype: 'jpg', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/02' },
  { position: 4, name: 'yogesh', filename: 'test3', filetype: 'jpg', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/07' },
  { position: 5, name: 'asmita', filename: 'test4', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/08' },
  { position: 6, name: 'vijaya', filename: 'test4', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/01' },
  { position: 7, name: 'anugraha', filename: 'test2', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/12' },
  { position: 8, name: 'hrudisha', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/12' },
  { position: 9, name: 'tridha', filename: 'test5', filetype: 'jpeg', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/23' },
  { position: 10, name: 'mayuri', filename: 'test5', filetype: 'jpeg', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/31' },
  { position: 11, name: 'reeva', filename: 'test5', filetype: 'jpeg', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/26' },
  { position: 12, name: 'hemant', filename: 'test6', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/06/01' },
  { position: 13, name: 'reyu', filename: 'test7', filetype: 'jpeg', status: 'Pass', size: '100kb', time: '9.10', createddate: '2023/05/03' },
];

