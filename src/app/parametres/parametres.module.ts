import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { TableService } from '../table/ngtable/ngtable.service';
import { ListMaterielComponent } from './list-materiel/list-materiel.component';
import { MaterielComponent } from './materiel/materiel.component';
import {ParametresRoutes }  from './parametres.routing';
import { TypematerielComponent } from './typemateriel/typemateriel.component';
import { ListDossierComponent } from './list-dossier/list-dossier.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TypedossierComponent } from './typedossier/typedossier.component';


@NgModule({
  imports: [
    RouterModule.forChild(ParametresRoutes),
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    FeatherModule,
    NgxPaginationModule
  ],
  declarations:[
    MaterielComponent,
    ListMaterielComponent,
    TypematerielComponent,
    ListDossierComponent,
    TypedossierComponent,
  ],
  providers: [TableService]
    
})
export class ParametresModule {}