import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametreService } from 'src/app/parametres/parametres.service';
import { ListSignalisationService } from '../list.service';
import { SignalisationService } from '../signalisation.service';

@Component({
  selector: 'app-list-signalisation',
  templateUrl: './list-signalisation.component.html',
  styleUrls: ['./list-signalisation.component.scss']
})
export class ListSignalisationComponent implements OnInit {

  signalisationDetail: any;
  signalisationList: any;
  filterForm: FormGroup;
  page = 1;
  itemPerPage = 8;
  totalItem: any;
  successRequetDelete: any;
  successRequeteAdd: any;
  successRequeteEdit: any;
  listSignalisation: any;
  messageError: any;
  constructor(public listSignalisationService: ListSignalisationService, public fb: FormBuilder, public modalService: NgbModal, public signalisationService: SignalisationService ) {
    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL', Validators.required)
    })
    }

  ngOnInit(): void {
    //this.gty(this.page);
    this.functionLesSignalisations(this.page);
  }
  gty(page: number) {
    // this.signalisationList = this.listSignalisationService.listTypeSignalisation;
    // this.totalItem = this.signalisationList.length
    // console.log(this.signalisationList);
    
  }
  openModal(targetModal: NgbModal, signalisation: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  
    }

  deleteSignalisation(item :any) {}

  closeBtnClick() {
    this.modalService.dismissAll()
    this.successRequetDelete = '';
    this.successRequeteAdd = '';
    this.successRequeteEdit = '';
  }
  onSubmit() {}

  functionLesSignalisations(page: any) {
    this.page = page;
    this.signalisationService.lesDossiers(1, this.page, this.itemPerPage).subscribe(
      data => {
        if(data.success) {
          if(data.code == 200) {
            this.listSignalisation = data.success ? data.data : '';
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
