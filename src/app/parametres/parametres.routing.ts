import { Routes } from '@angular/router';
import { AuthGuard } from '../authentication/helpers/auth.guard';
import { ListDossierComponent } from './list-dossier/list-dossier.component';
import { ListMaterielComponent } from './list-materiel/list-materiel.component';
import { MaterielComponent } from './materiel/materiel.component';
import { TypematerielComponent } from './typemateriel/typemateriel.component'



export const ParametresRoutes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'listmateriel',
        component: ListMaterielComponent,
        data: {
          title: 'Liste des Matériels',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      },
      {
        path: 'typemateriel',
        component: TypematerielComponent,
        data: {
          title: 'Gestion des Types de Matériel',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des Matériels' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      },
      {
        path: 'listdossier',
        component: ListDossierComponent,
        data: {
          title: 'Liste des types de Dossier',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      }
        // {
      //   path: 'typedossier',
      //   component: TypedossierComponent,
      //   data: {
      //     title: 'Gestion des Dossiers',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboard' },
      //       { title: 'ajouter' }
      //     ],
      //     roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
      //   }
      // }
    ]
  }
]
