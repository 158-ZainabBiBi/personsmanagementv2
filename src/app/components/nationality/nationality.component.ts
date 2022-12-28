import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.css']
})
export class NationalityComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  nationalityID = null;

  nationalities = [];
  residentialID: any;

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.nationalities = JSON.parse(window.sessionStorage.getItem('nationalities'));
    if (this.nationalities == null) {
      this.nationalityGet();
    }
  }

  setNationalitys(response) {
    this.nationalities = response;
    window.sessionStorage.setItem("nationalities", JSON.stringify(this.nationalities));
  }

  nationalityGet(){
    this.lookupservice.lookup("NATIONALITY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setNationalitys(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
