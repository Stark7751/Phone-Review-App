import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reviews } from './Reviews';

@Injectable()
export class PhoneViewService {
  authenticationServer = 'https://authenticationapiforphonereviewapp.azurewebsites.net';
  appServer = 'https://apiforphonereviewapp.azurewebsites.net';
  constructor(private http: HttpClient) { }

  getPhone(phoneID: number): Observable<object> {
    return this.http.get(this.appServer + '/api/FetchPhones/GetPhoneWithID?id=' + phoneID);
  }

  getReviews(phoneID: number): Observable<object> {
    return this.http.get(this.appServer + '/api/FetchReviews/GetReviewsByPhoneID?id=' + phoneID);
  }

  getDetails(phoneID: number): Observable<object> {
    return this.http.
    get('https://search-phone-ayajxcgg744cbywfmvzjxd6hhm.ap-south-1.es.amazonaws.com/phone_list/phones/_search?q=Phone_ID:' + phoneID);
  }

  submitReview(userReview: string, phoneID: number): Observable<object> {
    const headers = {
      headers : new HttpHeaders({
        Authorization : 'Bearer ' + localStorage.getItem('JWTAccessToken'),
        'Content-Type':  'application/json'
      })
    };
    return this.http
        .post(this.appServer + '/api/FetchReviews/SubmitReviews?Phone_ID=' + phoneID,
         JSON.stringify({UserReview : userReview}), headers);
  }

}
