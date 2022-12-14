import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OnFailService } from '../../services/on-fail.service';
import { LocationsearchfilterComponent } from '../locationsearchfilter/locationsearchfilter.component';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @ViewChild("locationsearchfilter") locationsearchfilter: LocationsearchfilterComponent;
  @ViewChild("addlocationsearchfilter") addlocationsearchfilter: LocationsearchfilterComponent;
  @ViewChild("editlocationsearchfilter") editlocationsearchfilter: LocationsearchfilterComponent;


  @Input()
  view: number = 0;
  @Input()
  iscompulsory: boolean = false;
  @Input()
  disabled: boolean = false;
  @Input()
  all: boolean = false;
  @Input()
  personID = null;

  @Output() show = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() cancel = new EventEmitter();

  persons = [];
  personsAll = [];
  person = {
    person_ID: 0,
    title: "",
    surname: "",
    previoussurname: null,
    forenames: "",
    middlename: null,
    nickname: null,
    birth_DATE: null,
    birth_TIME: null,
    birthplace_ID:null,
    birthplaces:[],
    personimg_PATH: null,
    isactive: true
  }

  constructor(
    private personservice: PersonService,
    private toastrservice: ToastrService,
    private onfailservice: OnFailService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.view == 0) {
      this.person = JSON.parse(window.sessionStorage.getItem('personal'));
      this.disabled = true;
    }
    this.persons = JSON.parse(window.sessionStorage.getItem('persons'));
    this.personsAll = JSON.parse(window.sessionStorage.getItem('personsAll'));

    this.route.queryParams.subscribe(params => {
      this.personID = params.person;
    });
    if (this.personID != 0 && !this.personID && Number(window.sessionStorage.getItem('person'))>0) {
      this.personID = Number(window.sessionStorage.getItem('person'));
    }
    if (this.view == 5 &&this.personID) {
      window.sessionStorage.setItem("person", this.personID);
      this.personGetOne(this.personID);
      this.disabled = true;
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
          onClick: this.personGetAll.bind(this),
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
    this.disabled = true;
  }

  add() {
    this.person = {
      person_ID: 0,
      title: "",
      surname: "",
      previoussurname: null,
      forenames: "",
      middlename: null,
      nickname: null,
      birth_DATE: null,
      birth_TIME: null,
      birthplace_ID:null,
      birthplaces:[],
      personimg_PATH: null,
      isactive: true
    };
  }

  update(row) {
    this.edit.next(row);
  }

  setPersons(response) {
    if (this.view == 1) {
      this.persons = response;
      window.sessionStorage.setItem("persons", JSON.stringify(this.persons));
    } else {
      this.personsAll = response;
      window.sessionStorage.setItem("personsAll", JSON.stringify(this.personsAll));
    }
    this.cancel.next();
  }

  setPerson(response) {
    this.person = response;
    window.sessionStorage.setItem("personal", JSON.stringify(this.person));

    if (response.isactive=="Y") {
      this.person.isactive = true;
    } else {
      this.person.isactive = false;
    }
  }

  personGet() {
    this.personservice.get().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersons(this.personservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personGetAll() {
    this.personservice.getAll().subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else{
          this.setPersons(this.personservice.getAllDetail(response));
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personGetOne(id) {
    this.personservice.getOne(id).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        }  else{
          this.setPerson(this.personservice.getDetail(response));
          if (this.locationsearchfilter != null)
            this.locationsearchfilter.setLocation(this.person.birthplaces);
        }
      } else {
        this.toastrservice.error("Some thing went wrong");
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personAdd(person) {
    person.birthplace_ID = this.locationsearchfilter.locationID;
    this.personservice.add(person).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.person_ID) {
          this.toastrservice.success("Success", "New Persons Added");
          this.personGetAll();
          this.setPerson(response);
          this.disabled = true;
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }

  personUpdate(person) {
    person.birthplace_ID = this.locationsearchfilter.locationID;
    if (person.isactive == true) {
      person.isactive = "Y";
    } else {
      person.isactive = "N";
    }
    this.personservice.update(person, person.person_ID).subscribe(response => {
      if (response) {
        if (response.error && response.status) {
          this.toastrservice.warning("Message", " " + response.message);
        } else if (response.person_ID) {
          this.toastrservice.success("Success", " Persons Updated");
          if (this.disabled==true) {
            this.setPerson(response);
          } else {
            this.disabled = true;
          }
        } else {
          this.toastrservice.error("Some thing went wrong");
        }
      }
    }, error => {
      this.onfailservice.onFail(error);
    })
  }
}
