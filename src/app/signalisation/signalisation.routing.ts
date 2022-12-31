import { Routes } from '@angular/router';
import { AuthGuard } from '../authentication/helpers/auth.guard';
import { DetailsComponent } from './details/details.component';
import { ListSignalisationComponent } from './list-signalisation/list-signalisation.component';
import { NewComponent } from './new/new.component';


export const SignalisationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-signalisation',
        component: ListSignalisationComponent,
        data: {
          title: 'Liste des Signalisations',
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
          title: 'Signalisation',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Nouvelle Signalisation' }
          ],
          roles: []
        }
      },
      {
        path: 'details-signalisation/:idSignalisation',
        component: DetailsComponent,
        data: {
          title: 'Détails de la Signalisation',
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
