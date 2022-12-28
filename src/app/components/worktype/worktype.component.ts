import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-worktype',
  templateUrl: './worktype.component.html',
  styleUrls: ['./worktype.component.css']
})
export class WorktypeComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  worktypeID = null;

  worktypes = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.worktypes = JSON.parse(window.sessionStorage.getItem('worktypes'));
    if (this.worktypes == null) {
      this.worktypeGet();
    }
  }

  setWorktypes(response) {
    this.worktypes = response;
    window.sessionStorage.setItem("worktypes", JSON.stringify(this.worktypes));
  }

  worktypeGet(){
    this.lookupservice.lookup("WORKTYPE").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setWorktypes(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
