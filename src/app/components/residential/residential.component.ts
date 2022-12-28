import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-residential',
  templateUrl: './residential.component.html',
  styleUrls: ['./residential.component.css']
})
export class ResidentialComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  residentialID = null;

  residentials = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.residentials = JSON.parse(window.sessionStorage.getItem('residentials'));
    if (this.residentials == null) {
      this.residentialGet();
    }
  }

  setResidentials(response) {
    this.residentials = response;
    window.sessionStorage.setItem("residentials", JSON.stringify(this.residentials));
  }

  residentialGet(){
    this.lookupservice.lookup("RESIDENTIAL").subscribe((response: { error?: any; status?: any; message?: any; }) => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setResidentials(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
