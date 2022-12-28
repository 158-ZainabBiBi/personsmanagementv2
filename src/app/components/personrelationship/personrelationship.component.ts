
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-ethnic',
  templateUrl: './ethnic.component.html',
  styleUrls: ['./ethnic.component.css']
})
export class PersonrelationshipComponent implements OnInit {
  @Input()
  view=1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  personreferenceID = null;
  personreferences = [];
  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.personreferences = JSON.parse(window.sessionStorage.getItem('personreferences'));
    if (this.personreferences == null) {
      this.personreferenceGet();
    }
    if (!this.personreferenceID && Number(window.sessionStorage.getItem('ethnic'))>0) {
      this.personreferenceID = Number(window.sessionStorage.getItem('ethnic'));
    }
    if (this.personreferenceID) {
      window.sessionStorage.setItem("ethnic", this.personreferenceID);
    }
  }

  setPersonreference(response) {
    this.personreferences = response;
    window.sessionStorage.setItem("personreferences", JSON.stringify(this.personreferences));
  }

  personreferenceGet(){
    this.lookupservice.lookup("ETHNIC").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonreference(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
