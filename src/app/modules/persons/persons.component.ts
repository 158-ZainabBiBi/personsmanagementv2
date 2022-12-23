import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';

import { PersonComponent } from '../../components/person/person.component'
import { PersonService } from '../../components/person/person.service';
import { RouterLinkWithHref } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  @ViewChild("persons") persons: PersonComponent;
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson: PersonComponent;

  constructor(
    private personservice: PersonService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
  }

  view() {
  }

  addNew() {
    this.addperson.add();
    $("#add").modal("show");
  }
  
  edit(row) {
    this.editperson.person = {
      person_ID: row.data.person_ID,
      title:row.data.title,
      surname:row.data.surname,
      previoussurname:row.data.previoussurname,
      forenames: row.data.forenames,
      middlename:row.data.middlename,
      nickname:row.data.nickname,
      birth_DATE:row.data.birth_DATE,
      birth_TIME: row.data.birth_TIME,
      birthplace_ID: row.data.birthplace_ID,
      birthplaces: row.data.birthplaces,
      personimg_PATH:row.data.personimg_PATH,
      isactive: row.data.isactive
    };
    if (row.data.isactive=="Y") {
      this.editperson.person.isactive = true;
    } else {
      this.editperson.person.isactive = false;
    }
    $("#edit").modal("show");
  }
  cancel() {
    $("#add").modal("hide");
    $("#edit").modal("hide");
  }

}



