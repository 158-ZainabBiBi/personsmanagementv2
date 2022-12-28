import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';

import { PersoneducationinstituteComponent } from '../personeducationinstitute/personeducationinstitute.component';
import { PersonqualificationcountryComponent } from '../personqualificationcountry/personqualificationcountry.component';
import { AwardingbodyComponent } from '../awardingbody/awardingbody.component';
import { QualifcationComponent } from '../qualifcation/qualifcation.component';
import { PersoneducationqualificationService } from './personeducationqualification.service';
@Component({
  selector: 'app-personeducationqualification',
  templateUrl: './personeducationqualification.component.html',
  styleUrls: ['./personeducationqualification.component.css']
})
export class PersoneducationqualificationComponent implements OnInit {
  @ViewChild("addpersoneducationinstitute") addpersoneducationinstitute: PersoneducationinstituteComponent;
  @ViewChild("editpersoneducationinstitute") editpersoneducationinstitute: PersoneducationinstituteComponent;

  @ViewChild("addpersonqualificationcountry") addpersonqualificationcountry: PersonqualificationcountryComponent;
  @ViewChild("editpersonqualificationcountry") editpersonqualificationcountry: PersonqualificationcountryComponent;

  @ViewChild("addqualifcation") addqualifcation: QualifcationComponent;
  @ViewChild("editqualifcation") editqualifcation: QualifcationComponent;

  @ViewChild("addawardingbody") addawardingbody: AwardingbodyComponent;
  @ViewChild("editawardingbody") editawardingbody: AwardingbodyComponent;

  @Input()
  view: number = 1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  personqualificationID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personeducationqualifications = [];
  personeducationqualificationsAll = [];
  personeducationqualification = {
    personqualification_ID: 0,
    personqualification_DATE: "",
    qualifcation_DESC: "",
    personqualification_RESULT: "",
    qualifcation_LEVEL: null,
    personinstitute_ID: null,
    personinstitute_DETAIL:"",
    qualifcation_ID: {
      id: null
    },
    personqualificationcountry_ID: {
      id: null
    },
    awardingbody_ID: {
      id: null
    },
    isactive: true
  }

  constructor(
    private personeducationqualificationservice: PersoneducationqualificationService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.personeducationqualifications = JSON.parse(window.sessionStorage.getItem('personeducationqualifications'));
    this.personeducationqualificationsAll = JSON.parse(window.sessionStorage.getItem('personeducationqualificationsAll'));
    if (this.view == 1 && this.personeducationqualifications == null) {
      this.personeducationqualificationGet();
    } else if (this.view == 2 && this.personeducationqualificationsAll == null) {
      this.personeducationqualificationGetAll();
    }

    if (!this.personqualificationID && Number(window.sessionStorage.getItem('personeducationqualification'))>0) {
      this.personqualificationID = Number(window.sessionStorage.getItem('personeducationqualification'));
    }
    if (this.personqualificationID) {
      window.sessionStorage.setItem("personeducationqualification", this.personqualificationID);
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
          onClick: this.personeducationqualificationGetAll.bind(this),
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
    this.personeducationqualification = {
      personqualification_ID: 0,
      personqualification_DATE: "",
      qualifcation_DESC: "",
      personqualification_RESULT: "",
      qualifcation_LEVEL: null,
      qualifcation_ID: null,
      personqualificationcountry_ID: null,
      personinstitute_ID: null,
      personinstitute_DETAIL:"",
      awardingbody_ID: null,
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setpersoneducationqualification(response) {
    if (this.view == 1) {
      this.personeducationqualifications = response;
      window.sessionStorage.setItem("personeducationqualifications", JSON.stringify(this.personeducationqualifications));
    } else {
      this.personeducationqualificationsAll = response;
      window.sessionStorage.setItem("personeducationqualificationsAll", JSON.stringify(this.personeducationqualificationsAll));
    }
    this.cancel.next();
  }

  personeducationqualificationGet() {
    this.personeducationqualificationservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setpersoneducationqualification(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationqualificationGetAll() {
    this.personeducationqualificationservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setpersoneducationqualification(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationqualificationAdd(personeducationqualification) {
    personeducationqualification.personinstitute_ID = this.addpersoneducationinstitute.personinstituteID;
    personeducationqualification.awardingbody_ID = this.addawardingbody.awardingbodyID;
    personeducationqualification.qualifcation_ID = this.addqualifcation.qualifcationID;
    personeducationqualification.personqualificationcountry_ID = this.addpersonqualificationcountry.personqualificationcountryID;
    this.personeducationqualificationservice.add(personeducationqualification).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personqualification_ID) {
          this.toastrservice.success("Success", "New Personeducationqualifications Added");
          this.personeducationqualificationGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personeducationqualificationUpdate(personeducationqualification) {
    personeducationqualification.personinstitute_ID = this.editpersoneducationinstitute.personinstituteID;
    personeducationqualification.awardingbody_ID = this.editawardingbody.awardingbodyID;
    personeducationqualification.qualifcation_ID = this.editqualifcation.qualifcationID;
    personeducationqualification.personqualificationcountry_ID = this.editpersonqualificationcountry.personqualificationcountryID;
    if (personeducationqualification.isactive == true) {
      personeducationqualification.isactive = "Y";
    } else {
      personeducationqualification.isactive = "N";
    }
    this.personeducationqualificationservice.update(personeducationqualification, personeducationqualification.personqualification_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personqualification_ID) {
          this.toastrservice.success("Success", " Personeducationqualifications Updated");
          this.personeducationqualificationGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
