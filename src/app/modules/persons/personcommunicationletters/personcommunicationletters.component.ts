import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from 'src/app/services/on-fail.service';

import { PersoncommunicationletterComponent } from 'src/app/components/personcommunicationletter/personcommunicationletter.component';
import { PersoncommunicationletterService } from 'src/app/components/personcommunicationletter/personcommunicationletter.service';
import { RouterLinkWithHref } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-personcommunicationletters',
  templateUrl: './personcommunicationletters.component.html',
  styleUrls: ['./personcommunicationletters.component.css']
})
export class PersoncommunicationlettersComponent implements OnInit {
  @ViewChild("personcommunicationletters") personcommunicationletters: PersoncommunicationletterComponent;
  @ViewChild("addpersoncommunicationletter") addpersoncommunicationletter: PersoncommunicationletterComponent;
  @ViewChild("editpersoncommunicationletter") editpersoncommunicationletter: PersoncommunicationletterComponent;

  constructor(
    private personcommunicationletterservice: PersoncommunicationletterService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
  }

  view() {
  }

  addNew() {
    this.addpersoncommunicationletter.add();
    $("#add").modal("show");
  }
  
  edit(row) {
    this.editpersoncommunicationletter.personcommunicationletter = {
      personletter_ID: row.data.personletter_ID,
      person_ID:row.data.person_ID,
      person_DETAIL:row.data.person_DETAIL,
      letter_DATE:row.data.letter_DATE,
      letter_CONTENT: row.data.letter_CONTENT,
      letter_REFNO: row.data.letter_REFNO,
      isletterapproved: row.data.isletterapproved,
      letter_ID: row.data.letter_ID,
      letter_REQUESTDATE: row.data.letter_REQUESTDATE,
      isactive:row.data.isactive,
         };
    if (row.data.isactive=="Y") {
      this.editpersoncommunicationletter.personcommunicationletter.isactive = true;
    } else {
      this.editpersoncommunicationletter.personcommunicationletter.isactive = false;
    }
    $("#edit").modal("show");
  }
  cancel() {
    $("#add").modal("hide");
    $("#edit").modal("hide");
  }

}



