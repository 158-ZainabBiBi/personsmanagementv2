import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { setting } from 'src/app/setting';
import { redirectByHref } from 'src/app/utilities/Shared_Funtions';
import { OnFailService } from '../../services/on-fail.service';


import { PersonComponent } from '../person/person.component';
import { WorktypeComponent } from '../worktype/worktype.component';
import { PersonemploymentService } from './personemployment.service';
import { LocationComponent } from '../location/location.component';
import { LocationsearchfilterComponent } from '../locationsearchfilter/locationsearchfilter.component';
@Component({
  selector: 'app-personemployment',
  templateUrl: './personemployment.component.html',
  styleUrls: ['./personemployment.component.css']
})
export class PersonemploymentComponent implements OnInit {
    
  @ViewChild("person") person: PersonComponent;
  @ViewChild("addperson") addperson: PersonComponent;
  @ViewChild("editperson") editperson: PersonComponent;
  
  @ViewChild("location") location: LocationComponent;
  @ViewChild("addlocation") addlocation: LocationComponent;
  @ViewChild("editlocation") editlocation: LocationComponent;

  @ViewChild("worktype") worktype: WorktypeComponent;
  @ViewChild("addworktype") addworktype: WorktypeComponent;
  @ViewChild("editworktype") editworktype: WorktypeComponent;

  @ViewChild("locationsearchfilter") locationsearchfilter: LocationsearchfilterComponent;
  @ViewChild("addlocationsearchfilter") addlocationsearchfilter: LocationsearchfilterComponent;
  @ViewChild("editlocationsearchfilter") editlocationsearchfilter: LocationsearchfilterComponent;


  @Input()
  view: number = 1;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  personID = null;
  @Input()
  all: boolean = false;
  @Input()
  personemploymentID = null;

  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personemployments = [];
  personemploymentsAll = [];
  personemployment = {
    personemployment_ID: 0,
    organizationtype_ID:null,
    organizationsector_ID:null,
    organizationcategory_ID:null,
    careerlevel_ID:null,
    website:null,
    employer_NAME: "",
    office_EMAIL:null,
    contact_NUMBER:null,
    employer_ADDRESS: "",
    job_DESCRIPTION: "",
    startdate: "",
    enddate: "",
    person_ID: null,
    person_DETAIL:"",
    location_ID:null,
    address_LINE1: "",
    address_LINE2: "",
    address_LINE3: "",
    address_LINE4: "",
    address_LINE5: "",
    address_POSTCODE: "",
    worktype_ID: {
      id: null
    },
    isactive: true
  }

  constructor(
    private personemploymentservice: PersonemploymentService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
  ) { }

  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personemployments = JSON.parse(window.sessionStorage.getItem('personemployments'));
    this.personemploymentsAll = JSON.parse(window.sessionStorage.getItem('personemploymentsAll'));
    if (this.view == 1 && this.personemployments == null) {
      this.personemploymentAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personemploymentsAll == null) {
      this.personemploymentAdvancedSearchAll(this.personID);
    }
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          width: 136,
          text: 'Refresh',
          onClick: this.personemploymentAdvancedSearchAll.bind(this, this.personID),
        },
      }
    );
  }
  // showView(row) {
  //   this.show.next(row);
  // }

  editView() {
    this.disabled = false;
  }

  cancelView() {
    this.cancel.next();
    this.disabled = true;
  }


  add() {
    this.personemployment = {
    personemployment_ID: 0,
    organizationtype_ID:null,
    organizationsector_ID:null,
    organizationcategory_ID:null,
    careerlevel_ID:null,
    website:null,
    employer_NAME: "",
    office_EMAIL:null,
    contact_NUMBER:null,
    employer_ADDRESS: "",
    job_DESCRIPTION: "",
    startdate: "",
    enddate: "",
    person_ID: null,
    person_DETAIL:"",
    location_ID:null,
    address_LINE1: "",
    address_LINE2: "",
    address_LINE3: "",
    address_LINE4: "",
    address_LINE5: "",
    address_POSTCODE: "",
    worktype_ID: {
      id: null
    },
    isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  
  setPersonemployment(response) {
    if (response.person_ID != null)
    this.personemployment.person_ID = response.person_ID;

    if (response.worktype_ID != null)
    this.personemployment.worktype_ID = response.worktype_ID.id;

    if (response.isactive == "Y") {
      response.isactive = true;
    } else {
      response.isactive = false;
    }
    this.personemployment = response;
    this.disabled = true;
  }

  setPersonemployments(response) {
    for (var i=0; i<response.length; i++) {
      response[i].person = JSON.parse(response[i].person_DETAIL);
     
    }
    if (this.view == 1) {
      this.personemployments = response;
      window.sessionStorage.setItem("personemployments", JSON.stringify(this.personemployments));
    } else {
      this.personemploymentsAll = response;
      window.sessionStorage.setItem("personemploymentsAll", JSON.stringify(this.personemploymentsAll));
    }
    this.cancel.next();
  }

  personemploymentGet() {
    this.personemploymentservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonemployment(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personemploymentGetAll() {
    this.personemploymentservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonemployment(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personemploymentGetOne(id) {
    this.personemploymentservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonemployment(this.personemploymentservice.getDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  personemploymentAdd(personemployment) {
    personemployment.worktype_ID = this.addworktype.worktypeID;
    personemployment.person_ID = this.addperson.personID;
    personemployment.location_ID = this.addlocation.locationID;
    this.personemploymentservice.add(personemployment).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personemployment_ID) {
          this.toastrservice.success("Success", "New Personemployments Added");
          this.personemploymentAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personemploymentUpdate(personemployment) {
    personemployment.worktype_ID = this.editworktype.worktypeID;
    personemployment.person_ID = this.editperson.personID;
    personemployment.location_ID = this.editlocation.locationID;
    if (personemployment.isactive == true) {
      personemployment.isactive = "Y";
    } else {
      personemployment.isactive = "N";
    }
    this.personemploymentservice.update(personemployment, personemployment.personemployment_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personemployment_ID) {
          this.toastrservice.success("Success", " Personemployments Updated");
          this.personemploymentAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
  personemploymentSearch(str) {
    var search = {
      search: str
    }
    this.personemploymentservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonemployments(this.personemploymentservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personemploymentSearchAll(str) {
    var search = {
      search: str
    }
    this.personemploymentservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonemployments(this.personemploymentservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personemploymentAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personemploymentservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersonemployments(this.personemploymentservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personemploymentAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personemploymentservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.setPersonemployments(this.personemploymentservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
