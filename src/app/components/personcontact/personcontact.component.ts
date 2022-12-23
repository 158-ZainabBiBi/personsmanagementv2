import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { setting } from 'src/app/setting';
import { redirectByHref } from '../../utilities/Shared_Funtions';
import { OnFailService } from '../../services/on-fail.service';

import { ContacttypeComponent } from '../contacttype/contacttype.component';

import { PersoncontactService } from './personcontact.service';

@Component({
  selector: 'app-personcontact',
  templateUrl: './personcontact.component.html',
  styleUrls: ['./personcontact.component.css']
})
export class PersoncontactComponent implements OnInit {
  @ViewChild("addcontacttype") addcontacttype: ContacttypeComponent;
  @ViewChild("editcontacttype") editcontacttype: ContacttypeComponent;

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
  personcontactID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personcontacts = [];
  personcontactsAll = [];
  personcontact = {
    personcontact_ID: 0,
    person_ID: null,
    contacttype_ID: {
      id: null
    },
    contact_VALUE: "",
    isverified: true,
    ispreaferd: true,
    isactive: true
  }

  constructor(
    private personcontactservice: PersoncontactService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }


  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personcontacts = JSON.parse(window.sessionStorage.getItem('personcontacts'));
    this.personcontactsAll = JSON.parse(window.sessionStorage.getItem('personcontactsAll'));
    if (this.view == 1 && this.personcontacts == null) {
      this.personcontactAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personcontactsAll == null) {
      this.personcontactAdvancedSearchAll(this.personID);
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
          onClick: this.personcontactAdvancedSearchAll.bind(this, this.personID),
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
    this.personcontact = {
      personcontact_ID: 0,
      person_ID: null,
      contacttype_ID: null,
      contact_VALUE: "",
      isverified: true,
      ispreaferd: true,
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersoncontact(response) {
    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personcontact = response;
    this.disabled = true;
  }

  setPersoncontacts(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
    }
    if (this.view == 1) {
      this.personcontacts = response;
      window.sessionStorage.setItem("personcontacts", JSON.stringify(this.personcontacts));
    } else {
      this.personcontactsAll = response;
      window.sessionStorage.setItem("personcontactsAll", JSON.stringify(this.personcontactsAll));
    }
    this.cancel.next();
  }

  personcontactGet() {
    this.personcontactservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontact(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactGetAll() {
    this.personcontactservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontact(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactGetOne(id) {
    this.personcontactservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontact(this.personcontactservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactAdd(personcontact) {
    personcontact.contacttype_ID = this.addcontacttype.contacttypeID;
    personcontact.person_ID = this.personID;
    if (personcontact.ispreaferd == true) {
      personcontact.ispreaferd = "Y";
    } else {
      personcontact.ispreaferd = "N";
    }
    if (personcontact.isverified == true) {
      personcontact.isverified = "Y";
    } else {
      personcontact.isverified = "N";
    }
    this.personcontactservice.add(personcontact).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcontact_ID) {
          this.toastrservice.success("Success", "New Contact Added");
          this.personcontactAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactUpdate(personcontact) {
    personcontact.contacttype_ID = this.editcontacttype.contacttypeID;
    if (personcontact.ispreaferd == true) {
      personcontact.ispreaferd = "Y";
    } else {
      personcontact.ispreaferd = "N";
    }
    if (personcontact.isverified == true) {
      personcontact.isverified = "Y";
    } else {
      personcontact.isverified = "N";
    }
    if (personcontact.isactive == true) {
      personcontact.isactive = "Y";
    } else {
      personcontact.isactive = "N";
    }
    this.personcontactservice.update(personcontact, personcontact.personcontact_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcontact_ID) {
          this.toastrservice.success("Success", "Contact Updated");
          this.personcontactAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactSearch(str) {
    var search = {
      search: str
    }
    this.personcontactservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontacts(this.personcontactservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactSearchAll(str) {
    var search = {
      search: str
    }
    this.personcontactservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontacts(this.personcontactservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personcontactservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontacts(this.personcontactservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personcontactservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontacts(this.personcontactservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
