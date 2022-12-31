import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemandeRoutes } from './demande.routing';
import { NewComponent } from './new/new.component';
import { ListDemandeComponent } from './list-demande/list-demande.component';
import { TableService } from '../table/ngtable/ngtable.service';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsComponent } from './details/details.component';
import { NgxFileSaverModule } from '@clemox/ngx-file-saver';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';

@NgModule({
  imports: [RouterModule.forChild(DemandeRoutes),
    CommonModule,
    FeatherModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxFileSaverModule,
    NgMultiSelectDropDownModule,
    NGXFormWizardModule,
    FormsModule
  ],
  declarations: [
    NewComponent,
    ListDemandeComponent,
    DetailsComponent,
  ],
  providers: [TableService]
})
export class DemandeModule {}