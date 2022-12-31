import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url_api = environment.base_url;
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, public router: Router,
    public httpBackend: HttpBackend) {   
      this.http = new HttpClient(httpBackend);
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'))
      this.currentUser = this.currentUserSubject.asObservable();
  }

  loginService(data:any){
    return this.http.post<any>(this.url_api + '/login_check', data)
    .pipe(map((userRecu: any) => {
      console.log(userRecu);
      localStorage.setItem('user', JSON.stringify(userRecu));
      localStorage.setItem('token', userRecu.token);
      localStorage.setItem('profil', userRecu.data.profil);
      this.currentUserSubject.next(userRecu); 
      return userRecu;
    }))
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/authentication/login']);
  }
//   getMethod(data:any){
//     let dataParams = {pages: data.page, limit: data.limit}
//     return this.http.get<any>(this.url + '/signalisations', {params: dataParams})

// }

// getAll(){
//   return this.http.get<any>(this.url + '/demande')
// }

// getOneDemand(id: number){
//   return this.http.get<any>(this.url + '/demande/' + id)
// }

  // getMethode(data:any) {
  //   let dataParams = {page: data.page, limit: data.limit}
  //   return this.http.get<any>(this.url + '/signalisations', {params:dataParams})
  // }

  // getAll() {
  //   return this.http.get<any>(this.url + '/demande')
  // }

  // getOneDemande(id: number) {
  //   return this.http.get<any>(this.url + '/dossier/' + id)
  // }


  

}
