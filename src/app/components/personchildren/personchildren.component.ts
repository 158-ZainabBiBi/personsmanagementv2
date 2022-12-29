import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { setting } from 'src/app/setting';
import { redirectByHref } from '../../utilities/Shared_Funtions';
import { OnFailService } from '../../services/on-fail.service';

import { PersonComponent } from '../person/person.component';
import { PersonchildrenService } from './personchildren.service';

@Component({
  selector: 'app-personchildren',
  templateUrl: './personchildren.component.html',
  styleUrls: ['./personchildren.component.css']
})
export class PersonchildrenComponent implements OnInit {
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
  childrenpersonID = null;
  @Input()
  personchildrenID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personchildrens = [];
  personchildrensAll = [];
  personchildren = {
    personchildren_ID: 0,
    childrenperson_ID:null,
    person_ID: null,
    isactive: true
  }
  addchildrenperson: any;
  editchildrenperson: any;

  constructor(
    private personchildrenservice: PersonchildrenService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }


  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personchildrens = JSON.parse(window.sessionStorage.getItem('personchildrens'));
    this.personchildrensAll = JSON.parse(window.sessionStorage.getItem('personchildrensAll'));
    if (this.view == 1 && this.personchildrens == null) {
      this.personchildrenAdvancedSearchAll(this.personID);
    } else if (this.view == 2 && this.personchildrensAll == null) {
      this.personchildrenAdvancedSearchAll(this.personID);
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
          onClick: this.personchildrenAdvancedSearchAll.bind(this, this.personID),
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
    this.personchildren = {
      personchildren_ID: 0,
      childrenperson_ID:null,
      person_ID: null,
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersonchildren(response) {
    if (response.person_ID != null)
    this.personchildren.person_ID = response.person_ID;

    if (response.childrenperson_ID != null)
    this.personchildren.childrenperson_ID = response.childrenperson_ID;

    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personchildren = response;
    this.disabled = true;
  }

  setPersonchildrens(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
      response[i].childrenperson = JSON.parse(response[i].childrenperson_DETAIL);
    }

    if (this.view == 1) {
      this.personchildrens = response;
      window.sessionStorage.setItem("personchildrens", JSON.stringify(this.personchildrens));
    } else {
      this.personchildrensAll = response;
      window.sessionStorage.setItem("personchildrensAll", JSON.stringify(this.personchildrensAll));
    }
    this.cancel.next();
  }

  personchildrenGet() {
    this.personchildrenservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonchildren(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenGetAll() {
    this.personchildrenservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonchildren(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenGetOne(id) {
    this.personchildrenservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonchildren(this.personchildrenservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenAdd(personchildren) {
    personchildren.childrenperson_ID = this.addchildrenperson.childrenpersonID;
   personchildren.person_ID =this.addperson.personID;

    this.personchildrenservice.add(personchildren).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personchildren_ID) {
          this.toastrservice.success("Success", "New Contact Added");
          this.personchildrenAdvancedSearchAll(this.personID);//
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenUpdate(personchildren) {
    personchildren.childrenperson_ID = this.editchildrenperson.childrenpersonID;
   personchildren.person_ID =this.editperson.personID;

    if (personchildren.isactive == true) {
      personchildren.isactive = "Y";
    } else {
      personchildren.isactive = "N";
    }
    this.personchildrenservice.update(personchildren, personchildren.personchildren_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personchildren_ID) {
          this.toastrservice.success("Success", "Contact Updated");
          this.personchildrenAdvancedSearchAll(this.personID);//
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenSearch(str) {
    var search = {
      search: str
    }
    this.personchildrenservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonchildrens(this.personchildrenservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenSearchAll(str) {
    var search = {
      search: str
    }
    this.personchildrenservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonchildrens(this.personchildrenservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenAdvancedSearch(personID) {
    this.personID = personID;
   // this.childrenpersonID = childrenpersonID; 
    var search = {
      person_ID: personID
    //  childrenperson_ID: childrenpersonID
    }
    this.personchildrenservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonchildrens(this.personchildrenservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personchildrenAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personchildrenservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonchildrens(this.personchildrenservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
