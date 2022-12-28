import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-disability',
  templateUrl: './disability.component.html',
  styleUrls: ['./disability.component.css']
})
export class DisabilityComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  disabilityID = null;

  disabilities = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.disabilities = JSON.parse(window.sessionStorage.getItem('disabilities'));
    if (this.disabilities == null) {
      this.disabilityGet();
    }
    if (!this.disabilityID && Number(window.sessionStorage.getItem('disability'))>0) {
      this.disabilityID = Number(window.sessionStorage.getItem('disability'));
    }
    if (this.disabilityID) {
      window.sessionStorage.setItem("disability", this.disabilityID);
    }
  }

  setDisability(response) {
    this.disabilities = response;
    window.sessionStorage.setItem("disabilities", JSON.stringify(this.disabilities));
  }
  
  disabilityGet(){
    this.lookupservice.lookup("COLOUR").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setDisability(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
