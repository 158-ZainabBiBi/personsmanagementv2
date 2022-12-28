import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-sex',
  templateUrl: './sex.component.html',
  styleUrls: ['./sex.component.css']
})
export class SexComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  sexID = null;

  sexs = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.sexs = JSON.parse(window.sessionStorage.getItem('sexs'));
    if (this.sexs == null) {
      this.sexGet();
    }
  }

  setSexs(response) {
    this.sexs = response;
    window.sessionStorage.setItem("sexs", JSON.stringify(this.sexs));
  }

  sexGet(){
    this.lookupservice.lookup("SEX").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setSexs(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
