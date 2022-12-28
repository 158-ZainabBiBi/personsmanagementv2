import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-educationattendancemode',
  templateUrl: './educationattendancemode.component.html',
  styleUrls: ['./educationattendancemode.component.css']
})
export class EducationattendancemodeComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  educationattendancemodeID = null;

  educationattendancemodes = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.educationattendancemodes = JSON.parse(window.sessionStorage.getItem('educationattendancemodes'));
    if (this.educationattendancemodes == null) {
      this.educationattendancemodeGet();
    }
  }

  setEducationattendancemodes(response) {
    this.educationattendancemodes = response;
    window.sessionStorage.setItem("educationattendancemodes", JSON.stringify(this.educationattendancemodes));
  }

  educationattendancemodeGet(){
    this.lookupservice.lookup("EDUCATIONATTENDANCEMODE").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setEducationattendancemodes(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
