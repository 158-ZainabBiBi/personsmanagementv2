import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-personqualificationcountry',
  templateUrl: './personqualificationcountry.component.html',
  styleUrls: ['./personqualificationcountry.component.css']
})
export class PersonqualificationcountryComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  personqualificationcountryID = null;

  personqualificationcountries = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.personqualificationcountries = JSON.parse(window.sessionStorage.getItem('personqualificationcountries'));
    if (this.personqualificationcountries == null) {
      this.personqualificationcountryGet();
    }
  }

  setPersonqualificationcountrys(response) {
    this.personqualificationcountries = response;
    window.sessionStorage.setItem("personqualificationcountries", JSON.stringify(this.personqualificationcountries));
  }

  personqualificationcountryGet(){
    this.lookupservice.lookup("COUNTRY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonqualificationcountrys(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
