import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListSignalisationService {
  listSignalisation: any;

  constructor() { }

  
  public listTypeSignalisation = [
    {
     id: 1,
     agent: "Malick Coly",
     libelleSignalisation: "panne",
     date: "21/06/2022",
     delai: "1 jour",
     etat: true,
     domaine: "controle d'acces",
     site: "ACAD",
     cout:"10 000FCFA",
     analyse:"",
     valid:"",
    },
    {
      id: 2,
      agent: "Khadidiatou Beye",
      libelleSignalisation: "incendie",
      date: "22/06/2022",
      delai: "2 jours",
      etat: false,
      domaine: "video surveillance",
      site: "Siege",
      cout:"50 000FCFA",
      analyse:"",
      valid:"",
     },
     {
      id: 3,
      agent: "Abdoulaye Fall",
      libelleSignalisation: "innondation",
      date: "21/06/2022",
      delai: "3 jours",
      etat: true,
      domaine: "sécurité incendie",
      site: "NSIA",
      cout:"30 000FCFA",
      analyse:"",
      valid:"",
     }
  ]
}