import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.css']
})
export class ReligionComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  religionID = null;

  religions = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.religions = JSON.parse(window.sessionStorage.getItem('religions'));
    if (this.religions == null) {
      this.religionGet();
    }
  }

  setReligions(response) {
    this.religions = response;
    window.sessionStorage.setItem("religions", JSON.stringify(this.religions));
  }

  religionGet(){
    this.lookupservice.lookup("RELIGION").subscribe((response: { error?: any; status?: any; message?: any; }) => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setReligions(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
