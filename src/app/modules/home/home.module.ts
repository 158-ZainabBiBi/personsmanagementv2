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
import { NavigationComponent } from '../navigation/navigation.component';

import { LocationComponent } from 'src/app/components/location/location.component';
import { LocationleveltypeComponent } from 'src/app/components/locationleveltype/locationleveltype.component';
import { LocationsearchfilterComponent } from 'src/app/components/locationsearchfilter/locationsearchfilter.component';

import { ActivityComponent } from 'src/app/components/activity/activity.component';
import { ResidentialComponent } from '../../components/residential/residential.component';
import { SexComponent } from '../../components/sex/sex.component';
import { SexualorientationComponent } from '../../components/sexualorientation/sexualorientation.component';
import { GenderComponent } from '../../components/gender/gender.component';
import { EthnicComponent } from '../../components/ethnic/ethnic.component';
import { ReligionComponent } from '../../components/religion/religion.component';
import { MaritalstatusComponent } from '../../components/maritalstatus/maritalstatus.component';
import { NationalityComponent } from '../../components/nationality/nationality.component';
import { DomicileComponent } from '../../components/domicile/domicile.component';
import { ImmigrationstatusComponent } from '../../components/immigrationstatus/immigrationstatus.component';
import { WorktypeComponent } from '../../components/worktype/worktype.component';
import { ContacttypeComponent } from '../../components/contacttype/contacttype.component';
import { EducationinstituteComponent } from '../../components/educationinstitute/educationinstitute.component';
import { EducationattendancemodeComponent } from '../../components/educationattendancemode/educationattendancemode.component';
import { PersoneducationinstituteComponent } from '../../components/personeducationinstitute/personeducationinstitute.component';
import { PersoneducationqualificationComponent } from '../../components/personeducationqualification/personeducationqualification.component';
import { AwardingbodyComponent } from '../../components/awardingbody/awardingbody.component';
import { LanguageComponent } from '../../components/language/language.component';
import { FluencyComponent } from '../../components/fluency/fluency.component';
import { CompetencyComponent } from '../../components/competency/competency.component';

import { PersonComponent } from 'src/app/components/person/person.component';
import { PersontitleComponent } from 'src/app/components/persontitle/persontitle.component';
import { PersonemploymentComponent } from '../../components/personemployment/personemployment.component';
import { PersonactivityComponent } from 'src/app/components/personactivity/personactivity.component';
import { PersonequalityComponent } from '../../components/personequality/personequality.component';
import { PersonlanguageComponent } from '../../components/personlanguage/personlanguage.component';
import { PersonreferenceComponent } from 'src/app/components/personreference/personreference.component';
import { PersonrelationshipComponent } from '../../components/personrelationship/personrelationship.component';
import { PersoncontactComponent } from 'src/app/components/personcontact/personcontact.component';
import { PersoncontactaddressComponent } from 'src/app/components/personcontactaddress/personcontactaddress.component';
import { PersonattributevalueComponent } from '../../components/personattributevalue/personattributevalue.component';

import { PersonactivitiesComponent } from '../persons/personactivities/personactivities.component';
import { PersoncommunicationsmsesComponent } from '../persons/personcommunicationsmses/personcommunicationsmss.component';
import { PersoncommunicationlettersComponent } from '../persons/personcommunicationletters/personcommunicationletters.component';
import { PersoncommunicationemailsComponent } from '../persons/personcommunicationemails/personcommunicationemails.component';

import { PersonchildrensComponent } from '../persons/personchildrens/personchildrens.component';
import { PersonattributevaluesComponent } from '../persons/personattributevalues/personattributevalues.component';
import { PersoneducationqualificationmodulesComponent } from '../persons/personeducationqualificationmodules/personeducationqualificationmodules.component';
import { PersoneducationqualificationsComponent } from '../persons/personeducationqualifications/personeducationqualifications.component';
import { PersonreferencesComponent } from '../persons/personreferences/personreferences.component';
import { PersoneducationinstitutesComponent } from '../persons/personeducationinstitutes/personeducationinstitutes.component';
import { PersonsocialmediasComponent } from '../persons/personsocialmedias/personsocialmedias.component';
import { PersonsocialmediaactivitiesComponent } from '../persons/personsocialmediaactivities/personsocialmediaactivities.component';
import { PersonprofessionalbodiessComponent } from '../persons/personprofessionalbodiess/personprofessionalbodiess.component';
import { PersondocumentsComponent } from '../persons/persondocuments/persondocuments.component';
import { PersontestimonialsComponent } from '../persons/persontestimonials/persontestimonials.component';
import { PersonmembershipsComponent } from '../persons/personmemberships/personmemberships.component';
import { PersonlanguagesComponent } from '../persons/personlanguages/personlanguages.component';
import { PersonidentitiesComponent } from '../persons/personidentities/personidentities.component';
import { PersonequalitiesComponent } from '../persons/personequalities/personequalities.component';
import { PersonemploymentsComponent } from '../persons/personemployments/personemployments.component';

