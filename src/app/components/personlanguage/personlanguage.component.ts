import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';

import { MaritalstatusComponent } from '../maritalstatus/maritalstatus.component';
import { FluencyComponent } from '../fluency/fluency.component';

import { CompetencyComponent } from '../competency/competency.component';
import { PersonComponent } from '../person/person.component';
import { LanguageComponent } from '../language/language.component';
import { PersonlanguageService } from './personlanguage.service';
import { redirectByHref } from 'src/app/utilities/Shared_Funtions';
import { setting } from 'src/app/setting';

@Component({
  selector: 'app-personlanguage',
  templateUrl: './personlanguage.component.html',
  styleUrls: ['./personlanguage.component.css']
})
export class PersonlanguageComponent implements OnInit {
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson: PersonComponent;

  @ViewChild("addlanguage") addlanguage: LanguageComponent;
  @ViewChild("editlanguage") editlanguage: LanguageComponent;

  @ViewChild("addcompetency") addcompetency: CompetencyComponent;
  @ViewChild("editcompetency") editcompetency: CompetencyComponent;

  @ViewChild("addfluency") addfluency: FluencyComponent;
  @ViewChild("editfluency") editfluency: FluencyComponent;

  

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
  personlanguageID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personlanguages = [];
  personlanguagesAll = [];
  personlanguage = {
    personlanguage_ID: 0,
    person_ID: null,
    person_DETAIL:"",
    language_ID: {
      id: null
    },
    fluency_ID: {
      id: null
    },
    competency_ID: {
      id: null
    },
    
    comments: "",
    isactive: true
  }

  constructor(
    private personlanguageservice: PersonlanguageService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personlanguages = JSON.parse(window.sessionStorage.getItem('personlanguages'));
    this.personlanguagesAll = JSON.parse(window.sessionStorage.getItem('personlanguagesAll'));
    if (this.view == 1 && this.personlanguages == null) {
      this.personlanguageAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personlanguagesAll == null) {
      this.personlanguageAdvancedSearchAll(this.personID);
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
          onClick: this.personlanguageAdvancedSearchAll.bind(this, this.personID),
        },
      }
    );
  }

  add() {
    this.personlanguage = {
    personlanguage_ID: 0,
    person_ID: null,
    person_DETAIL:"",
    language_ID: null,
    fluency_ID: null,
    competency_ID:null,
    comments: "",
    isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersonlanguage(response) {
    if (response.person_ID != null)
    this.personlanguage.person_ID = response.person_ID;

    if (response.language_ID != null)
    this.personlanguage.language_ID = response.language_ID.id;

    if (response.fluency_ID != null)
    this.personlanguage.fluency_ID = response.fluency_ID.id;
    
    if (response.competency_ID != null)
    this.personlanguage.competency_ID = response.competency_ID.id;

    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personlanguage = response;
    this.disabled = true;
  }

  setPersonlanguages(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
    }
    if (this.view == 1) {
      this.personlanguages = response;
      window.sessionStorage.setItem("personlanguages", JSON.stringify(this.personlanguages));
    } else {
      this.personlanguagesAll = response;
      window.sessionStorage.setItem("personlanguagesAll", JSON.stringify(this.personlanguagesAll));
    }
    this.cancel.next();
  }

  personlanguageGet() {
    this.personlanguageservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonlanguage(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personlanguageGetAll() {
    this.personlanguageservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonlanguage(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personlanguageGetOne(id) {
    this.personlanguageservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonlanguage(this.personlanguageservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  personlanguageAdd(personlanguage) {
    personlanguage.language_ID = this.addlanguage.languageID;
    personlanguage.fluency_ID = this.addfluency.fluencyID;
    personlanguage.person_ID = this.addperson.personID;
    personlanguage.competency_ID=this.addcompetency.competencyID;

    this.personlanguageservice.add(personlanguage).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personlanguage_ID) {
          this.toastrservice.success("Success", "New Personlanguages Added");
          this.personlanguageAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personlanguageUpdate(personlanguage) {
    personlanguage.language_ID = this.editlanguage.languageID;
    personlanguage.fluency_ID = this.editfluency.fluencyID;
    personlanguage.person_ID = this.editperson.personID;
    personlanguage.competency_ID=this.editcompetency.competencyID;

    if (personlanguage.isactive == true) {
      personlanguage.isactive = "Y";
    } else {
      personlanguage.isactive = "N";
    }
    this.personlanguageservice.update(personlanguage, personlanguage.personlanguage_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personlanguage_ID) {
          this.toastrservice.success("Success", " Personlanguages Updated");
          this.personlanguageAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  personlanguageSearch(str) {
    var search = {
      search: str
    }
    this.personlanguageservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonlanguages(this.personlanguageservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personlanguageSearchAll(str) {
    var search = {
      search: str
    }
    this.personlanguageservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonlanguages(this.personlanguageservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personlanguageAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personlanguageservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonlanguages(this.personlanguageservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personlanguageAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personlanguageservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonlanguages(this.personlanguageservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
