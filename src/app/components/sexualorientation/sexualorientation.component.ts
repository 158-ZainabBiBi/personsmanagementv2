import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-sexualorientation',
  templateUrl: './sexualorientation.component.html',
  styleUrls: ['./sexualorientation.component.css']
})
export class SexualorientationComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  sexualorientationID = null;

  sexualorientations = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.sexualorientations = JSON.parse(window.sessionStorage.getItem('sexualorientations'));
    if (this.sexualorientations == null) {
      this.sexualorientationGet();
    }
    if (!this.sexualorientationID && Number(window.sessionStorage.getItem('sexualorientation'))>0) {
      this.sexualorientationID = Number(window.sessionStorage.getItem('sexualorientation'));
    }
    if (this.sexualorientationID) {
      window.sessionStorage.setItem("sexualorientation", this.sexualorientationID);
    }
  }

  setSexualorientation(response) {
    this.sexualorientations = response;
    window.sessionStorage.setItem("sexualorientations", JSON.stringify(this.sexualorientations));
  }
  
  sexualorientationGet(){
    this.lookupservice.lookup("COLOUR").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setSexualorientation(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
