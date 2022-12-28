import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  genderID = null;

  genders = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.genders = JSON.parse(window.sessionStorage.getItem('genders'));
    if (this.genders == null) {
      this.genderGet();
    }
  }

  setGenders(response) {
    this.genders = response;
    window.sessionStorage.setItem("genders", JSON.stringify(this.genders));
  }

  genderGet(){
    this.lookupservice.lookup("gender").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setGenders(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
