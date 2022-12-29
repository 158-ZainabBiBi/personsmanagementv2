import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { PersonactivityComponent } from '../../../components/personactivity/personactivity.component'

declare var $: any;

@Component({
  selector: 'app-personactivities',
  templateUrl: './personactivities.component.html',
  styleUrls: ['./personactivities.component.css']
})
export class PersonactivitiesComponent implements OnInit {
  @ViewChild("personactivities") personactivities: PersonactivityComponent;
  @ViewChild("addpersonactivity") addpersonactivity: PersonactivityComponent;
  @ViewChild("editpersonactivity") editpersonactivity: PersonactivityComponent;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  view() {
  }

  show(row) {
    this.router.navigate(["/home/activity"], { queryParams: {  } });
  }
 
  addNew() {
    this.router.navigate(["/home/activity"], {});
  }

  edit(row) {
    this.editpersonactivity.personactivity = {
      personactivity_ID: row.data.personactivity_ID,
      activity_ID: row.data.activity_ID,
      personactivity_WEBLINK: row.data.personactivity_WEBLINK,
      person_ID:row.data.person_ID,
      isactive: row.data.isactive
    };
    if (row.data.isactive=="Y") {
      this.editpersonactivity.personactivity.isactive = true;
    } else {
      this.editpersonactivity.personactivity.isactive = false;
    }
    $("#editpersonactivity").modal("show");
  }

  cancel() {
    $("#addpersonactivity").modal("hide");
    $("#editpersonactivity").modal("hide");
  }

}
