import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/users/users.service';
import { SignalisationService } from '../signalisation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  signalisationDetail: any;
  signalisationList: any;
  filterForm: FormGroup;
  validateForm: FormGroup;
  successRequetDelete: any;
  successRequeteAdd: any;
  successRequeteEdit: any;
  page = 1;
  itemPerPage = 4;
  totalItem: any;
  affectForm: FormGroup;
  analyseForm: FormGroup;
  detailsSignalisation: any;
  messageError: any;
  idSignalisation: any;
  listUser: any;

  constructor(public signalisationService: SignalisationService, public fb: FormBuilder, public modalService: NgbModal,public activedRoute: ActivatedRoute, public userService: UserService ) {
    this.activedRoute.params.subscribe((params) => {
      this.idSignalisation = +params["idSignalisation"]})

    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL', Validators.required)
    }) 
    this.affectForm = this.fb.group({
      id: [''],
      agent: ['', Validators.required],
      etat: [false, Validators.required],
    });
    this.analyseForm = this.fb.group({
      id: [''],
      date: ['', Validators.required],
      etat: [false, Validators.required],
      analyse: ['',],
    });
    this.validateForm = this.fb.group({
      id: [''],
      cout: ['', Validators.required],
    });
    }

  ngOnInit(): void {
    //this.gty(this.page);
    this.functionDetailsSignalisation();
    this.functionLesUsers();
  }

  functionDetailsSignalisation() {
    console.log('ok');
    this.signalisationService.detailsSignalisation(this.idSignalisation).subscribe(
      data => {
        if(data.success) {
          if(data.code == 200) {
            this.detailsSignalisation = data.success ? data.data : '';
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

  functionLesUsers(){
    this.userService.lesUsers(1, 'ALL', '').subscribe(
      data => {
        if(data.success) {
          if(data.code == 200) {
            this.listUser = data.success ? data.data : [];
            this.totalItem = data.total;
          } 
        } 
      }
    )
  }

  gty(page: number) {
    
  }
  openModal(targetModal: NgbModal, signalisation: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    if (signalisation != null) {
      this.signalisationDetail = signalisation;
      this.affectForm.patchValue({
        etat: signalisation.etat,
        id: signalisation.id,
        agent: signalisation.agent,
      });
    } else{
      this.affectForm.patchValue({
        etat: false,
      })
    }

  }
  
    

  deleteSignalisation(item :any) {}

  closeBtnClick() {
    this.modalService.dismissAll()
    this.affectForm!.reset();
    this.analyseForm!.reset();
    this.validateForm.reset();
    this.successRequetDelete = '';
    this.successRequeteAdd = '';
    this.successRequeteEdit = '';
  }
  onSubmit() {}
}
