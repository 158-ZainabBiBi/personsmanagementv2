import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';
import { redirectByHref } from 'src/app/utilities/Shared_Funtions';
import { setting } from 'src/app/setting';

import { PersoncommunicationsmsService } from './personcommunicationsms.service';
import { PersoncontactComponent } from '../personcontact/personcontact.component';

@Component({
  selector: 'app-personcommunicationsms',
  templateUrl: './personcommunicationsms.component.html',
  styleUrls: ['./personcommunicationsms.component.css']
})
export class PersoncommunicationsmsComponent implements OnInit {
  @ViewChild("personcontact") person: PersoncontactComponent;
  @ViewChild("addpersoncontact") addperson: PersoncontactComponent;
  @ViewChild("editpersoncontact") editperson: PersoncontactComponent;

  @Input()
  view: number = 1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  personcommunicationsmsID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();
  
  personcommunicationsmss = [];
  personcommunicationsmssAll = [];
  personcommunicationsms = {
    personsms_ID: 0,
    personcontact_ID: null,
    sms_DATETIME: "",
    sms_CONTENT: "",
    isactive: true,
  
  }
 
  constructor(
    private personcommunicationsmsservice: PersoncommunicationsmsService,
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.personcommunicationsmss = JSON.parse(window.sessionStorage.getItem('personcommunicationsmss'));
    this.personcommunicationsmssAll = JSON.parse(window.sessionStorage.getItem('personcommunicationsmssAll'));
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          width: 136,
          text: 'Refresh',
          onClick: this.personcommunicationsmsGetAll.bind(this),
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
    this.personcommunicationsms = {
      personsms_ID: 0,
    personcontact_ID: null,
    sms_DATETIME: "",
    sms_CONTENT: "",
    isactive: true,
      
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersoncommunicationsms(response) {
    this.personcommunicationsms = response;
    if (response.personcontact_ID != null)
      this.personcommunicationsms.personcontact_ID = response.personcontact_ID;

    if (response.isactive == "Y") {
      this.personcommunicationsms.isactive = true;
    } else {
      this.personcommunicationsms.isactive = false;
    }
  }

  setPersoncommunicationsmss(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
    }
      
    if (this.view == 1) {
      this.personcommunicationsmss = response;
      window.sessionStorage.setItem("personcommunicationsmss", JSON.stringify(this.personcommunicationsmss));
    } else {
      this.personcommunicationsmssAll = response;
      window.sessionStorage.setItem("personcommunicationsmssAll", JSON.stringify(this.personcommunicationsmssAll));
    }
    this.cancel.next();
  }

  personcommunicationsmsGet() {
    this.personcommunicationsmsservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationsms(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
}

personcommunicationsmsGetAll() {
  this.personcommunicationsmsservice.getAll().subscribe(response => {
    if (response) {
      if (response.error && response.status) {
        this.toastrservice.warning("Message", " " + response.message);
      } else{
        this.setPersoncommunicationsms(response);
      }
    }
  }, error => {
    this.onfailservice.onFail(error);
  })
}
  personactivityGetOne(id) {
    this.personcommunicationsmsservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationsms(this.personcommunicationsmsservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationsmsAdd(personcommunicationsms) {
    personcommunicationsms.isactive = "Y";
    personcommunicationsms.personcontact_ID = this.addperson.personcontactID;
    this.personcommunicationsmsservice.add(personcommunicationsms).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcommunicationsms_ID) {
          this.toastrservice.success("Success", "New Personcommunicationsms Added");
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  personcommunicationsmsUpdate(personcommunicationsms) {
   personcommunicationsms.personcontact_ID =this.editperson.personcontactID;
    console.log(personcommunicationsms);
    if (personcommunicationsms.isactive == true) {
      personcommunicationsms.isactive = "Y";
    } else {
      personcommunicationsms.isactive = "N";
    }
    this.personcommunicationsmsservice.update(personcommunicationsms, personcommunicationsms.personcommunicationsms_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcommunicationsms_ID) {
          this.toastrservice.success("Success", " personcommunicationsms Updated");
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationsmsSearch(str) {
    var search = {
      search: str
    }
    this.personcommunicationsmsservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationsmss(this.personcommunicationsmsservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationsmsSearchAll(str) {
    var search = {
      search: str
    }
    this.personcommunicationsmsservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationsmss(this.personcommunicationsmsservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
