import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personcontactview',
  templateUrl: './personcontactview.component.html',
  styleUrls: ['./personcontactview.component.css']
})
export class PersoncontactviewComponent implements OnInit {
  personcontactaddressID = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.personcontactaddress) {
        this.personcontactaddressID = params.personcontactaddress;
      }
    });
  }
  cancel() {
    this.router.navigate(["/home/contact"], { queryParams: {} });
  }
}
