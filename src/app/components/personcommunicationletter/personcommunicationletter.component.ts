import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';


import { PersoncommunicationletterService } from './personcommunicationletter.service';
import { PersonComponent } from '../person/person.component';
import { redirectByHref } from 'src/app/utilities/Shared_Funtions';
import { setting } from 'src/app/setting';


@Component({
  selector: 'app-personcommunicationletter',
  templateUrl: './personcommunicationletter.component.html',
  styleUrls: ['./personcommunicationletter.component.css']
})
export class PersoncommunicationletterComponent implements OnInit {
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
  personcommunicationletterID = null;


  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();
  

  
  personcommunicationletters = [];
  personcommunicationlettersAll = [];
  personcommunicationletter = {
    personletter_ID: 0,
    person_ID: null,
    letter_DATE: "",
    letter_CONTENT: "",
    letter_REFNO:null,
    isletterapproved: true, 
    letter_ID: null,
    letter_REQUESTDATE: "",
    isactive: true,
    
  
  }
 

  constructor(
    private personcommunicationletterservice: PersoncommunicationletterService,
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personcommunicationletters = JSON.parse(window.sessionStorage.getItem('personcommunicationletters'));
    this.personcommunicationlettersAll = JSON.parse(window.sessionStorage.getItem('personcommunicationlettersAll'));
    if (this.view == 1 && this.personcommunicationletters == null) {
      this.personcommunicationletterAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personcommunicationlettersAll == null) {
      this.personcommunicationletterAdvancedSearchAll(this.personID);
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
          onClick: this.personcommunicationletterAdvancedSearchAll.bind(this),
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
    this.personcommunicationletter = {
      personletter_ID: 0,
      person_ID: null,
      letter_DATE: "",
      letter_CONTENT: "",
      letter_REFNO:null,
      isletterapproved: true,
      letter_ID: null,
      letter_REQUESTDATE: "",
      isactive: true,
      
    };
  }

  update(row) {
    this.edit.next(row);
  }

 
  setPersoncommunicationletters(response) {
    if (this.view == 1) {
      this.personcommunicationletters = response;
      window.sessionStorage.setItem("personcommunicationletters", JSON.stringify(this.personcommunicationletters));
    } else {
      this.personcommunicationlettersAll = response;
      window.sessionStorage.setItem("personcommunicationlettersAll", JSON.stringify(this.personcommunicationlettersAll));
    }
    this.cancel.next();
  }
  
  setPersoncommunicationletter(response) {
    this.personcommunicationletter = response;
    if (response.person_ID != null)
      this.personcommunicationletter.person_ID = response.person_ID;

      if (response.isletterapproved == "Y") {
        this.personcommunicationletter.isletterapproved = true;
      } else {
        this.personcommunicationletter.isletterapproved = false;
      }
    
    if (response.isactive == "Y") {
      this.personcommunicationletter.isactive = true;
    } else {
      this.personcommunicationletter.isactive = false;
    }
  }

  
  
  personcommunicationletterGet() {
    this.personcommunicationletterservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationletter(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
}


personcommunicationletterGetAll() {
  this.personcommunicationletterservice.getAll().subscribe(response => {
    if (response) {
      if (response.error && response.status) {
        this.toastrservice.warning("Message", " " + response.message);
      } else{
        this.setPersoncommunicationletter(response);
      }
    }
  }, error => {
    this.onfailservice.onFail(error);
  })
}

  personcommunicationletterGetOne(id) {
    this.personcommunicationletterservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationletter(this.personcommunicationletterservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

 
  personcommunicationletterAdd(personcommunicationletter) {
    personcommunicationletter.isactive = "Y";
    personcommunicationletter.person_ID = this.addperson.personID;
    if (personcommunicationletter.isletterapproved == true) {
      personcommunicationletter.isletterapproved = "Y";
    } else {
      personcommunicationletter.isletterapproved = "N";
    }

    this.personcommunicationletterservice.add(personcommunicationletter).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcommunicationletter_ID) {
          this.toastrservice.success("Success", "New Personcommunicationletter Added");
          this.personcommunicationletterAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

   personcommunicationletterUpdate(personcommunicationletter) {
    personcommunicationletter.person_ID = this.editperson.personID;
    if (personcommunicationletter.isletterapproved == true) {
      personcommunicationletter.isletterapproved = "Y";
    } else {
      personcommunicationletter.isletterapproved = "N";
    }
    if (personcommunicationletter.isactive == true) {
      personcommunicationletter.isactive = "Y";
    } else {
      personcommunicationletter.isactive = "N";
    }
    this.personcommunicationletterservice.update(personcommunicationletter, personcommunicationletter.personcommunicationletter_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcommunicationletter_ID) {
          this.toastrservice.success("Success", " Personcommunicationletter Updated");
          this.personcommunicationletterAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  personcommunicationletterSearch(str) {
    var search = {
      search: str
    }
    this.personcommunicationletterservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationletters(this.personcommunicationletterservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationletterSearchAll(str) {
    var search = {
      search: str
    }
    this.personcommunicationletterservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationletters(this.personcommunicationletterservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationletterAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personcommunicationletterservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationletters(this.personcommunicationletterservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationletterAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personcommunicationletterservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncommunicationletters(this.personcommunicationletterservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
 

}
