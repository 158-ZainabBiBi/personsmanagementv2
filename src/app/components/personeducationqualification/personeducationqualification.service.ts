import { Injectable } from "@angular/core";
import { HttpCallServieService } from "src/app/services/http-call-servie.service";
import { setting } from "src/app/setting";

@Injectable({
  providedIn: "root"
})
export class  PersoneducationqualificationService {
  constructor(
    private _HttpCallServieService_: HttpCallServieService
  ) { }


  get() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personeducationqualification",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  getAll() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personeducationqualification/all",
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }


  getOne(id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "GET",
      request_URI: "personeducationqualification/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  add(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personeducationqualification",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  update(data, id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "PUT",
      request_URI: "personeducationqualification/" + id,
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  delete(id) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "DELETE",
      request_URI: "personeducationqualification/" + id,
      request_BODY: ""
    }
    return this._HttpCallServieService_.api(postData);
  }

  search(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personeducationqualification/search",
      request_BODY: JSON.stringify(data)

    }
    return this._HttpCallServieService_.api(postData);
  }

  searchAll(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personeducationqualification/search/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearch(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personeducationqualification/advancedsearch",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearchAll(data) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: "POST",
      request_URI: "personeducationqualification/advancedsearch/all",
      request_BODY: JSON.stringify(data)
    }
    return this._HttpCallServieService_.api(postData);
  }
}
