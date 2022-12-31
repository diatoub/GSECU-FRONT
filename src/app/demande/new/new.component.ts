import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbNav, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/authentication/helpers/data.service';
import { ToastService } from 'src/app/component/toast/toast.service';
import { DemandeService } from '../demande.service';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { ParametreService } from 'src/app/parametres/parametres.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  isSubmitted = false;
  message: string | null = null;
  isSpinnerVisible: boolean = true;
  config: any;
  addDemande!: FormGroup;
  messageError: any;
  successRequetDelete: any;
  filterForm: FormGroup;
  successRequeteAdd: any;
  successRequeteEdit: any;
  alert: any;
  besoinList: any;
  sites: any;
  selectedItems: any[] = [];
  dropdownList: any[] = [];

  currentJustify = 'start';

  active=1;
  precedent = 1;
  suivant = this.active + 1;
  activeKeep=1;

  activeSelected=1;
  disabled = true;
  @ViewChild(NgbNav) navDynamic: any;
  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  activeDynamic=1;
  donnees: any;
  listForAjout:any;
  errorFile: any;
  filename: any;
  fileContent: any;
  itemTab2 = 2;
  itemTab3 = 3;
  valueType: string = '';
  isValueType: boolean = false;
  isActivated: any;
  fileContentBeneficiaire: any;
  errorFileBeneficiare: string = ''; 
  urlFile: any = '../../../assets/images/maquetteQrcode (3).xlsx';
  singleselectedItems: any;
  singledropdownSettings: any;
  closeDropdownSelection: any;
  dropdownSettings = {};
  listvalueFile: any = [];
  listAllEquipement: any;
  listTypeBadge: any;
  listObjet: any;
  listMotifDemande: any;
  listMotifRemplacement: any;
  listTypeContrat: any;
  listTypeDeDemande: any;
  listStructure: any;
  listSite: any;
  errorMessage: any;
  router: any;
  constructor(private fb: FormBuilder,  public demandeService: DemandeService,
    public toastService: ToastService, public toastr: ToastrService, public parametreService: ParametreService, 
    public dataservice: DataService, public fileSaver: NgxFileSaverService) {
      this.message = null;
      this.alert = null;
    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL')
    })

    this.addDemande = this.fb.group({
      infoDemandeur: this.fb.group({
        type_demande: ['', Validators.required],
        demandeur: ['']
      }),
      infoBeneficier: this.fb.group({
        nom: [''],
        prenom: [''],
        site: [''],
        matricule: [''],
        structure: [''],
        typeAjout: [''],
        fileBeneficiaires: [''],
        lesBeneficiares: this.fb.array([this.createbeneficiare()])
      }),
      formulaire: this.fb.group({
        dateDebut: [''],
        dateFin: [''],
        type_badge: [''],
        type_contrat: [''],
        siteAcces: [''],
        objet_badge: [''],
        besoin: [''],
        isQRCode: [''],
        motif_demande: [''],
        motif_remplacement: [''],
        objectAcces: [''],
        quantite: [''],
        epi: [''],
        file: [''],
        libellePiece: [''],
        lesFiles: this.fb.array([this.createFiles()])
      })
    });
  }

  ngOnInit() {
    // this.besoinList = this.ListDemandeService.listBesoin;
    // this.donnees = this.dataservice.listDonnee;
    // this.listForAjout = this.ListDemandeService.listForAjoutDemande;
    this.removeBeneficiaire(0);
    this.dropdownList = [
      { item_id: 1, item_text: 'ACAD' },
      { item_id: 2, item_text: 'NSIA' },
      { item_id: 3, item_text: 'SIEGE' },
      { item_id: 4, item_text: 'MEDINA' },
      { item_id: 5, item_text: 'GRAND DAKAR' }
    ];
    this.sites = ['ACAD', 'NSIA', 'SIEGE', 'MEDINA', 'GRAND DAKAR'];

    this.singledropdownSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection
    };

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.functionlistEquipements();
    this.functionTypesBadges();
    this.functionObjetBadge();
    this.functionMotifDemande();
    this.functionMotifRemplacement();
    this.functionTypesContrat();
    this.functionTypeDeDemande();
    this.functionLesStructure();
    this.functionLesSites();
  }

  functionlistEquipements() {
    this.parametreService.lesEquipements(1, 'ALL', '').subscribe(
      data => {
        this.listAllEquipement = data.success ? data.data : '';
      }
    )
  }

  functionTypesBadges() {
    this.parametreService.typesDeBadges().subscribe(
      data => {
        this.listTypeBadge = data.success ? data.data : '';
      }
    )
  }

  functionTypesContrat() {
    this.parametreService.typesDeContrat().subscribe(
      data => {
        this.listTypeContrat = data.success ? data.data : '';
      }
    )
  }

  functionObjetBadge() {
    this.parametreService.objetBadge().subscribe(
      data => {
        this.listObjet = data.success ? data.data : '';
      }
    )
  }

  functionMotifDemande() {
    this.parametreService.motifDemande(1).subscribe(
      data => {
        this.listMotifDemande = data.success ? data.data : '';
      }
    )
  }

  functionMotifRemplacement() {
    this.parametreService.motifRemplacement(1).subscribe(
      data => {
        this.listMotifRemplacement = data.success ? data.data : '';
      }
    )
  }

  functionTypeDeDemande() {
    this.parametreService.typeDeDemande(2).subscribe(
      data => {
        this.listTypeDeDemande = data.success ? data.data : '';
      }
    )
  }

  functionLesStructure() {
    this.parametreService.lesStructures(2).subscribe(
      data => {
        this.listStructure = data.success ? data.data : '';
      }
    )
  }

  functionLesSites() {
    this.parametreService.lesSites(0).subscribe(
      data => {
        this.listSite = data.success ? data.data : '';
      }
    )
  }

  saveFile() {
    this.fileSaver.saveUrl(this.urlFile, 'Modèle du template');
  }

  valueTypeDemande(value: any) {
    this.valueType = value;
    this.isValueType = value ? true : false;
    this.itemTab3 = (value == 'COBA' || value == 'DAA') ? 3 : 2;
    let typeDemande = this.listTypeDeDemande.filter((x: any) => x.code.toString().
      indexOf(value.toString()) !== -1)
    this.addDemande.patchValue({
      infoDemandeur: {
        type_demande: typeDemande[0].id
      }
    })
  }

  fonctionForRadio(value: any) {
    this.addDemande.patchValue({
      formulaire: {
        isQRCode: value
      }
    })
  }

  get beneficiaires(): FormArray {
    return this.addDemande.get("infoBeneficier")?.get("lesBeneficiares") as FormArray;
  }
  get files(): FormArray {
    return this.addDemande.get("formulaire")?.get("lesFiles") as FormArray;
  }

  addBeneficiare() {
    this.beneficiaires.push(this.createbeneficiare());
    console.log(this.beneficiaires.length)
  }

  removeBeneficiaire(i: number) {
    this.beneficiaires.removeAt(i);
  }

  createbeneficiare(): FormGroup {
    return this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email:  ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$")])],
      numero: ['', Validators.required]
    })
  }

  createFiles(): FormGroup {
    return this.fb.group({
      libellePiece: ['', Validators.required],
      file: ['']
    })
  }
  addFile() {
    this.files.push(this.createFiles());
  }
  removeFile(i: number) {
    this.files.removeAt(i);
    this.listvalueFile.splice(i, 1);
  }
  

  onSubmit() {
    let fileObjetJSON: any = [];
    let listFileInput = this.addDemande.value.formulaire.lesFiles;
    listFileInput.forEach((element: any, index: any) => {
      this.listvalueFile.forEach((element1: any, index1: any) => {
        if(index == index1) {
          let value = {
            nomPJ: element.nomPJ,
            file: element1.file
          }
          fileObjetJSON.push(value)
        }
      });
    });
    let infoBeneficier = this.addDemande.value.infoBeneficier;
    const formData = new FormData();
    for(let key in infoBeneficier) {
      formData.append(key, infoBeneficier[key]);
    }
    let formulaire = this.addDemande.value.formulaire;
    for(let key in formulaire) {
      formData.append(key, formulaire[key])
    }
     let infoDemandeur = this.addDemande.value.infoDemandeur;
     for(let key in infoDemandeur) {
       formData.append(key, infoDemandeur[key])
     }
    formData.append('files', JSON.stringify(fileObjetJSON));
    console.log(formData)
  }

  closeBtnClick() {
    this.addDemande.reset();
    this.successRequetDelete = '';
    this.successRequeteAdd = '';
    this.successRequeteEdit = '';
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.activeSelected = 1;
    }
  }

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }

  getFile(event: any, libelle: any) {
    this.fileContent = event.target.files[0];
    if(this.fileContent.size > 5242880) {
      this.errorFile = 'La taille maximale du fichier est de 5 Mo'
    } else {
      this.filename = this.fileContent.name;
      this.errorFile = '';
      let inputfile = {
        file: this.fileContent,
        nomPJ: libelle
      }
      this.listvalueFile.push(inputfile);
    }
  }
  getFileBeneficiaire(event: any) {
    this.fileContentBeneficiaire = event.target.files[0];
    if(this.fileContentBeneficiaire.size > 5242880) {
      this.errorFileBeneficiare = 'La taille maximale du fichier est de 5 Mo'
    } else {
      this.filename = this.fileContentBeneficiaire.name;
      this.errorFileBeneficiare = ''
    }
  }

  tabNumber() {
    this.suivant = this.active + 1;
    this.precedent = this.active - 1
  }

  next() {
    this.navDynamic.select(this.active + 1)
  }

  previous() {
    this.navDynamic.select(this.active - 1)
  }

  functionAddDemande(){
    let fileArray = [];
    let form_data = new FormData();
    let valueForm = Object.assign(this.addDemande.value.infoDemandeur, this.addDemande.value.infoBeneficier, this.addDemande.value.formulaire)
    for( let key in valueForm) {
      if(key !== 'lesBeneficiares' && key !== 'lesFiles') {
        form_data.append(key, valueForm[key])
      } else {
        form_data.append(key, JSON.stringify(valueForm[key]))
        // if(key === 'lesFiles') {
        //   valueForm[key].forEach((item: any) => {
        //     let formDataItem = new FormData();
        //     formDataItem.append('file', item.fil)
        //   })
        // }
      }
    }
    // for( let i = 0; i < this.listvalueFile.length; i++ ) {
    //   form_data.append('file[]', this.listvalueFile[i].file)
    // }
    // this.listvalueFile.forEach((item: any) => {
    //   form_data.append('lesFiles[]file', item.file)
    // });
    // console.log('ok')
    // console.log(valueForm)
    
    this.demandeService.nouvelleDemande(form_data).subscribe(
      data => {
          console.log('ok');
          console.log(data);
        if(data.code == 200) {
          if(data.success) {
            this.toastr.success(data.data.message, 'Success', {
              timeOut: 3000
            })
            this.router.navigate(['/demande/list-demande'])
          } else {
            this.errorMessage = data.data.message
          }
        } else {
          this.errorMessage = data.data.message
        }
      }, _error => {
        this.errorMessage = "Vous ne pouvez pas accéder à cette ressource, veuillez contacter votre administrateur";
      }
    )
  }
}
