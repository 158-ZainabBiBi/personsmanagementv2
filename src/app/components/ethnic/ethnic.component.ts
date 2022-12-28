
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-ethnic',
  templateUrl: './ethnic.component.html',
  styleUrls: ['./ethnic.component.css']
})
export class EthnicComponent implements OnInit {
  @Input()
  view=1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  ethnicID = null;
  ethnics = [];
  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.ethnics = JSON.parse(window.sessionStorage.getItem('ethnics'));
    if (this.ethnics == null) {
      this.ethnicGet();
    }
    if (!this.ethnicID && Number(window.sessionStorage.getItem('ethnic'))>0) {
      this.ethnicID = Number(window.sessionStorage.getItem('ethnic'));
    }
    if (this.ethnicID) {
      window.sessionStorage.setItem("ethnic", this.ethnicID);
    }
  }

  setEthnic(response) {
    this.ethnics = response;
    window.sessionStorage.setItem("ethnics", JSON.stringify(this.ethnics));
  }

  ethnicGet(){
    this.lookupservice.lookup("ETHNIC").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setEthnic(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
