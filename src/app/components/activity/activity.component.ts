import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  activityID = null;

  activities = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.activities = JSON.parse(window.sessionStorage.getItem('activities'));
    if (this.activities == null) {
      this.activityGet();
    }
  }

  setactivities(response) {
    this.activities = response;
    window.sessionStorage.setItem("activities", JSON.stringify(this.activities));
  }

  activityGet(){
    this.lookupservice.lookup("ACTIVITY").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setactivities(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
