import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-documenttype',
  templateUrl: './documenttype.component.html',
  styleUrls: ['./documenttype.component.css']
})
export class DocumenttypeComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  documenttypeID = null;

  documenttypes = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.documenttypes = JSON.parse(window.sessionStorage.getItem('documenttypes'));
    if (this.documenttypes == null) {
      this.documenttypeGet();
    }
  }

  setdocumenttypes(response) {
    this.documenttypes = response;
    window.sessionStorage.setItem("documenttypes", JSON.stringify(this.documenttypes));
  }

  documenttypeGet(){
    this.lookupservice.lookup("DOCUMENTTYPE").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setdocumenttypes(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
