import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/component/toast/toast.service';
import { DataService } from 'src/app/authentication/helpers/data.service';
import { UserService } from '../users.service';





@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  page = 1;
  itemPerPage = 10;
  totalItem: any;
  isSubmitted = false;
  message: string | null = null;
  isSpinnerVisible: boolean = true;
  config: any;
  editUser!: FormGroup;
  userDetail: any | null = null;
  addUser!: FormGroup;
  messageError: any;
  successRequetDelete: any;
  filterForm: FormGroup;
  successRequeteAdd: any;
  successRequeteEdit: any;
  alert: any;
  usersList: any;
  listDonnee: any;
  listUser: any;
  
 
  constructor(private fb: FormBuilder, private modalService: NgbModal, private dataService: DataService,
    public toastService: ToastService, public toastr: ToastrService, public userService: UserService) {
      this.message = null;
      this.alert = null;
    this.filterForm = new FormGroup({
      prenom: new FormControl(''),
      nom: new FormControl(''),
      email: new FormControl('')
    })
    this.editUser = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      email:  ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")])],
      numTel: ['', Validators.required],
      profil: ['', Validators.required],
      structure: ['', Validators.required],
    });

    this.addUser = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      email:  ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")])],
      numTel: ['', Validators.compose([
        Validators.required,
        Validators.pattern("7[05678][0-9]{7}")])],
      profil: ['', Validators.required],
      structure: ['', Validators.required],
    });
  }

  functionLesUsers(page: any){
    this.page = page;
    this.userService.lesUsers(this.page, this.itemPerPage, this.filterForm.value).subscribe(
      data => {
        if(data.success) {
          if(data.code == 200) {
            this.listUser = data.success ? data.data : [];
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

  ngOnInit() {
    //this.gty(this.page);
    this.functionLesUsers(this.page);
  }

  gty(page: any) {
    // this.usersList = this.dataService.listDonnee;
    // this.totalItem = this.usersList.length
  }

  deleteUser(id: number): void {
  }

  openModal(targetModal: NgbModal, user: any | null) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    if (user!= null) {
      this.userDetail=user;
      this.editUser?.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        username: user.tmp,
        email: user.email,
        numTel: user.telephone,
        profil: user.profil.id,
        structure: user.structure.id,
        id: user.id,
      });
    }
  }


  onSubmit() {
    console.log(this.addUser.value);
    console.log(this.editUser.value);
  }


  closeBtnClick() {
    this.editUser!.reset();
    this.addUser!.reset();
    this.modalService.dismissAll();
    this.userDetail = null;
    this.successRequetDelete = '';
    this.successRequeteAdd = '';
    this.successRequeteEdit = '';
  }
}
