import { Injectable } from "@angular/core";
import { HttpCallServieService } from "src/app/services/http-call-servie.service";
import { setting } from "src/app/setting";


@Injectable({
  providedIn: 'root'
})
export class PersoncontactaddressService {
  constructor(
    private _HttpCallServieService_: HttpCallServieService
  ) { }


  get() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personcontactaddress",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  getAll() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personcontactaddress/all",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }


  getOne(id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personcontactaddress/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  add(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontactaddress",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  update(data, id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "PUT",
      request_URI: "personcontactaddress/" + id,
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  delete(id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "DELETE",
      request_URI: "personcontactaddress/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  search(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontactaddress/search",
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  searchAll(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontactaddress/search/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearch(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontactaddress/advancedsearch",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearchAll(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontactaddress/advancedsearch/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  getAllDetail(response) {
    for (var a = 0; a < response.length; a++) {
      response[a].address = response[a].address_LINE1;
      if (response[a].address_LINE2 != null && response[a].address_LINE2 != '')
        response[a].address = response[a].address + ", " + response[a].address_LINE2;
      if (response[a].address_LINE3 != null && response[a].address_LINE3 != '')
        response[a].address = response[a].address + ", " + response[a].address_LINE3;
      if (response[a].address_LINE4 != null && response[a].address_LINE4 != '')
        response[a].address = response[a].address + ", " + response[a].address_LINE4;
      if (response[a].address_LINE5 != null && response[a].address_LINE5 != '')
        response[a].address = response[a].address + ", " + response[a].address_LINE5;

      response[a].location = JSON.parse(response[a].location_DETAIL);
      response[a].location_DETAIL = null;
      while (response[a].location.locationparent_ID != null) {
        response[a].address = response[a].address + ", " + response[a].location.location_NAME;
        response[a].location = response[a].location.locationparent_ID;
      }
    }
    return(response);
  }

  getDetail(response) {
    response.address = response.address_LINE1;
    if (response.address_LINE2 != null && response.address_LINE2 != '')
      response.address = response.address + ", " + response.address_LINE2;
    if (response.address_LINE3 != null && response.address_LINE3 != '')
      response.address = response.address + ", " + response.address_LINE3;
    if (response.address_LINE4 != null && response.address_LINE4 != '')
      response.address = response.address + ", " + response.address_LINE4;
    if (response.address_LINE5 != null && response.address_LINE5 != '')
      response.address = response.address + ", " + response.address_LINE5;

    response.locations = [];
    response.location = JSON.parse(response.location_DETAIL);
    response.location_DETAIL = null;
    while (response.location.locationparent_ID != null) {
      response.address = response.address + ", " + response.location.location_NAME;
      response.locations.push(response.location);
      response.location = response.location.locationparent_ID;
    }
    response.locations.push(response.location);
    return(response);
  }

}
