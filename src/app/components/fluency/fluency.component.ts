import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-fluency',
  templateUrl: './fluency.component.html',
  styleUrls: ['./fluency.component.css']
})
export class FluencyComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  fluencyID = null;

  fluencies = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.fluencies = JSON.parse(window.sessionStorage.getItem('fluencies'));
    if (this.fluencies == null) {
      this.fluencyGet();
    }
  }

  setFluencys(response) {
    this.fluencies = response;
    window.sessionStorage.setItem("fluencies", JSON.stringify(this.fluencies));
  }

  fluencyGet(){
    this.lookupservice.lookup("FLUENCY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setFluencys(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
