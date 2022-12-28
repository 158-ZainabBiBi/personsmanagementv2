import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-immigrationstatus',
  templateUrl: './immigrationstatus.component.html',
  styleUrls: ['./immigrationstatus.component.css']
})
export class ImmigrationstatusComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  immigrationstatusID = null;

  immigrationstatuss = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.immigrationstatuss = JSON.parse(window.sessionStorage.getItem('immigrationstatuss'));
    if (this.immigrationstatuss == null) {
      this.immigrationstatusGet();
    }
  }

  setImmigrationstatuss(response) {
    this.immigrationstatuss = response;
    window.sessionStorage.setItem("immigrationstatuss", JSON.stringify(this.immigrationstatuss));
  }

  immigrationstatusGet(){
    this.lookupservice.lookup("immigrationstatus").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setImmigrationstatuss(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
