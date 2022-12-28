import { Injectable } from '@angular/core';
import { HttpCallServieService } from '../../services/http-call-servie.service';
import { setting } from 'src/app/setting';

@Injectable({
  providedIn: 'root',
})
export class PersonequalityService {
  constructor(private _HttpCallServieService_: HttpCallServieService) {}

  get() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'GET',
      request_URI: 'personequality',
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  getAll() {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'GET',
      request_URI: 'personequality/all',
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  getOne(id: string) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'GET',
      request_URI: 'personequality/' + id,
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  add(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personequality',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  update(data: any, id: string) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'PUT',
      request_URI: 'personequality/' + id,
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  updateAll(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'PUT',
      request_URI: 'personequality',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  delete(id: string) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'DELETE',
      request_URI: 'personequality/' + id,
      request_BODY: '',
    };
    return this._HttpCallServieService_.api(postData);
  }

  search(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personequality/search',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  searchAll(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personequality/search/all',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearch(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personequality/advancedsearch',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  advancedSearchAll(data: any) {
    var postData = {
      service_NAME: setting.personservice_NAME,
      request_TYPE: 'POST',
      request_URI: 'personequality/advancedsearch/all',
      request_BODY: JSON.stringify(data),
    };
    return this._HttpCallServieService_.api(postData);
  }

  getAllDetail(response) {
    for (var a = 0; a < response.length; a++) {
      response[a].person = JSON.parse(response[a].person_DETAIL);
      response[a].person_DETAIL = null;
      // response[a].residential = JSON.parse(response[a].residential_DETAIL);
      // response[a].residential_DETAIL = null;
      // response[a].domicile = JSON.parse(response[a].domicile_DETAIL);
      // response[a].domicile_DETAIL = null;

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
    response.person = JSON.parse(response.person_DETAIL);
    response.person_DETAIL = null;
    //response.residential = JSON.parse(response.residential_DETAIL);
      // response.residential_DETAIL = null;
      // response.domicile = JSON.parse(response.domicile_DETAIL);
      // response.domicile_DETAIL = null;
      
      response.location = JSON.parse(response.location_DETAIL);
      response.location_DETAIL = null;
      while (response.location.locationparent_ID != null) {
        response.address = response.address + ", " + response.location.location_NAME;
        response.location = response.location.locationparent_ID;
      }
    return(response);
  }

}
