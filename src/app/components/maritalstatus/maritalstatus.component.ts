import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-maritalstatus',
  templateUrl: './maritalstatus.component.html',
  styleUrls: ['./maritalstatus.component.css']
})
export class MaritalstatusComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  maritalstatusID = null;

  maritalstatuses = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.maritalstatuses = JSON.parse(window.sessionStorage.getItem('maritalstatuses'));
    if (this.maritalstatuses == null) {
      this.maritalstatusGet();
    }
  }

  setMartialstatuss(response) {
    this.maritalstatuses = response;
    window.sessionStorage.setItem("maritalstatuses", JSON.stringify(this.maritalstatuses));
  }

  maritalstatusGet(){
    this.lookupservice.lookup("MARITALSTATUS").subscribe((response: { error?: any; status?: any; message?: any; }) => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setMartialstatuss(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
