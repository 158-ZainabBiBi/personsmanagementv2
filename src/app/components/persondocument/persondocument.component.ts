import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LookupService } from '../../services/lookup.service';


import { PersondocumentService } from './persondocument.service';
import { PersonComponent } from '../person/person.component';
//import { ActivityComponent } from '../activity/activity.component';
import { DocumenttypeComponent } from '../documenttype/documenttype.component';
import { FiletypeComponent } from '../filetype/filetype.component';

@Component({
  selector: 'app-persondocument',
  templateUrl: './persondocument.component.html',
  styleUrls: ['./persondocument.component.css']
})
export class PersondocumentComponent implements OnInit {

  @ViewChild("documenttype") documenttype: DocumenttypeComponent;
  @ViewChild("adddocumenttype") adddocumenttype: DocumenttypeComponent;
  @ViewChild("editdocumenttype") editdocumenttype: DocumenttypeComponent;

  @ViewChild("filetype") filetype: FiletypeComponent;
  @ViewChild("addfiletype") addfiletype: FiletypeComponent;
  @ViewChild("editfiletype") editfiletype: FiletypeComponent;
  
  @ViewChild("person") person: PersonComponent;
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson: PersonComponent;

  @Input()
  view: number = 1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  persondocumentID = null;


  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();
  

  
  persondocuments = [];
  persondocumentsAll = [];
  persondocument = {

    persondocument_ID: 0,
    person_ID: null,
    person_DETAIL:"",
    documenttype_ID:{id:null},
    documenttype_DESC:"",
    document_PATH:"",
    filetype_ID:{id:null},
    is_VERIFIED:true,
    is_ARCHIVED:null,
    isactive: true
  }
 

  constructor(
    private persondocumentService: PersondocumentService,
    private lookupservice: LookupService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.persondocuments = JSON.parse(window.sessionStorage.getItem('persondocuments'));
    this.persondocumentsAll = JSON.parse(window.sessionStorage.getItem('persondocumentsAll'));
    if (this.view == 1 && this.persondocuments == null) {
      this.persondocumentGet();
    } else if (this. view == 2 && this.persondocumentsAll == null) {
      this.persondocumentGetAll();
    }

    if (!this.persondocumentID && Number(window.sessionStorage.getItem('persondocument'))>0) {
      this.persondocumentID = Number(window.sessionStorage.getItem('persondocument'));
    }
    if (this.persondocumentID) {
      window.sessionStorage.setItem("persondocument", this.persondocumentID);
    }
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        persondocument: 'after',
        widget: 'dxButton',
        options: {
          width: 136,
          text: 'Refresh',
          onClick: this.persondocumentGetAll.bind(this),
        },
      }
    );
  }

  add() {
  
    this.persondocument = {
    persondocument_ID: 0,
    person_ID: null,
    person_DETAIL:"",
    documenttype_ID:{id:null},
    documenttype_DESC:"",
    document_PATH:"",
    filetype_ID:{id:null},
    is_VERIFIED:true,
    is_ARCHIVED:null,
    isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }



 
  setPersondocuments(response) {
    if (this.view == 1) {
      this.persondocuments = response;
      window.sessionStorage.setItem("persondocuments", JSON.stringify(this.persondocuments));
    } else {
      this.persondocumentsAll = response;
      window.sessionStorage.setItem("persondocumentsAll", JSON.stringify(this.persondocumentsAll));
    }
    this.cancel.next();
  }
  
  setPersondocument(response) {
    this.persondocument = response;
    if (response.person_ID != null)
      this.persondocument.person_ID = response.person_ID;

    if (response.documenttype_ID != null)
      this.persondocument.documenttype_ID = response.documenttype_ID.id;

      if (response.filetype_ID != null)
      this.persondocument.filetype_ID = response.filetype_ID.id;


    if (response.isactive == "Y") {
      this.persondocument.isactive = true;
    } else {
      this.persondocument.isactive = false;
    }
  }

  persondocumentGet() {
    this.persondocumentService.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          response = this.persondocumentService.getAllDetail(response);
          this.setPersondocuments(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  persondocumentGetAll() {
    this.persondocumentService.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          response = this.persondocumentService.getAllDetail(response);
          this.setPersondocuments(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  persondocumentGetOne(id) {
    this.persondocumentService.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          response = this.persondocumentService.getDetail(response);
          this.persondocument = response;
          this.disabled = true;
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

 

  persondocumentAdd(persondocument) {
    persondocument.person_ID =this.addperson.personID;
    persondocument.documenttype_ID = this.adddocumenttype.documenttypeID;
    persondocument.filetype_ID = this.addfiletype.filetypeID;
  
   
    this.persondocumentService.add(persondocument).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.activity_ID) {
          this.toastrservice.success("Success", "New persondocument Added");
          this.persondocumentGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  persondocumentUpdate(persondocument) {
    persondocument.person_ID =this.addperson.personID;
    persondocument.documenttype_ID = this.adddocumenttype.documenttypeID;
    persondocument.filetype_ID = this.addfiletype.filetypeID;
  
    console.log(persondocument);
    if (persondocument.isactive == true) {
      persondocument.isactive = "Y";
    } else {
      persondocument.isactive = "N";
    }
    this.persondocumentService.update(persondocument, persondocument.persondocument_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.persondocument_ID) {
          this.toastrservice.success("Success", " persondocument Updated");
          this.persondocumentGetAll();
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

 

}
