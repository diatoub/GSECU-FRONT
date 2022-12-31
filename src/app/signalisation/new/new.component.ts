import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ParametreService } from 'src/app/parametres/parametres.service';
import { UserService } from 'src/app/users/users.service';
import { ListSignalisationService } from '../list.service';
import { SignalisationService } from '../signalisation.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  signalisationList: any;
  page: any;
  filterForm: any;
  newSignalisationForm: any;
  modalService: any;
  signalisationDetail: any;
  fileToUpload: any;
  fileUploadService: any;
  httpClient: any;
  handleError: any;
  listSite: any;
  listDomaine: any;
  errorMessage: any;
  videFile: any;
  listTypeMateriel: any;
  totalItem: any;
  listUser: any;
  constructor(public listSignalisationService: ListSignalisationService, public fb: FormBuilder, public parametreService: ParametreService, 
    public signalisationService: SignalisationService, public router: Router, public toastr: ToastrService, public userService: UserService) {
    this.filterForm = new FormGroup({
      mot_cles: new FormControl(''),
      type: new FormControl('ALL', Validators.required)
    }) 
    this.newSignalisationForm = this.fb.group({
      id: [''],
      libelle: ['', Validators.required],
      type_signalisation: ['', Validators.required],
      materiel_panne: ['', Validators.required],
      autre_materiel:[''],
      site: ['', Validators.required],
      quantite_panne: ['', Validators.required],
      description_panne: ['', Validators.required],
      signaleur : ['', Validators.required],
      libellePiece: [''],
    });
   }

   functionAddSignalisation(){
    let form_data = new FormData();
    let formValue = this.newSignalisationForm.value;
    for(let key in formValue) {
      form_data.append(key, formValue[key])
    }
    form_data.append('file', this.fileToUpload)
    this.signalisationService.nouvelleSignalisation(form_data).subscribe(
      data => {
        console.log(data);
        if(data.code == 200) {
          if(data.success) {
            this.toastr.success(data.data.message, 'Success', {
              timeOut: 3000
            })
            this.router.navigate(['/signalisation/list-signalisation'])
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
   
   functionLesSites() {
    this.parametreService.lesSites(0).subscribe(
      data => {
        this.listSite = data.success ? data.data : '';
      }
    )
  }

  functionLesDomainesDeSignalisation() {
    this.parametreService.lesDomainesSignalisation(1).subscribe(
      data => {
        this.listDomaine = data.success ? data.data : '';
      }
    )
  }
  
  functionTypeMateriel(){
    this.parametreService.lesTypesMateriel().subscribe(
      data => {
        this.listTypeMateriel = data.success ? data.data : '';
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

  ngOnInit(): void {
    //this.gty(this.page);
    this.functionLesSites();
    this.functionLesDomainesDeSignalisation();
    this.functionTypeMateriel();
    this.functionLesUsers();

  }
  gty(page: any) {
    
    // this.signalisationList = this.listSignalisationService.listTypeSignalisation;
    // console.log(this.signalisationList);  
  }

    openModal(targetModal: NgbModal, signalisationForm: any | null) {
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static'
      });
      if (signalisationForm != null) {
        this.signalisationDetail = signalisationForm;
        this.newSignalisationForm?.patchValue({
          nomSignalisation: signalisationForm.nomSignalisation,
          domaine: signalisationForm.domaine,
          materiel: signalisationForm.materiel,
          autre: signalisationForm.autre,
          site: signalisationForm.site,
          quantite: signalisationForm.quantite,
          id: signalisationForm.id,
          description: signalisationForm.description,
        });
      }
    }
    onSubmit() {}

    handleFileInput(e: any) {
      if(e.files.item(0)) {
        this.fileToUpload = e.files.item(0);
      } else {
        this.videFile = true;
      }
  }
    uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe((data: any) => {
      // do something, if upload success
      }, (error: any) => {
        console.log(error);
      });
  }
    postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, {} )
      .map(() => { return true; })
      .catch((e: any) => this.handleError(e));
}
}
  
