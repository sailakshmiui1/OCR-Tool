import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import {MatDialog} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-converted-doc-preview',
  templateUrl: './converted-doc-preview.component.html',
  styleUrls: ['./converted-doc-preview.component.scss']
})
export class ConvertedDocPreviewComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  public data: object[] = [];

  public Editor = ClassicEditorBuild;
  // public ckmodel = {
  //   ckdata:any;
  // }
  ckdata: any;
  ngOnInit(): void {
    this.ckdata = `<table width='100%' border='1' id='excel-table'><tr><th>Name</th><th>Age</th><th>Country</th></tr>
    <tr>
      <td>Harry Depp</td>
      <td>28</td>
      <td>Britain</td>
    </tr>
    <tr>
      <td>John Smith</td>
      <td>35</td>
      <td>USA</td>
    </tr>
    <tr>
      <td>Ram Krishna</td>
      <td>19</td>
      <td>Nepal</td>
    </tr>
  </table>`;

    // this.ckdata =
    //   `<h1>Lorem ipsum dolor sit amet</h1>
    //   <p>consectetur adipiscing elit. Cras quis porta orci. Donec sollicitudin mauris vestibulum,</p>
    //   <p> porttitor urna vitae, ornare nibh. Mauris vehicula mollis lectus ac gravida. Mauris non aliquet nunc, ut ultrices ligula.</p>
    //   <p> Curabitur tempor sit amet odio non congue. Nam imperdiet euismod quam, sit amet rhoncus sem. Sed fermentum dui et laoreet</p>
    //   <p> vestibulum. Mauris mollis lectus rhoncus pulvinar tempor. Aliquam dapibus, nibh a finibus bibendum, massa quam rhoncus lectus, ut feugiat odio mauris at augue. Proin commodo massa et quam porta, a mattis lorem molestie. Donec eget posuere nunc. Suspendisse at vulputate mauris. Aliquam faucibus rutrum quam non hendrerit.</p>
    //   <p>Pellentesque ut nulla semper, molestie odio eget, viverra dolor. In sagittis feugiat ex, sed suscipit tellus euismod a.</p>`;
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef,  {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
  }
  fileName= 'Ocr_Sheet.xlsx';

  // closeDialog(){
  //   this.dialog.close()
  // }
  exportexcel(): void
    {
       /* table id is passed over here */
       let element = document.getElementsByTagName('table')[0];
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);


    }
}
