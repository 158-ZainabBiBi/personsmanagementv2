import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';


import { PersonactivityService } from './personactivity.service';
import { PersonComponent } from '../person/person.component';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-personactivity',
  templateUrl: './personactivity.component.html',
  styleUrls: ['./personactivity.component.css']
})
export class PersonactivityComponent implements OnInit {
  @ViewChild("activity") activity: ActivityComponent;
  @ViewChild("addactivity") addactivity: ActivityComponent;
  @ViewChild("editactivity") editactivity: ActivityComponent;
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
  personactivityID = null;


  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();
  

  
  personactivities = [];
  personactivitiesAll = [];
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
    private personactivityService: PersonactivityService,
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.personactivities = JSON.parse(window.sessionStorage.getItem('personactivities'));
    this.personactivitiesAll = JSON.parse(window.sessionStorage.getItem('personactivitiesAll'));
    if (this.view == 1 && this.personactivities == null) {
      this.personactivityGet();
    } else if (this. view == 2 && this.personactivitiesAll == null) {
      this.personactivityGetAll();
    }

    if (!this.personactivityID && Number(window.sessionStorage.getItem('personactivity'))>0) {
      this.personactivityID = Number(window.sessionStorage.getItem('personactivity'));
    }
    if (this.personactivityID) {
      window.sessionStorage.setItem("personactivity", this.personactivityID);
    }
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        personactivity: 'after',
        widget: 'dxButton',
        options: {
          width: 136,
          text: 'Refresh',
          onClick: this.personactivityGetAll.bind(this),
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



 
  setPersonactivities(response) {
    if (this.view == 1) {
      this.personactivities = response;
      window.sessionStorage.setItem("personactivities", JSON.stringify(this.personactivities));
    } else {
      this.personactivitiesAll = response;
      window.sessionStorage.setItem("personactivitiesAll", JSON.stringify(this.personactivitiesAll));
    }
    this.cancel.next();
  }
  
  setPersonactivity(response) {
    this.personactivity = response;
    if (response.person_ID != null)
      this.personactivity.person_ID = response.person_ID;

    if (response.activity_ID != null)
      this.personactivity.activity_ID = response.activity_ID.id;


    if (response.isactive == "Y") {
      this.personactivity.isactive = true;
    } else {
      this.personactivity.isactive = false;
    }
  }

  personactivityGet() {
    this.personactivityService.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          response = this.personactivityService.getAllDetail(response);
          this.setPersonactivities(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityGetAll() {
    this.personactivityService.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          response = this.personactivityService.getAllDetail(response);
          this.setPersonactivities(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityGetOne(id) {
    this.personactivityService.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          response = this.personactivityService.getDetail(response);
          this.personactivity = response;
          this.disabled = true;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

 

  personactivityAdd(personactivity) {
    personactivity.activity_ID = this.addactivity.activityID;
   personactivity.person_ID =this.addperson.personID;
    this.personactivityService.add(personactivity).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personactivity_ID) {
          this.toastrservice.success("Success", "New personactivity Added");
          this.personactivityGetAll();
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
    console.log(personactivity);
    if (personactivity.isactive == true) {
      personactivity.isactive = "Y";
    } else {
      personactivity.isactive = "N";
    }
    this.personactivityService.update(personactivity, personactivity.personactivity_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personactivity_ID) {
          this.toastrservice.success("Success", " personactivity Updated");
          this.personactivityGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

 

}
