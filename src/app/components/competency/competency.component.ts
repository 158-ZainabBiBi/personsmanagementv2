import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-competency',
  templateUrl: './competency.component.html',
  styleUrls: ['./competency.component.css']
})
export class CompetencyComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  competencyID = null;

  competencies = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.competencies = JSON.parse(window.sessionStorage.getItem('competencies'));
    if (this.competencies == null) {
      this.competencyGet();
    }
  }

  setCompetencies(response) {
    this.competencies = response;
    window.sessionStorage.setItem("competencies", JSON.stringify(this.competencies));
  }

  competencyGet(){
    this.lookupservice.lookup("COMPETENCY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setCompetencies(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
