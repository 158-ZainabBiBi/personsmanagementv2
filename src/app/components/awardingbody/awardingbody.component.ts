import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-awardingbody',
  templateUrl: './awardingbody.component.html',
  styleUrls: ['./awardingbody.component.css']
})
export class AwardingbodyComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  awardingbodyID = null;

  awardingbodies = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.awardingbodies = JSON.parse(window.sessionStorage.getItem('awardingbodies'));
    if (this.awardingbodies == null) {
      this.awardingbodyGet();
    }
  }

  setAwardingbodys(response) {
    this.awardingbodies = response;
    window.sessionStorage.setItem("awardingbodies", JSON.stringify(this.awardingbodies));
  }

  awardingbodyGet(){
    this.lookupservice.lookup("COUNTRY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setAwardingbodys(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
