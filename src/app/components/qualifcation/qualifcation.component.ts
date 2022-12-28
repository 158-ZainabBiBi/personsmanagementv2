import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-qualifcation',
  templateUrl: './qualifcation.component.html',
  styleUrls: ['./qualifcation.component.css']
})
export class QualifcationComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  qualifcationID = null;

  qualifcations = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.qualifcations = JSON.parse(window.sessionStorage.getItem('qualifcations'));
    if (this.qualifcations == null) {
      this.qualifcationGet();
    }
  }

  setQualifcations(response) {
    this.qualifcations = response;
    window.sessionStorage.setItem("qualifcations", JSON.stringify(this.qualifcations));
  }

  qualifcationGet(){
    this.lookupservice.lookup("COUNTRY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setQualifcations(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
