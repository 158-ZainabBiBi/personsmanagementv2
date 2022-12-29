import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { PersoncontactComponent } from '../personcontact/personcontact.component';



import { PersoncommunicationemailService } from './personcommunicationemail.service';
@Component({
  selector: 'app-personcommunicationemail',
  templateUrl: './personcommunicationemail.component.html',
  styleUrls: ['./personcommunicationemail.component.css']
})
export class PersoncommunicationemailComponent implements OnInit {
  @ViewChild("addpersoncontact") addpersoncontact: PersoncontactComponent;
  @ViewChild("editpersoncontact") editpersoncontact:PersoncontactComponent;
  
  @Input()
  view: number = 1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  personcommunicationemailID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personcommunicationemails = [];
  personcommunicationemailsAll = [];
  personcommunicationemail = {
    personemail_ID: 0,
    personcontact_ID: null,
    email_DATETIME: "",
    email_CONTENT: "",
    isactive: true,
   

  }

  constructor(
    private personcommunicationemailservice: PersoncommunicationemailService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.personcommunicationemails = JSON.parse(window.sessionStorage.getItem('personcommunicationemails'));
    this.personcommunicationemailsAll = JSON.parse(window.sessionStorage.getItem('personcommunicationemailsAll'));
    if (this.view == 1 && this.personcommunicationemails == null) {
      this.personcommunicationemailGet();
    } else if (this. view == 2 && this.personcommunicationemailsAll == null) {
      this.personcommunicationemailGetAll();
    }

    if (!this.personcommunicationemailID && Number(window.sessionStorage.getItem('personcommunicationemail'))>0) {
      this.personcommunicationemailID = Number(window.sessionStorage.getItem('personcommunicationemail'));
    }
    if (this.personcommunicationemailID) {
      window.sessionStorage.setItem("personcommunicationemail", this.personcommunicationemailID);
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
          onClick: this.personcommunicationemailGetAll.bind(this),
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
    this.personcommunicationemail = {
    personemail_ID: 0,
    personcontact_ID: null,
    email_DATETIME: "",
    email_CONTENT: "",
    isactive: true,
    };
  }

  update(row) {
    this.edit.next(row);
  }

  sePersoncommunicationemail(response) {
    this.personcommunicationemail = response;
    if (response.personcontact_ID != null)
      this.personcommunicationemail.personcontact_ID = response.personcontact_ID;

    if (response.isactive == "Y") {
      this.personcommunicationemail.isactive = true;
    } else {
      this.personcommunicationemail.isactive = false;
    }
  }

  sePersoncommunicationemails(response) {
    for (var i=0; i<response.length; i++) {
      response[i].personcontact = JSON.parse(response[i].personcontact_DETAIL);
    }
  
    if (this.view == 1) {
      this.personcommunicationemails = response;
      window.sessionStorage.setItem("personcommunicationemails", JSON.stringify(this.personcommunicationemails));
    } else {
      this.personcommunicationemailsAll = response;
      console.log(this.personcommunicationemailsAll);
      window.sessionStorage.setItem("personcommunicationemailsAll", JSON.stringify(this.personcommunicationemailsAll));
    }
    this.cancel.next();
  }

  personcommunicationemailGet() {
      this.personcommunicationemailservice.get().subscribe(response => {
        if (response) {
          if (response.error && response.status) {
            this.toastrservice.warning("Message", " " + response.message);
          } else{
            this.sePersoncommunicationemail(response);
          }
        }
      }, error => {
        this.onfailservice.onFail(error);
      })
  }

  personcommunicationemailGetOne(id) {
    this.personcommunicationemailservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.sePersoncommunicationemail(this.personcommunicationemailservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  
  personcommunicationemailGetAll() {
    this.personcommunicationemailservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.sePersoncommunicationemail(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationemailAdd(personcommunicationemail) {
    personcommunicationemail.isactive = "Y";
    personcommunicationemail.personcontact_ID = this.addpersoncontact.personcontactID;
    this.personcommunicationemailservice.add(personcommunicationemail).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcommunicationemail_ID) {
          this.toastrservice.success("Success", "New Personcommunicationemail Added");
          this.personcommunicationemailGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcommunicationemailUpdate(personcommunicationemail) {
    personcommunicationemail.personcontact_ID = this.editpersoncontact.personcontactID;
    if (personcommunicationemail.isactive == true) {
      personcommunicationemail.isactive = "Y";
    } else {
      personcommunicationemail.isactive = "N";
    }
    this.personcommunicationemailservice.update(personcommunicationemail, personcommunicationemail.personcommunicationemail_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcommunicationemail_ID) {
          this.toastrservice.success("Success", " Personcommunicationemail Updated");
          this.personcommunicationemailGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}