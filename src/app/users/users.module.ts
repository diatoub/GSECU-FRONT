import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { ListUsersComponent } from './list-users/list-users.component';
import { UsersRoutes } from './users.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  imports: [
    RouterModule.forChild(UsersRoutes),
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    FeatherModule,
    NgxPaginationModule,
  ],
  declarations:[
    ListUsersComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  providers: []
    
})
export class UsersModule {}