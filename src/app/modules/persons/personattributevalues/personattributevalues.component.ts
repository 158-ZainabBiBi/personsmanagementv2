import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PersonattributevalueComponent } from '../../../components/personattributevalue/personattributevalue.component'

declare var $: any;

@Component({
  selector: 'app-personattributevalues',
  templateUrl: './personattributevalues.component.html',
  styleUrls: ['./personattributevalues.component.css']
})
export class PersonattributevaluesComponent implements OnInit {
  @ViewChild("personattributevalues") personattributevalues: PersonattributevalueComponent;
  @ViewChild("addpersonattributevalue") addpersonattributevalue: PersonattributevalueComponent;
  @ViewChild("editpersonattributevalue") editpersonattributevalue: PersonattributevalueComponent;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  view() {
  }

  show(row) {
    this.router.navigate(["/home/attributevalue"], { queryParams: {  } });
  }
 
  addNew() {
    this.router.navigate(["/home/attributevalue"], {});
  }

  edit(row) {
    this.editpersonattributevalue.personattributevalue = {
      personattributevalue_ID: row.data.personattributevalue_ID,
      attribute_ID: row.data.attribute_ID,
      attribute_VALUE: row.data.attribute_VALUE,
      person_ID:row.data.person_ID,
      attributevalue_ID:row.data.attributevalue_ID,
      isactive: row.data.isactive
    };
    if (row.data.isactive=="Y") {
      this.editpersonattributevalue.personattributevalue.isactive = true;
    } else {
      this.editpersonattributevalue.personattributevalue.isactive = false;
    }
    $("#editpersonattributevalue").modal("show");
  }

  cancel() {
    $("#addpersonattributevalue").modal("hide");
    $("#editpersonattributevalue").modal("hide");
  }

}
