import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/component/toast/toast.service';
import { DemandeService } from 'src/app/demande/demande.service';
import { ParametreService } from '../parametres.service';

@Component({
  selector: 'app-list-dossier',
  templateUrl: './list-dossier.component.html',
  styleUrls: ['./list-dossier.component.css']
})
export class ListDossierComponent implements OnInit {
  page = 1;
  itemPerPage = 8;
  totalItem: any;
  isSubmitted = false;
  message: string | null = null;
  isSpinnerVisible: boolean = true;
  config: any;
  editDossier!: FormGroup;
  dossierDetail: any | null = null;
  addDossier!: FormGroup;
  messageError: any;
  successRequetDelete: any;
  filterForm: FormGroup;
  successRequeteAdd: any;
  successRequeteEdit: any;
  alert: any;
  dossierList: any;
  listTypeDossier: any;
  listSite: any;
  listCategories: any;
  afficherDossier: any;
  listDomaine: any;
 
 
  constructor(private fb: FormBuilder, private modalService: NgbModal, public parametreService: ParametreService ,public demandeService: DemandeService , 
    public toastService: ToastService, public toastr: ToastrService) {
      this.message = null;
      this.alert = null;
    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL')
    })
    this.editDossier = this.fb.group({
      id: [''],
      libelleDossier: ['', Validators.required],
      delai: ['', Validators.required],
      categorie: ['', Validators.required],
    });

    this.addDossier = this.fb.group({
      libelleDossier: ['', Validators.required],
      delai: ['', Validators.required],
      categorie: ['', Validators.required],
    });
  }

  ngOnInit() {
    //this.gty(this.page);
    this.functionlistCategories();
    this.functionAfficherDossier();
    this.functionlistDomainesSignalisation();
  }

  functionlistCategories() {
    this.parametreService.lesCategories().subscribe(
      data => {
        this.listCategories = data.success ? data.data : '';
      }
    )
  }

  functionlistDomainesSignalisation() {
    this.parametreService.lesDomainesSignalisation(1).subscribe(
      data => {
        this.listDomaine = data.success ? data.data : '';
      }
    )
  }

  functionAfficherDossier() {
    this.parametreService.afficherDossier('').subscribe(
      data => {
        this.afficherDossier = data.success ? data.data : '';
      }
    )
  }

  gty(page: any) {
    // this.dossierList = this.listService.listTypeDossier;
    // this.categorieList = this.listService.listCategorie;
    // this.totalItem = this.dossierList.length
  }

  deleteDossier(id: number): void {
    
  }

  openModal(targetModal: NgbModal, dossier: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    if (dossier != null) {
      this.dossierDetail = dossier;
      this.editDossier?.patchValue({
        libelleDossier: dossier.libelleDossier,
        categorie: dossier.categorie.id,
        delai: dossier.delai,
        id: dossier.id,
      });
    }
  }


  onSubmit() {
    console.log(this.addDossier.value);
    console.log(this.editDossier.value);
  }


  closeBtnClick() {
    this.editDossier!.reset();
    this.addDossier!.reset();
    this.modalService.dismissAll();
    this.dossierDetail = null;
    this.successRequetDelete = '';
    this.successRequeteAdd = '';
    this.successRequeteEdit = '';
  }

}
