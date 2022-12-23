import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { setting } from 'src/app/setting';
import { redirectByHref } from '../../utilities/Shared_Funtions';
import { OnFailService } from '../../services/on-fail.service';

import { PersonComponent } from '../person/person.component';
import { ActivityComponent } from '../activity/activity.component';
import { PersonactivityService } from './personactivity.service';

@Component({
  selector: 'app-personactivity',
  templateUrl: './personactivity.component.html',
  styleUrls: ['./personactivity.component.css']
})
export class PersonactivityComponent implements OnInit {
  @ViewChild("activity") activity: ActivityComponent;
  @ViewChild("addactivity") addactivity: ActivityComponent;
  @ViewChild("editactivity") editactivity: ActivityComponent;

  @ViewChild("person") person: PersonComponent;
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson: PersonComponent;

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
  personactivityID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personactivitys = [];
  personactivitysAll = [];
  personactivity = {
    personactivity_ID: 0,
    activity_ID: {
      id:null
    },
    personactivity_WEBLINK: null,
    person_ID: null,
    person_DETAIL:"",
    isactive: true
  }

  constructor(
    private personactivityservice: PersonactivityService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }


  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personactivitys = JSON.parse(window.sessionStorage.getItem('personactivitys'));
    this.personactivitysAll = JSON.parse(window.sessionStorage.getItem('personactivitysAll'));
    if (this.view == 1 && this.personactivitys == null) {
      this.personactivityAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personactivitysAll == null) {
      this.personactivityAdvancedSearchAll(this.personID);
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
          onClick: this.personactivityAdvancedSearchAll.bind(this, this.personID),
        },
      }
    );
  }

  editView() {
    this.disabled = false;
  }

  cancelView() {
    this.cancel.next();
  }

  add() {
    this.personactivity = {
      personactivity_ID: 0,
      activity_ID: null,
      personactivity_WEBLINK: null,
      person_ID: null,
      person_DETAIL:"",
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersonactivity(response) {
    if (response.person_ID != null)
    this.personactivity.person_ID = response.person_ID;

    if (response.activity_ID != null)
    this.personactivity.activity_ID = response.activity_ID.id;

    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personactivity = response;
    this.disabled = true;
  }

  setPersonactivitys(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
    }
    if (this.view == 1) {
      this.personactivitys = response;
      window.sessionStorage.setItem("personactivitys", JSON.stringify(this.personactivitys));
    } else {
      this.personactivitysAll = response;
      window.sessionStorage.setItem("personactivitysAll", JSON.stringify(this.personactivitysAll));
    }
    this.cancel.next();
  }

  personactivityGet() {
    this.personactivityservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonactivity(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityGetAll() {
    this.personactivityservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonactivity(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityGetOne(id) {
    this.personactivityservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonactivity(this.personactivityservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityAdd(personactivity) {
    personactivity.activity_ID = this.addactivity.activityID;
   personactivity.person_ID =this.addperson.personID;

    this.personactivityservice.add(personactivity).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personactivity_ID) {
          this.toastrservice.success("Success", "New Contact Added");
          this.personactivityAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityUpdate(personactivity) {
    personactivity.activity_ID = this.editactivity.activityID;
   personactivity.person_ID =this.editperson.personID;

    if (personactivity.isactive == true) {
      personactivity.isactive = "Y";
    } else {
      personactivity.isactive = "N";
    }
    this.personactivityservice.update(personactivity, personactivity.personactivity_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personactivity_ID) {
          this.toastrservice.success("Success", "Contact Updated");
          this.personactivityAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivitySearch(str) {
    var search = {
      search: str
    }
    this.personactivityservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonactivitys(this.personactivityservice.getAllDetail(response));
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
    this.personactivityservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonactivitys(this.personactivityservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personactivityservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonactivitys(this.personactivityservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personactivityservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonactivitys(this.personactivityservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
