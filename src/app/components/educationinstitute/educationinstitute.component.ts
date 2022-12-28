import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-educationinstitute',
  templateUrl: './educationinstitute.component.html',
  styleUrls: ['./educationinstitute.component.css']
})
export class EducationinstituteComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  educationinstituteID = null;

  educationinstitutes = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.educationinstitutes = JSON.parse(window.sessionStorage.getItem('educationinstitutes'));
    if (this.educationinstitutes == null) {
      this.educationinstituteGet();
    }
  }

  setEducationinstitutes(response) {
    this.educationinstitutes = response;
    window.sessionStorage.setItem("educationinstitutes", JSON.stringify(this.educationinstitutes));
  }

  educationinstituteGet(){
    this.lookupservice.lookup("EDUCATIONINSTITUTE").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setEducationinstitutes(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
