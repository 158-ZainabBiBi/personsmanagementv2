import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-contacttype',
  templateUrl: './contacttype.component.html',
  styleUrls: ['./contacttype.component.css']
})
export class ContacttypeComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  contacttypeID = null;

  contacttypes = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.contacttypes = JSON.parse(window.sessionStorage.getItem('contacttypes'));
    if (this.contacttypes == null) {
      this.contacttypeGet();
    }
  }

  setcontacttypes(response) {
    this.contacttypes = response;
    window.sessionStorage.setItem("contacttypes", JSON.stringify(this.contacttypes));
  }

  contacttypeGet(){
    this.lookupservice.lookup("CONTACTTYPE").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setcontacttypes(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
