import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-filetype',
  templateUrl: './filetype.component.html',
  styleUrls: ['./filetype.component.css']
})
export class FiletypeComponent implements OnInit {
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  filetypeID = null;

  filetypes = [];

  constructor(
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    this.filetypes = JSON.parse(window.sessionStorage.getItem('filetypes'));
    if (this.filetypes == null) {
      this.setfiletypeGet();
    }
  }

  setfiletypes(response) {
    this.filetypes = response;
    window.sessionStorage.setItem("filetypes", JSON.stringify(this.filetypes));
  }

  setfiletypeGet(){
    this.lookupservice.lookup("FILETYPE").subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setfiletypes(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
