import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';

import { MaritalstatusComponent } from '../maritalstatus/maritalstatus.component';
import { NationalityComponent } from '../nationality/nationality.component';
import { ReligionComponent } from '../religion/religion.component';
import { GenderComponent } from '../gender/gender.component';
import { PersonComponent } from '../person/person.component';
import { EthnicComponent } from '../ethnic/ethnic.component';
 import { PersonequalityService } from './personequality.service';
import { DomicileComponent } from '../domicile/domicile.component';
import { SexComponent } from '../sex/sex.component';
import { redirectByHref } from 'src/app/utilities/Shared_Funtions';
import { setting } from 'src/app/setting';
import { ResidentialComponent } from '../residential/residential.component';
import { DisabilityComponent } from '../disability/disability.component';
import { ImmigrationstatusComponent } from '../immigrationstatus/immigrationstatus.component';
import { SexualorientationComponent } from '../sexualorientation/sexualorientation.component';
@Component({
  selector: 'app-personequality',
  templateUrl: './personequality.component.html',
  styleUrls: ['./personequality.component.css']
})
export class PersonequalityComponent implements OnInit {
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson: PersonComponent;

  @ViewChild("addethnic") addethnic: EthnicComponent;
  @ViewChild("editethnic") editethnic: EthnicComponent;

  @ViewChild("addgender") addgender: GenderComponent;
  @ViewChild("editgender") editgender: GenderComponent;

  @ViewChild("addnationality") addnationality: NationalityComponent;
  @ViewChild("editnationality") editnationality: NationalityComponent;

  @ViewChild("addreligion") addreligion: ReligionComponent;
  @ViewChild("editreligion") editreligion: ReligionComponent;

  @ViewChild("addmaritalstatus") addmaritalstatus: MaritalstatusComponent;
  @ViewChild("editmaritalstatus") editmaritalstatus: MaritalstatusComponent;

  @ViewChild("adddomicile") adddomicile: DomicileComponent;
  @ViewChild("editdomicile") editdomicile: DomicileComponent;

  @ViewChild("addresidential") addresidential: ResidentialComponent;
  @ViewChild("editresidential") editresidential: ResidentialComponent;

  @ViewChild("addsex") addsex: SexComponent;
  @ViewChild("editsex") editsex: SexComponent;

  @ViewChild("adddisable") adddisable: DisabilityComponent;
  @ViewChild("editdisable") editdisable: DisabilityComponent;

  
  @ViewChild("addimmigrationstatus") addimmigrationstatus: ImmigrationstatusComponent;
  @ViewChild("editimmigrationstatus") editimmigrationstatus: ImmigrationstatusComponent;
  
  @ViewChild("addsexualorientation") addsexualorientation: SexualorientationComponent;
  @ViewChild("editsexualorientation") editsexualorientation: SexualorientationComponent;
  
  @Input()
  view: number = 1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  personID = null;
  @Input()
  personequalityID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personequalities = [];
  personequalitiesAll = [];
  personequality = {
    personequality_ID: 0,

    disable_ID: {
      id: null
    },
  
    immigrationstatus_ID:{
      id:null
    },
    
    sexualorientation_ID: {
      id: null
    },
    armedforcesindicator_ID: {
      id: null
    },
    lookedafterchildindicator_ID: {
      id: null
    },

    date_OF_UK_ENTRY: null,
    convictiondetails: null,

    issmoker: true,
    iscriminalconviction: true,

    person_ID: null,
    person_DETAIL:"",
    ethnic_ID: {
      id: null
    },
    gender_ID: {
      id: null
    },
    nationality_ID: null,
    nationality_DETAIL:"",
     
    religion_ID:null,
    sex_DESC:"",
    sexualorientation_DESC:"",
    sex_ID: {
      id: null
    },
    residential_ID:null,
    residential_DETAIL:"",
    domicile_ID:null,
    domicile_DETAIL:"",
    maritalstatus_ID: {
      id: null
    },
  
    isactive: true
  }

