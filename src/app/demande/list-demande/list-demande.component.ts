import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametreService } from 'src/app/parametres/parametres.service';
import { DemandeService} from '../demande.service';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.scss']
})
export class ListDemandeComponent implements OnInit {

  demandeDetail: any;
  demandeList: any;
  filterForm: FormGroup;
  page = 1;
  itemPerPage = 8;
  totalItem: any;
  successRequetDelete: any;
  successRequeteAdd: any;
  successRequeteEdit: any;
  listDemande: any;
  messageError: any;
  constructor(public demandeService: DemandeService, public fb: FormBuilder, public modalService: NgbModal, public demandeservice: DemandeService ) {
    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL', Validators.required)
    })
    }

  ngOnInit(): void {
    //this.gty(this.page);
    this.functionLesDemandes(this.page);
  }
  gty(page: number) {
    // this.demandeList = this.ListDemandeService.listTypeDemande;
    // this.totalItem = this.listDemande.length
    // console.log(this.listDemande);
    
  }
  openModal(targetModal: NgbModal, demande: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  
    }

  deletedemande(item :any) {}

  closeBtnClick() {
    this.modalService.dismissAll()
    this.successRequetDelete = '';
    this.successRequeteAdd = '';
    this.successRequeteEdit = '';
  }
  onSubmit() {}

  functionLesDemandes(page: any) {
    this.page = page;
    this.demandeService.lesDossiers(2, this.page, this.itemPerPage).subscribe(
      data => {
        if(data.success) {
          if(data.code == 200) {
            this.listDemande = data.success ? data.data : '';
            this.totalItem = data.total;
          } else {
            this.messageError = data.data.message;
          }
        } else {
          this.messageError = data.data.message;
        }
      }, _error => {
        this.messageError = "Vous ne pouvez pas accéder à cette ressource, veuillez contacter votre administrateur"
      }
    )
  }

  
}
