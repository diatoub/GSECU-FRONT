import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignalisationRoutes } from './signalisation.routing';
import { NewComponent } from './new/new.component';
import { ListSignalisationComponent } from './list-signalisation/list-signalisation.component';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TableService } from '../table/ngtable/ngtable.service';
import { DetailsComponent } from './details/details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [
    RouterModule.forChild(SignalisationRoutes),
    CommonModule,
    FeatherModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule
  ],
  declarations: [
    NewComponent,
    ListSignalisationComponent,
    DetailsComponent,
  ],
  providers: [TableService]
})
export class SignalisationModule {}