import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from 'src/app/services/on-fail.service';

import { PersoncommunicationemailComponent } from 'src/app/components/personcommunicationemail/personcommunicationemail.component';
import { PersoncommunicationemailService } from 'src/app/components/personcommunicationemail/personcommunicationemail.service';
import { RouterLinkWithHref } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-personcommunicationemails',
  templateUrl: './personcommunicationemails.component.html',
  styleUrls: ['./personcommunicationemails.component.css']
})
export class PersoncommunicationmailsComponent implements OnInit {
  @ViewChild("personcommunicationemails") personcommunicationemails: PersoncommunicationemailComponent;
  @ViewChild("addpersoncommunicationemail") addpersoncommunicationemail: PersoncommunicationemailComponent;
  @ViewChild("editpersoncommunicationemail") editpersoncommunicationemail: PersoncommunicationemailComponent;

  constructor(
    private personcommunicationemailservice: PersoncommunicationemailService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
  }

  view() {
  }

  addNew() {
    this.addpersoncommunicationemail.add();
    $("#add").modal("show");
  }
  
  edit(row) {
    this.editpersoncommunicationemail.personcommunicationemail = {
      personemail_ID: row.data.personemail_ID,
      personcontact_ID:row.data.personcontact_ID,
      personcontact_DETAIL:row.data.personcontact_DETAIL,
      email_DATETIME:row.data.email_DATETIME,
      email_CONTENT: row.data.email_CONTENT,
    
      isactive: row.data.isactive
    };
    if (row.data.isactive=="Y") {
      this.editpersoncommunicationemail.personcommunicationemail.isactive = true;
    } else {
      this.editpersoncommunicationemail.personcommunicationemail.isactive = false;
    }
    $("#edit").modal("show");
  }
  cancel() {
    $("#add").modal("hide");
    $("#edit").modal("hide");
  }

}



