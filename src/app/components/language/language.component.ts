import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  languageID = null;

  languages = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.languages = JSON.parse(window.sessionStorage.getItem('languages'));
    if (this.languages == null) {
      this.languageGet();
    }
  }

  setLanguages(response) {
    this.languages = response;
    window.sessionStorage.setItem("languages", JSON.stringify(this.languages));
  }

  languageGet(){
    this.lookupservice.lookup("COUNTRY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setLanguages(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
