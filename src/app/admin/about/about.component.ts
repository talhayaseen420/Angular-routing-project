import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ITooltipParams, RowNode } from 'ag-grid-community';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  rowData = [];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  params: any;

  constructor(private http:HttpClient, private auth: AuthenticationService) { }

  getData(){
    this.auth.getVal().subscribe((res:any)=>{
      this.rowData = res['payload']['data']
      console.log(this.rowData)
    })
}


  columnDefs = [
    {headerName: 'Address', field: 'short_address_details.state', flex: 3,
    minWidth: 150},
    {headerName: 'Title', field: 'title'},
    {headerName: 'Number', field: 'total_views', editable: true},
    {headerName: 'Type', field: 'type', editable: true}
  ];

  ngOnInit() {
    this.getData()
  }
}