  constructor(
    private personequalityservice: PersonequalityService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personequalities = JSON.parse(window.sessionStorage.getItem('personequalities'));
    this.personequalitiesAll = JSON.parse(window.sessionStorage.getItem('personequalitiesAll'));
    if (this.view == 1 && this.personequalities == null) {
      this.personequalityAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personequalitiesAll == null) {
      this.personequalityAdvancedSearchAll(this.personID);
    }
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          width: 136,
          text: 'Refresh',
          onClick: this.personequalityAdvancedSearchAll.bind(this),
        },
      }
    );
  }
  editView() {
    this.disabled = false;
  }

  cancelView() {
  }
  add() {
    this.personequality = {
      personequality_ID: 0,

    disable_ID: {
      id: null
    },
  
    immigrationstatus_ID:{
      id:null
    },
    
    sexualorientation_ID: {
      id: null
    },
    armedforcesindicator_ID: {
      id: null
    },
    lookedafterchildindicator_ID: {
      id: null
    },

    date_OF_UK_ENTRY: null,
    convictiondetails: null,

    issmoker: true,
    iscriminalconviction: true,

    person_ID: null,
    person_DETAIL:"",
    ethnic_ID: {
      id: null
    },
    gender_ID: {
      id: null
    },
    nationality_ID: null,
    nationality_DETAIL:"",
     
    religion_ID:{
      id:null
    },
    sex_DESC:"",
    sexualorientation_DESC:"",
    sex_ID: {
      id: null
    },
    residential_ID:null,
    residential_DETAIL:"",
    domicile_ID:null,
    domicile_DETAIL:"",
    maritalstatus_ID: {
      id: null
    },
  
    isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersonequality(response) {
    if (response.person_ID != null)
    this.personequality.person_ID = response.person_ID;
    if (response.nationality_ID != null)
    this.personequality.nationality_ID = response.nationality_ID;
    if (response.residential_ID != null)
    this.personequality.residential_ID = response.residential_ID;
    if (response.domicile_ID != null)
    this.personequality.domicile_ID = response.domicile_ID;

    if (response.disable_ID != null)
    this.personequality.disable_ID = response.disable_ID.id;
    if (response.immigrationstatus_ID != null)
    this.personequality.immigrationstatus_ID = response.immigrationstatus_ID.id;
    if (response.sexualorientation_ID != null)
    this.personequality.sexualorientation_ID = response.sexualorientation_ID.id;
    if (response.armedforcesindicator_ID != null)
    this.personequality.armedforcesindicator_ID = response.armedforcesindicator_ID.id;
    if (response.lookedafterchildindicator_ID != null)
    this.personequality.lookedafterchildindicator_ID = response.lookedafterchildindicator_ID.id;

    if (response.ethnic_ID != null)
    this.personequality.ethnic_ID = response.ethnic_ID.id;
    if (response.gender_ID != null)
    this.personequality.gender_ID = response.gender_ID.id;
    if (response.sex_ID != null)
    this.personequality.sex_ID = response.sex_ID.id;
    if (response.maritalstatus_ID != null)
    this.personequality.maritalstatus_ID = response.maritalstatus_ID.id;

    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personequality = response;
    this.disabled = true;
  }

  setPersonequalities(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
    }
    if (this.view == 1) {
      this.personequalities = response;
      window.sessionStorage.setItem("personequalities", JSON.stringify(this.personequalities));
    } else {
      this.personequalitiesAll = response;
      window.sessionStorage.setItem("personequalitiesAll", JSON.stringify(this.personequalitiesAll));
    }
    this.cancel.next();
  }

  personequalityGet() {
    this.personequalityservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonequality(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personequalityGetAll() {
    this.personequalityservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonequality(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personequalityGetOne(id) {
    this.personequalityservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonequality(this.personequalityservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personequalityAdd(personequality) {
    personequality.person_ID = this.addperson.personID;
    personequality.nationality_ID = this.addnationality.nationalityID;
    personequality.residential_ID = this.addresidential.residentialID;

    personequality.ethnic_ID = this.addethnic.ethnicID;
    personequality.domicile_ID = this.adddomicile.domicileID;
    personequality.maritalstatus_ID = this.addmaritalstatus.maritalstatusID;
    personequality.religion_ID = this.addreligion.religionID;
    personequality.sexualorientation_ID = this.addsexualorientation.sexualorientationID;
    personequality.immigrationstatus_ID = this.addimmigrationstatus.immigrationstatusID;
    personequality.disable_ID = this.adddisable.disabilityID;
   
    personequality.sex_ID = this.addsex.sexID;
   
    personequality.gender_ID=this.addgender.genderID;

    this.personequalityservice.add(personequality).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personequality_ID) {
          this.toastrservice.success("Success", "New personequalities Added");
          this.personequalityAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personequalityUpdate(personequality) {
    personequality.person_ID = this.editperson.personID;
    personequality.nationality_ID = this.editnationality.nationalityID;
    personequality.residential_ID = this.editresidential.residentialID;

    personequality.ethnic_ID = this.editethnic.ethnicID;
    personequality.domicile_ID = this.editdomicile.domicileID;
    personequality.maritalstatus_ID = this.editmaritalstatus.maritalstatusID;
    personequality.religion_ID = this.editreligion.religionID;
    personequality.sexualorientation_ID = this.editsexualorientation.sexualorientationID;
    personequality.immigrationstatus_ID = this.editimmigrationstatus.immigrationstatusID;
    personequality.disable_ID = this.adddisable.disabilityID;

    if (personequality.isactive == true) {
      personequality.isactive = "Y";
    } else {
      personequality.isactive = "N";
    }
    this.personequalityservice.update(personequality, personequality.personequality_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personequality_ID) {
          this.toastrservice.success("Success", " personequalities Updated");
          this.personequalityAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  personequalitySearch(str) {
    var search = {
      search: str
    }
    this.personequalityservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonequalities(this.personequalityservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personequalitySearchAll(str) {
    var search = {
      search: str
    }
    this.personequalityservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonequalities(this.personequalityservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personequalityAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personequalityservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonequalities(this.personequalityservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personequalityAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personequalityservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonequalities(this.personequalityservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
