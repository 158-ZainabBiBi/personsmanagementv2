import { Injectable } from "@angular/core";
import { HttpCallServieService } from "src/app/services/http-call-servie.service";
import { setting } from "src/app/setting";

@Injectable({
  providedIn: "root"
})
export class  PersoncontactService {
  constructor(
    private _HttpCallServieService_: HttpCallServieService
  ) { }


  get() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personcontact",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  getAll() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personcontact/all",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }


  getOne(id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personcontact/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  add(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontact",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  update(data, id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "PUT",
      request_URI: "personcontact/" + id,
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  delete(id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "DELETE",
      request_URI: "personcontact/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  search(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontact/search",
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  searchAll(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontact/search/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearch(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontact/advancedsearch",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearchAll(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personcontact/advancedsearch/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  getAllDetail(response) {
    for (var a = 0; a < response.length; a++) {
      response[a].person = JSON.parse(response[a].person_DETAIL);
      response[a].person_DETAIL = null;
    }
    return(response);
  }

  getDetail(response) {
    response.person = JSON.parse(response.person_DETAIL);
    response.person_DETAIL = null;

    return(response);
  }

}
