import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { setting } from 'src/app/setting';
import { redirectByHref } from '../../utilities/Shared_Funtions';
import { OnFailService } from '../../services/on-fail.service';

import { LocationsearchfilterComponent } from '../locationsearchfilter/locationsearchfilter.component';
import { PersoncontactaddressService } from './personcontactaddress.service';

declare var $: any;

@Component({
  selector: 'app-personcontactaddress',
  templateUrl: './personcontactaddress.component.html',
  styleUrls: ['./personcontactaddress.component.css']
})
export class PersoncontactaddressComponent implements OnInit {
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
  all: boolean = false;
  @Input()
  personID = null;
  @Input()
  personcontactaddressID = null;

  @Output() show = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  personcontactaddresses = [];
  personcontactaddressesAll = [];
  personcontactaddress = {
    personcontactaddress_ID: 0,
    person_ID: null,
    address_LINE1: "",
    address_LINE2: "",
    address_LINE3: "",
    address_LINE4: "",
    address_LINE5: "",
    address_POSTCODE: "",
    location_ID: null,
    ispermanent: true,
    isactive: true
  }

  constructor(
    private personcontactaddressservice: PersoncontactaddressService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    } else {
      redirectByHref(setting.redirctPath+"/#/home/personal");
    }

    this.personcontactaddresses = JSON.parse(window.sessionStorage.getItem('personcontactaddresses'));
    this.personcontactaddressesAll = JSON.parse(window.sessionStorage.getItem('personcontactaddressesAll'));
    if (this.view == 1 && this.personcontactaddresses == null) {
      this.personcontactAdvancedSearch(this.personID);
    } else if (this.view == 2 && this.personcontactaddressesAll == null) {
      this.personcontactAdvancedSearchAll(this.personID);
    } else if (this.view == 6) {
      this.personcontactAdvancedSearchAll(this.personID);
    }

    if (this.personcontactaddressID != 0 && !this.personcontactaddressID && Number(window.sessionStorage.getItem('personcontactaddress'))>0) {
      this.personcontactaddressID = Number(window.sessionStorage.getItem('personcontactaddress'));
    }
    if (this.view == 5 && this.personcontactaddressID) {
      window.sessionStorage.setItem("personcontactaddress", this.personcontactaddressID);
      this.personcontactaddressGetOne(this.personcontactaddressID);
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
          onClick: this.personcontactAdvancedSearchAll.bind(this, this.personID),
        },
      }
    );
  }

  showView(row) {
    this.show.next(row);
  }

  editView() {
    this.disabled = false;
  }

  cancelView() {
    this.cancel.next();
    this.disabled = true;
  }

  add() {
    this.personcontactaddress = {
      personcontactaddress_ID: 1,
      person_ID: null,
      address_LINE1: "",
      address_LINE2: "",
      address_LINE3: "",
      address_LINE4: "",
      address_LINE5: "",
      address_POSTCODE: "",
      location_ID: null,
      ispermanent: true,
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }
  
  setPersoncontactaddresses(response) {
    if (this.view == 1) {
      this.personcontactaddresses = response;
      window.sessionStorage.setItem("personcontactaddresses", JSON.stringify(this.personcontactaddresses));
    } else {
      this.personcontactaddressesAll = response;
      window.sessionStorage.setItem("personcontactaddressesAll", JSON.stringify(this.personcontactaddressesAll));
    }
    this.cancel.next();
  }

  setPersoncontactaddress(response) {
    this.personcontactaddress = response;
    if (response.person_ID != null)
      this.personcontactaddress.person_ID = response.person_ID;
    if (response.locationsearchfilter_ID != null)
      this.personcontactaddress.location_ID = response.locationsearchfilter_ID.id;

    if (response.ispermanent=="Y") {
      this.personcontactaddress.ispermanent = true;
    } else {
      this.personcontactaddress.ispermanent = false;
    }

    if (response.isactive=="Y") {
      this.personcontactaddress.isactive = true;
    } else {
      this.personcontactaddress.isactive = false;
    }
    this.disabled = true;
  }

  personcontactaddressGet() {
    this.personcontactaddressservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontactaddresses(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactaddressGetAll() {
    this.personcontactaddressservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontactaddresses(response);
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactaddressGetOne(id) {
    this.personcontactaddressservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcontactaddress_ID) {
          this.setPersoncontactaddress(response);
        }
      } else {
        this.toastrservice.error("Some thing went wrong");
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactaddressAdd(personcontactaddress) {
    personcontactaddress.person_ID = this.personID;
    personcontactaddress.location_ID = this.locationsearchfilter.locationID;
    this.personcontactaddressservice.add(personcontactaddress).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcontactaddress_ID) {
          this.toastrservice.success("Success", "New Person Contact Addresss Added");
          this.personcontactAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactaddressUpdate(personcontactaddress) {
    personcontactaddress.person_ID = this.personID;
//    personcontactaddress.locationsearchfilter_ID = this.editlocationsearchfilter.locationsearchfilterID;
    if (personcontactaddress.ispermanent == true) {
      personcontactaddress.ispermanent = "Y";
    } else {
      personcontactaddress.ispermanent = "N";
    }
    if (personcontactaddress.isactive == true) {
      personcontactaddress.isactive = "Y";
    } else {
      personcontactaddress.isactive = "N";
    }
    this.personcontactaddressservice.update(personcontactaddress, personcontactaddress.personcontactaddress_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.personcontactaddress_ID) {
          this.toastrservice.success("Success", " Person Contact Addresss Updated");
          this.personcontactAdvancedSearchAll(this.personID);
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactSearch(str) {
    var search = {
      search: str
    }
    this.personcontactaddressservice.search(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontactaddresses(this.personcontactaddressservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactSearchAll(str) {
    var search = {
      search: str
    }
    this.personcontactaddressservice.searchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontactaddresses(this.personcontactaddressservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactAdvancedSearch(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personcontactaddressservice.advancedSearch(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersoncontactaddresses(this.personcontactaddressservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personcontactAdvancedSearchAll(personID) {
    this.personID = personID;
    var search = {
      person_ID: personID
    }
    this.personcontactaddressservice.advancedSearchAll(search).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else {
          this.setPersoncontactaddresses(this.personcontactaddressservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

}
