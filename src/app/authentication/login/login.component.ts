import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeService } from 'src/app/demande/demande.service';
import { AuthService } from '../helpers/auth.service';
import { DataService } from '../helpers/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginform: FormGroup;
  recoverform = false;
  message: any;
  usernameMessage: any;
  passwordMessage: any;
  isLogin: boolean = true;
  searchForm: FormGroup;
  messageSearch: any;
  infoDossier: any;
  constructor(private router: Router, public dataService: DataService, public authService: AuthService,
    public demandeService: DemandeService) {
    this.loginform = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.searchForm = new FormGroup({
      codeDossier: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {}

  login(){
    this.authService.loginService(this.loginform.value).subscribe(
      result => {
         if(result.code == 200) {
          if(result.status) {
            this.router.navigate(['accueil'])
          } else {
            this.message = result.message;
          }
         } else {
           this.message = result.message;
         }
      }, _error => {
        this.message = 'Vous ne pouvez pas accéder a cette ressource, veuillez contacter votre administrateur.';
      }
    )
  }

  open() {
    this.router.navigate(['demande']);
  }

  filter(v: any) {
    this.usernameMessage = v.username ? '' : "Veuillez saisir votre nom d'utilisateur!"
    this.passwordMessage = v.password ? '' : 'Veuillez saisir votre mot de passe!'
    if(v.username && v.password){
      let user = this.dataService.listDonnee.filter(x => x.tmp.toLowerCase().
      indexOf(v.username.toLowerCase())!== -1 && x.password.toLowerCase().indexOf(v.password.toLowerCase()) !== -1);
      if(user.length > 0 ){ 
        localStorage.setItem('profil', user[0].profil);
        localStorage.setItem('token', user[0].token);
        localStorage.setItem('prenom', user[0].prenom);
        localStorage.setItem('nom', user[0].nom);
        localStorage.setItem('email', user[0].email);
        localStorage.setItem('user', user.toString());
        this.router.navigate(['accueil']);
        this.message = '';
      } else{
        this.message = 'Login ou Mot de passe invalide!!'
      }
    }
  }
  
  changeView(view: boolean) {
    this.isLogin = view;
  }

  search() {
    this.demandeService.afficherDossier(this.searchForm.value).subscribe(
      data => {
        if(data.success) {
          if(data.code == 200) {
            this.infoDossier = data.data;
            if(data.my_dossier?.categorie === 'DEMANDE') {
              this.router.navigate(['/demande/details-demande', this.infoDossier.my_dossier.id]);
            } else {
              this.router.navigate(['/signalisation/details-signalisation', this.infoDossier.my_dossier.id]);
            }
          } else {
            this.messageSearch = data.data;
          }
        } else {
          this.messageSearch = data.data;
        }
      }, _error => {
        this.messageSearch = "Vous ne pouvez pas accéder à cette ressource, veuillez contacter votre administrateur"
      }
    )
  }
}
