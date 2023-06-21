import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-deleted-document',
  templateUrl: './deleted-document.component.html',
  styleUrls: ['./deleted-document.component.scss']
})
export class DeletedDocumentComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['position', 'name', 'filename', 'filetype', 'status', 'size', 'time', 'date'];
  dataSource: MatTableDataSource<Convertedlist>;
  service: any;
  constructor(private _liveAnnouncer: LiveAnnouncer) { }
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
}

export interface Convertedlist {
  name: string;
  position: number;
  filename: string;
  filetype: string;
  status: string;
  size: string;
  time: string;
  date: string;
}
const ELEMENT_DATA: Convertedlist[] = [
  { position: 1, name: 'yogita', filename: 'test1', filetype: 'png', status: 'Failed', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 2, name: 'umesh', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 3, name: 'riyansh', filename: 'test1', filetype: 'png', status: 'Failed', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 4, name: 'yogesh', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 5, name: 'asmita', filename: 'test1', filetype: 'png', status: 'Failed', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 6, name: 'vijaya', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 7, name: 'anugraha', filename: 'test1', filetype: 'png', status: 'Failed', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 8, name: 'hrudisha', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 9, name: 'tridha', filename: 'test1', filetype: 'png', status: 'Failed', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 10, name: 'mayuri', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 11, name: 'reeva', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 12, name: 'hemant', filename: 'test1', filetype: 'png', status: 'Pass', size: '100kb', time: '9.10', date: '31/05/2023' },
  { position: 13, name: 'reyu', filename: 'test1', filetype: 'png', status: 'Failed', size: '100kb', time: '9.10', date: '31/05/2023' },
];


