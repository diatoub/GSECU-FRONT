import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/component/toast/toast.service';
import { DataService } from 'src/app/authentication/helpers/data.service';
import { ParametreService } from '../parametres.service';



@Component({
    selector: 'app-list-materiel',
    templateUrl: './list-materiel.component.html',
    styleUrls: ['./list-materiel.component.css']
})
export class ListMaterielComponent implements OnInit {
  page = 1;
  itemPerPage = 8;
  totalItem: any;
  isSubmitted = false;
  message: string | null = null;
  isSpinnerVisible: boolean = true;
  config: any;
  editMateriel!: FormGroup;
  materielDetail: any | null = null;
  addMateriel!: FormGroup;
  messageError: any;
  successRequetDelete: any;
  filterForm: FormGroup;
  successRequeteAdd: any;
  successRequeteEdit: any;
  alert: any;
  materielList: any;
  listTypeMateriel: any;
  listSite: any;
  listEquipements: any;
 
  constructor(private fb: FormBuilder, private modalService: NgbModal, private dataService: DataService,public parametreService: ParametreService, 
    public toastService: ToastService, public toastr: ToastrService) {
      this.message = null;
      this.alert = null;
    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL')
    })
    this.editMateriel = this.fb.group({
      id: [''],
      typeMateriel: ['', Validators.required],
      site: ['', Validators.required],
      etatMateriel: [false, Validators.required],
      quantite: ['', Validators.required],
    });

    this.addMateriel = this.fb.group({
      typeMateriel: ['', Validators.required],
      site: ['', Validators.required],
      etatMateriel: [false, Validators.required],
      quantite: ['', Validators.required],
    });
  }

  functionListEquipement(){
    this.parametreService.lesEquipements('','','').subscribe(
      data => {
        this.listEquipements = data.success ? data.data : '';
      }
    )
  }

  ngOnInit() {
    this.functionListEquipement();
    //this.gty(this.page);
  }

  gty(page: any) {
   
  }

  deleteMateriel(id: number): void {
    
  }

  openModal(targetModal: NgbModal, materiel: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    if (materiel != null) {
      this.materielDetail = materiel;
      this.editMateriel?.patchValue({
        typeMateriel: materiel.typeMateriel.id,
        site: materiel.site.id,
        etatMateriel: materiel.etat,
        quantite: materiel.quantite,
        id: materiel.id,
      });
    } else {
      this.addMateriel.patchValue({
        etatMateriel: false
      })
    }
  }


  onSubmit() {
    let formValue = this.materielDetail ? this.editMateriel.value : this.addMateriel.value;
    console.log(formValue);
  }


  closeBtnClick() {
    this.editMateriel!.reset();
    this.addMateriel!.reset();
    this.modalService.dismissAll();
    this.materielDetail = null;
    this.successRequetDelete = '';
    this.successRequeteAdd = '';
    this.successRequeteEdit = '';
  }
}