import { EducationqualificationmoduleviewComponent } from '../persons/personeducationqualificationmodules/educationqualificationmoduleview/educationqualificationmoduleview.component';
import { TestimonialviewComponent } from '../persons/persontestimonials/testimonialview/testimonialview.component';
import { SocialmediaactivityviewComponent } from '../persons/personsocialmediaactivities/socialmediaactivityview/socialmediaactivityview.component';
import { ReferenceviewComponent } from '../persons/personreferences/referenceview/referenceview.component';
import { ProfessionalbodiesviewComponent } from '../persons/personprofessionalbodiess/professionalbodiesview/professionalbodiesview.component';
import { MembershipviewComponent } from '../persons/personmemberships/membershipview/membershipview.component';
import { LanguageviewComponent } from '../persons/personlanguages/languageview/languageview.component';
import { IdentityviewComponent } from '../persons/personidentities/identityview/identityview.component';
import { EqualityviewComponent } from '../persons/personequalities/equalityview/equalityview.component';
import { EmploymentviewComponent } from '../persons/personemployments/employmentview/employmentview.component';
import { ChildrenviewComponent } from '../persons/personchildrens/childrenview/childrenview.component';
import { EmailviewComponent } from '../persons/personcommunicationemails/emailview/emailview.component';
import { LetterviewComponent } from '../persons/personcommunicationletters/letterview/letterview.component';
import { SmsviewComponent } from '../persons/personcommunicationsmses/smsview/smsview.component';
import { ActivityviewComponent } from '../persons/personactivities/activityview/activityview.component';
import { AttributevalueviewComponent } from '../persons/personattributevalues/attributevalueview/attributevalueview.component';
import { DocumentviewComponent } from '../persons/persondocuments/documentview/documentview.component';
import { EducationinstituteviewComponent } from '../persons/personeducationinstitutes/educationinstituteview/educationinstituteview.component';
import { EducationqualificationviewComponent } from '../persons/personeducationqualifications/educationqualificationview/educationqualificationview.component';

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
    NavigationComponent,

    LocationsearchfilterComponent,
    LocationComponent,
    LocationleveltypeComponent,

    NationalityComponent,
    EthnicComponent,
    MaritalstatusComponent,
    GenderComponent,
    ReligionComponent,
    LanguageComponent,
    FluencyComponent,
    CompetencyComponent,
    ActivityComponent,
    WorktypeComponent,
    ResidentialComponent,
    DomicileComponent,
    ImmigrationstatusComponent,
    SexComponent,
    SexualorientationComponent,
    ContacttypeComponent,
    EducationinstituteComponent,
    EducationattendancemodeComponent,
    PersoneducationinstituteComponent,
    PersoneducationqualificationComponent,
    AwardingbodyComponent,

    PersonComponent,
    PersontitleComponent,
    PersonemploymentComponent,
    PersonactivityComponent,
    PersonequalityComponent,
    PersonlanguageComponent,
    PersonreferenceComponent,
    PersonrelationshipComponent,
    PersoncontactComponent,
    PersoncontactaddressComponent,
    PersonattributevalueComponent,

    PersonreferencesComponent,
    PersonsocialmediasComponent,
    PersonsocialmediaactivitiesComponent,
    PersonprofessionalbodiessComponent,
    PersoneducationinstitutesComponent,
    PersoneducationqualificationsComponent,
    PersonequalitiesComponent,
    PersonlanguagesComponent,
    PersonidentitiesComponent,

    PersonactivitiesComponent,
    PersoncommunicationsmsesComponent,
    PersoncommunicationlettersComponent,
    PersoncommunicationemailsComponent,
    EmailviewComponent,
    LetterviewComponent,
    ActivityviewComponent,
    PersonchildrensComponent,
    ChildrenviewComponent,
    PersoneducationqualificationmodulesComponent,
    EducationqualificationmoduleviewComponent,
    AttributevalueviewComponent,
    PersonattributevaluesComponent,
    SmsviewComponent,
    EducationqualificationviewComponent,
    EducationinstituteviewComponent,
    PersondocumentsComponent,
    DocumentviewComponent,
    SocialmediaactivityviewComponent,
    EqualityviewComponent,
    EqualityviewComponent,
    LanguageviewComponent,
    IdentityviewComponent,
    PersonemploymentsComponent,
    EmploymentviewComponent,
    MembershipviewComponent,
    ProfessionalbodiesviewComponent,
    ReferenceviewComponent,
    PersontestimonialsComponent,
    PersonmembershipsComponent,
    TestimonialviewComponent,
  ]
})

export class HomeModule {

  constructor() { }

  ngOnInit(): void {
  }
}
