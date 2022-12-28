import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from 'src/app/services/on-fail.service';

import { PersonchildrenComponent } from 'src/app/components/personchildren/personchildren.component';
import { PersonchildrenService } from 'src/app/components/personchildren/personchildren.service';
import { RouterLinkWithHref } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-personchildrens',
  templateUrl: './personchildrens.component.html',
  styleUrls: ['./personchildrens.component.css']
})
export class PersonchildrensComponent implements OnInit {
  @ViewChild("personchildrens") personchildrens: PersonchildrenComponent;
  @ViewChild("addpersonchildren") addpersonchildren: PersonchildrenComponent;
  @ViewChild("editpersonchildren") editpersonchildren: PersonchildrenComponent;

  constructor(
    private personchildrenservice: PersonchildrenService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
  }

  view() {
  }

  addNew() {
    this.addpersonchildren.add();
    $("#add").modal("show");
  }
  
  edit(row) {
    this.editpersonchildren.personchildren = {
      personchildren_ID: row.data.personchildren_ID,
      childrenperson_ID:row.data.childrenperson_ID,
      childrenperson_DETAIL:row.data.childrenperson_DETAIL,
      person_ID:row.data.person_ID,
      person_DETAIL: row.data.person_DETAIL,
      isactive:row.data.isactive,
         };
    if (row.data.isactive=="Y") {
      this.editpersonchildren.personchildren.isactive = true;
    } else {
      this.editpersonchildren.personchildren.isactive = false;
    }
    $("#edit").modal("show");
  }
  cancel() {
    $("#add").modal("hide");
    $("#edit").modal("hide");
  }

}



