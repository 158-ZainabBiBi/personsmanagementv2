import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activityview',
  templateUrl: './activityview.component.html',
  styleUrls: ['./activityview.component.css']
})
export class ActivityviewComponent implements OnInit {
 
  personactivityID = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.personactivity) {
        this.personactivityID = params.personactivity;
      }
    });
  }
  cancel() {
    this.router.navigate(["/home/activities"], { queryParams: {} });
  }
}