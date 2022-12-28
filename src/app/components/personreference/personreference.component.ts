import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { setting } from 'src/app/setting';
import { redirectByHref } from 'src/app/utilities/Shared_Funtions';
import { OnFailService } from '../../services/on-fail.service';

import { PersonComponent } from '../person/person.component';
//import { ReferencecountryComponent } from '../referencecountry/referencecountry.component';
import { PersonreferenceService } from './personreference.service';
@Component({
  selector: 'app-personreference',
  templateUrl: './personreference.component.html',
  styleUrls: ['./personreference.component.css']
})
export class PersonreferenceComponent implements OnInit {
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson: PersonComponent;

  //@ViewChild("addreferencecountry") addreferencecountry: ReferencecountryComponent;
  //@ViewChild("editreferencecountry") editreferencecountry: ReferencecountryComponent;

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
  personreferenceID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personreferences = [];
  personreferencesAll = [];
  personreference = {
    personreference_ID: 0,
    iscontact: true,
    iskininfo: true,
    person_ID: null,
    person_DETAIL:"",
    referenceperson_ID:null,
    referenceperson_DETAIL:"",
    personrelationship_ID: {
      id: null
    },
    isactive: true
  }

  constructor(
    private personreferenceservice: PersonreferenceService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
     if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personreferences = JSON.parse(window.sessionStorage.getItem('personreferences'));
    this.personreferencesAll = JSON.parse(window.sessionStorage.getItem('personreferencesAll'));
    if (this.view == 1 && this.personreferences == null) {
      this.personreferenceAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personreferencesAll == null) {
      this.personreferenceAdvancedSearchAll(this.personID);
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
          onClick: this.personreferenceAdvancedSearchAll.bind(this, this.personID),
        },
      }
    );
  }

  add() {
    this.personreference = {
      personreference_ID: 0,
      iscontact: true,
      iskininfo: true,
      person_ID: null,
      person_DETAIL:"",
      referenceperson_ID:null,
      referenceperson_DETAIL:"",
      personrelationship_ID: {
        id: null
      },
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersonreference(response) {
    if (response.person_ID != null)
    this.personreference.person_ID = response.person_ID;

    if (response.referenceperson_ID != null)
    this.personreference.referenceperson_ID = response.referenceperson_ID;
    
    if (response.personrelationship_ID != null)
    this.personreference.personrelationship_ID = response.personrelationship_ID.id;

    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personreference = response;
    this.disabled = true;
  }

  setPersonreferences(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
    }
    if (this.view == 1) {
      this.personreferences = response;
      window.sessionStorage.setItem("personreferences", JSON.stringify(this.personreferences));
    } else {
      this.personreferencesAll = response;
      window.sessionStorage.setItem("personreferencesAll", JSON.stringify(this.personreferencesAll));
    }
    this.cancel.next();
  }

  personreferenceGet() {
    this.personreferenceservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonreference(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personreferenceGetAll() {
    this.personreferenceservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonreference(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personreferenceGetOne(id) {
    this.personreferenceservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonreference(this.personreferenceservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }


  personreferenceAdd(personreference) {
  //  personreference.referencecountry_ID = this.addreferencecountry.referencecountryID;
    personreference.person_ID = this.addperson.personID;
    this.personreferenceservice.add(personreference).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personreference_ID) {
          this.toastrservice.success("Success", "New Personreferences Added");
          this.personreferenceGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personreferenceUpdate(personreference) {
  //  personreference.referencecountry_ID = this.editreferencecountry.referencecountryID;
    personreference.person_ID = this.editperson.personID;
    if (personreference.isactive == true) {
      personreference.isactive = "Y";
    } else {
      personreference.isactive = "N";
    }
    this.personreferenceservice.update(personreference, personreference.personreference_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personreference_ID) {
          this.toastrservice.success("Success", " Personreferences Updated");
          this.personreferenceGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  personactivitySearchAll(str) {
    var search = {
      search: str
    }
    this.personreferenceservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonreferences(this.personreferenceservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personreferenceAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personreferenceservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonreferences(this.personreferenceservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personreferenceAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personreferenceservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonreferences(this.personreferenceservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
