import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/authentication/helpers/data.service';
import { ParametreService } from '../parametres.service';

@Component({
  selector: 'app-typemateriel',
  templateUrl: './typemateriel.component.html',
  styleUrls: ['./typemateriel.component.scss']
})
export class TypematerielComponent implements OnInit {

  dataTypeMateriel: any;
  filterForm: FormGroup;
  materielDetail: any;
  editMateriel: FormGroup;
  addMateriel: FormGroup;
  page = 1;
  itemPerPage = 8;
  totalItem: any;
  listTypeMateriel: any;
  constructor(public dataService: DataService, private modalService: NgbModal, public fb: FormBuilder,public parametreService: ParametreService) {
    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL', Validators.required)
    })
    this.editMateriel = this.fb.group({
      id: [''],
      libelleMateriel: ['', Validators.required],
      etatMateriel: [false, Validators.required],
    });

    this.addMateriel = this.fb.group({
      libelleMateriel: ['', Validators.required],
      etatMateriel: [false, Validators.required],
    });
  }

  functionTypeMateriel(){
    this.parametreService.lesTypesMateriel().subscribe(
      data => {
        this.listTypeMateriel = data.success ? data.data : '';
      }
    )
  }

  ngOnInit(): void {
    // this.gty(this.page);
    this.functionTypeMateriel();
  }
  
  gty(page: number) {
    // this.dataTypeMateriel = this.dataService.listDonnee
    // this.totalItem = this.dataTypeMateriel.length
  }

  openModal(targetModal: NgbModal, materiel: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    if (materiel != null) {
      this.materielDetail = materiel;
      this.addMateriel?.patchValue({
        libelleMateriel: materiel.libelleMateriel,
        etatMateriel: materiel.etat,
        id: materiel.id,
      });
    } else {
      this.addMateriel.patchValue({
        etatMateriel: false
      })
    }
  }
  deleteMateriel(item :any) {}

  closeBtnClick() {
    this.editMateriel!.reset();
    this.addMateriel!.reset();
    this.modalService.dismissAll();
    this.materielDetail = null;
  }
  onSubmit() {
    console.log(this.addMateriel.value);
    
  }
}
