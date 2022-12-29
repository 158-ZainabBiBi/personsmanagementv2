import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-attributevalueview',
  templateUrl: './attributevalueview.component.html',
  styleUrls: ['./attributevalueview.component.css']
})
export class AttributevalueviewComponent implements OnInit {
 
  personattributevalueID = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.personattributevalue) {
        this.personattributevalueID = params.personattributevalue;
      }
    });
  }
  cancel() {
    this.router.navigate(["/home/ttributevalues"], { queryParams: {} });
  }
}