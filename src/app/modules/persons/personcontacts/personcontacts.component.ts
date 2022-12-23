import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../../services/on-fail.service';

import { PersoncontactaddressComponent } from '../../../components/personcontactaddress/personcontactaddress.component'
import { PersoncontactComponent } from '../../../components/personcontact/personcontact.component'
import { PersoncontactService } from '../../../components/personcontact/personcontact.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-personcontacts',
  templateUrl: './personcontacts.component.html',
  styleUrls: ['./personcontacts.component.css']
})
export class PersoncontactsComponent implements OnInit {
  @ViewChild("personcontactaddresses") personcontactaddresses: PersoncontactaddressComponent;
  @ViewChild("personcontact") personcontact: PersoncontactComponent;
  @ViewChild("addpersoncontact") addpersoncontact: PersoncontactComponent;
  @ViewChild("editpersoncontact") editpersoncontact: PersoncontactComponent;
  
  constructor(
    private personcontactservice: PersoncontactService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
  }

  show(row) {
    this.router.navigate(["/home/contactview"], { queryParams: { personcontactaddress: row.data.personcontactaddress_ID } });
  }

  addNew() {
    this.router.navigate(["/home/contactview"], {});
  }

  addNewContact() {
    $("#addpersoncontact").modal("show");
  }

  edit(row) {
    this.editpersoncontact.personcontact = {
      personcontact_ID: row.data.personcontact_ID,
      person_ID: row.data.person_ID,
      contacttype_ID: row.data.contacttype_ID,
      contact_VALUE: row.data.contact_VALUE,
      ispreaferd: row.data.ispreaferd,
      isverified: row.data.isverified,
      isactive: row.data.isactive
    };
    if (row.data.ispreaferd=="Y") {
      this.editpersoncontact.personcontact.ispreaferd = true;
    } else {
      this.editpersoncontact.personcontact.ispreaferd = false;
    }
    if (row.data.isverified=="Y") {
      this.editpersoncontact.personcontact.isverified = true;
    } else {
      this.editpersoncontact.personcontact.isverified = false;
    }
    if (row.data.isactive=="Y") {
      this.editpersoncontact.personcontact.isactive = true;
    } else {
      this.editpersoncontact.personcontact.isactive = false;
    }
    $("#editpersoncontact").modal("show");
  }
 
  cancel() {
    $("#addpersoncontact").modal("hide");
    $("#editpersoncontact").modal("hide");
  }

}
