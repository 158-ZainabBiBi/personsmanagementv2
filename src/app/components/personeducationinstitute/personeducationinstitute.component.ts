import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { setting } from 'src/app/setting';
import { redirectByHref } from 'src/app/utilities/Shared_Funtions';
import { OnFailService } from '../../services/on-fail.service';

import { EducationattendancemodeComponent } from '../educationattendancemode/educationattendancemode.component';
import { EducationinstituteComponent } from '../educationinstitute/educationinstitute.component';
import { PersonComponent } from '../person/person.component';
import { PersoneducationinstituteService } from './personeducationinstitute.service';
@Component({
  selector: 'app-personeducationinstitute',
  templateUrl: './personeducationinstitute.component.html',
  styleUrls: ['./personeducationinstitute.component.css']
})
export class PersoneducationinstituteComponent implements OnInit {
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson:PersonComponent;
  @ViewChild("addeducationinstitute") addeducationinstitute:EducationinstituteComponent;
  @ViewChild("editeducationinstitute") editeducationinstitute:EducationinstituteComponent;
  @ViewChild("addeducationattendancemode") addeducationattendancemode:EducationattendancemodeComponent;
  @ViewChild("editeducationattendancemode") editeducationattendancemode:EducationattendancemodeComponent;
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
  personinstituteID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personeducationinstitutes = [];
  personeducationinstitutesAll = [];
  personeducationinstitute = {
    personinstitute_ID: 0,
    personinstitute_ENDDATE: "",
    personinstitute_STARTDATE: "",
    educationinstitute_DESC: "",
    educationinstitute_ID:{
      id:null
    },
    educationattendancemode_ID: {
      id:null
    },
    person_ID: null,
    person_DETAIL:"",
    recievedqualification: true,
    isactive: true
  }

  constructor(
    private personeducationinstituteservice: PersoneducationinstituteService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personeducationinstitutes = JSON.parse(window.sessionStorage.getItem('personeducationinstitutes'));
    this.personeducationinstitutesAll = JSON.parse(window.sessionStorage.getItem('personeducationinstitutesAll'));
    if (this.view == 1 && this.personeducationinstitutes == null) {
      this.personeducationinstituteAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personeducationinstitutesAll == null) {
      this.personeducationinstituteAdvancedSearchAll(this.personID);
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
          onClick: this.personeducationinstituteAdvancedSearchAll.bind(this, this.personID),
        },
      }
    );
  }

  add() {
    this.personeducationinstitute = {
      personinstitute_ID: 0,
      personinstitute_ENDDATE: "",
      personinstitute_STARTDATE: "",
      educationinstitute_DESC: "",
      educationinstitute_ID: {id:null},
      educationattendancemode_ID: {id:null},
      person_ID: null,
      person_DETAIL:"",
      recievedqualification: true,
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }
  editView() {
    this.disabled = false;
  }

  cancelView() {
  }
  setPersoneducationinstitute(response) {
    if (response.person_ID != null)
    this.personeducationinstitute.person_ID = response.person_ID;

    if (response.educationinstitute_ID != null)
    this.personeducationinstitute.educationinstitute_ID = response.educationinstitute_ID.id;

    if (response.educationattendancemode_ID != null)
    this.personeducationinstitute.educationattendancemode_ID = response.person_ID;

    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personeducationinstitute = response;
    this.disabled = true;
  }

  setPersoneducationinstitutes(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
    }
    if (this.view == 1) {
      this.personeducationinstitutes = response;
      window.sessionStorage.setItem("personeducationinstitutes", JSON.stringify(this.personeducationinstitutes));
    } else {
      this.personeducationinstitutesAll = response;
      window.sessionStorage.setItem("personeducationinstitutesAll", JSON.stringify(this.personeducationinstitutesAll));
    }
    this.cancel.next();
  }

  personactivityGet() {
    this.personeducationinstituteservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoneducationinstitute(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityGetAll() {
    this.personeducationinstituteservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoneducationinstitute(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personactivityGetOne(id) {
    this.personeducationinstituteservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoneducationinstitute(this.personeducationinstituteservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationinstituteAdd(personeducationinstitute) {
    personeducationinstitute.person_ID =this.addperson.personID;
    personeducationinstitute.educationinstitute_ID = this.addeducationinstitute.educationinstituteID;
    personeducationinstitute.educationattendancemode_ID = this.addeducationattendancemode.educationattendancemodeID;
    this.personeducationinstituteservice.add(personeducationinstitute).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personinstitute_ID) {
          this.toastrservice.success("Success", "New Contact Added");
          this.personeducationinstituteAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationinstituteUpdate(personeducationinstitute) {
    personeducationinstitute.person_ID =this.addperson.personID;
    personeducationinstitute.educationinstitute_ID = this.addeducationinstitute.educationinstituteID;
    personeducationinstitute.educationattendancemode_ID = this.addeducationattendancemode.educationattendancemodeID;

    if (personeducationinstitute.isactive == true) {
      personeducationinstitute.isactive = "Y";
    } else {
      personeducationinstitute.isactive = "N";
    }
    this.personeducationinstituteservice.update(personeducationinstitute, personeducationinstitute.personinstitute_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personinstitute_ID) {
          this.toastrservice.success("Success", "Contact Updated");
          this.personeducationinstituteAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationinstituteSearch(str) {
    var search = {
      search: str
    }
    this.personeducationinstituteservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoneducationinstitutes(this.personeducationinstituteservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationinstituteSearchAll(str) {
    var search = {
      search: str
    }
    this.personeducationinstituteservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoneducationinstitutes(this.personeducationinstituteservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationinstituteAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personeducationinstituteservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoneducationinstitutes(this.personeducationinstituteservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationinstituteAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personeducationinstituteservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoneducationinstitutes(this.personeducationinstituteservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
