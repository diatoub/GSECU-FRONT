import { Routes } from '@angular/router';
import { AuthGuard } from '../authentication/helpers/auth.guard';
import { DetailsComponent } from './details/details.component';
import { ListDemandeComponent } from './list-demande/list-demande.component';
import { NewComponent } from './new/new.component';


export const DemandeRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'listDemandes',
        component: ListDemandeComponent,
        data: {
          title: 'Liste des Demandes',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      },
      {
        path: 'new',
        component: NewComponent,
        data: {
          title: 'Nouvelle Demande',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      },
      {
        path: 'details-demande/:idDemande',
        component: DetailsComponent,
        data: {
          title: 'Détails de la Demande',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: '' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      },
    ]
  }
];
