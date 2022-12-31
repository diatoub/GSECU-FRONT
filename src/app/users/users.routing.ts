import { Routes } from '@angular/router';
import { AuthGuard } from '../authentication/helpers/auth.guard';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent} from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';



export const UsersRoutes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'adduser',
        component: AddUserComponent,
        data: {
          title: 'Ajouter un utilisateur',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Formulaire d\'ajout' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      },
      {
        path: 'edituser/:id',
        component: EditUserComponent,
        data: {
          title: 'Editer un utilisateur',
          urls: [
            { title: 'Dashboard', url: '/users' },
            { title: '' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      },
      {
        path: 'listusers',
        component: ListUsersComponent,
        data: {
          title: 'Gestion des utilisateurs',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des utilisateurs' }
          ],
          roles: ['ADMIN', 'AGENT', 'SUPER_AGENT']
        }
      }
    
    ]
  }
];
