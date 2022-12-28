import { Injectable } from '@angular/core';
import { HttpCallServieService } from '../../services/http-call-servie.service';
import { setting } from 'src/app/setting';

@Injectable({
  providedIn: 'root',
})
export class PersonlanguageService {
  constructor(private _HttpCallServieService_: HttpCallServieService) {}

  get() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'GET',
      request_URI: 'personlanguage',
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  getAll() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'GET',
      request_URI: 'personlanguage/all',
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  getOne(id: string) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'GET',
      request_URI: 'personlanguage/' + id,
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  add(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personlanguage',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  update(data: any, id: string) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'PUT',
      request_URI: 'personlanguage/' + id,
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  updateAll(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'PUT',
      request_URI: 'personlanguage',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  delete(id: string) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'DELETE',
      request_URI: 'personlanguage/' + id,
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  search(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personlanguage/search',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  searchAll(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personlanguage/search/all',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearch(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personlanguage/advancedsearch',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearchAll(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personlanguage/advancedsearch/all',
      request_BODY: JSON.stringify(data),
    };
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
