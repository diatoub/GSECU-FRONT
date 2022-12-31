import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/authentication/helpers/data.service';
import { TableService } from 'src/app/table/ngtable/ngtable.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit {

  cpage = 1;
  cpageSize = 4;
  totalLengthOfCollection: number=0;
  searchTerm: any;
  page = 1;
  pageSize = 10;
  // clientList = this.tableService.getTable();
  dataListe: any;

  constructor(public tableService: TableService, public dataService: DataService) { }

  ngOnInit(): void {
    this.dataListe = this.dataService.listDonnee;
    console.log(this.dataListe);
    
  }

}
