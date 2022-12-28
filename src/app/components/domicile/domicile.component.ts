import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-domicile',
  templateUrl: './domicile.component.html',
  styleUrls: ['./domicile.component.css']
})
export class DomicileComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  domicileID = null;

  domiciles = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.domiciles = JSON.parse(window.sessionStorage.getItem('domiciles'));
    if (this.domiciles == null) {
      this.domicileGet();
    }
  }

  setDomiciles(response) {
    this.domiciles = response;
    window.sessionStorage.setItem("domiciles", JSON.stringify(this.domiciles));
  }

  domicileGet(){
    this.lookupservice.lookup("DOMICILE").subscribe((response: { error?: any; status?: any; message?: any; }) => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setDomiciles(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
