import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  DxMenuModule,
  DxRangeSelectorModule,
  DxPopupModule,
  DxChartModule,
  DxPieChartModule,
  DxVectorMapModule,
  DxDataGridModule,
  DxBulletModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxDropDownButtonModule,
} from 'devextreme-angular';
import { IconPickerModule } from "ngx-icon-picker";

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LocationComponent } from 'src/app/components/location/location.component';
import { LocationleveltypeComponent } from 'src/app/components/locationleveltype/locationleveltype.component';
import { LocationsearchfilterComponent } from 'src/app/components/locationsearchfilter/locationsearchfilter.component';

import { ContacttypeComponent } from 'src/app/components/contacttype/contacttype.component';

import { PersonComponent } from 'src/app/components/person/person.component';
import { PersontitleComponent } from 'src/app/components/persontitle/persontitle.component';
import { PersoncontactComponent } from 'src/app/components/personcontact/personcontact.component';
import { PersoncontactaddressComponent } from 'src/app/components/personcontactaddress/personcontactaddress.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
    SharedModule,
    DxMenuModule,
    DxRangeSelectorModule,
    DxPopupModule,
    DxChartModule,
    DxPieChartModule,
    DxVectorMapModule,
    DxDataGridModule,
    DxBulletModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxDropDownButtonModule,
    IconPickerModule,
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,

    LocationComponent,
    LocationleveltypeComponent,
    LocationsearchfilterComponent,

    ContacttypeComponent,
    
    PersonComponent,
    PersontitleComponent,
    PersoncontactComponent,
    PersoncontactaddressComponent,
  ]
})

export class HomeModule {

  constructor() { }

  ngOnInit(): void {
  }
}
