import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { RequestOptions, Request, RequestMethod } from '@angular/http';

@Injectable()
export class GoogleMapsService {

  url: string = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='
  API_KEY: string = '&key=AIzaSyD_TkIqjNZTh2o0KmV10tQ7G1tIPCrdEU4'


  constructor(private http: HttpClient) { }

  //https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615,-73.9976592&key=AIzaSyD_TkIqjNZTh2o0KmV10tQ7G1tIPCrdEU4


  getDistance(origLat: string, origLng, destLat, destLng) {

    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };*/

    /*const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions(
      {
        method: RequestMethod.Post,
        headers: headers
      }
    );*/

    /*const requestOptions = {
      params: new HttpParams()
    };
    
    requestOptions.params.set('Access-Control-Allow-Origin', '*');*/

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    //headers = headers.set('application/json; charset=utf-8');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Access-Control-Allow-Headers', 'Origin; Content-Type');

    var temp = this.url
    temp += origLat + ',' + origLng
    temp += '&destinations='
    temp += destLat + ',' + destLng
    temp += this.API_KEY

    console.log(headers)
    
    //return this.http.get(temp, {headers});
    return this.http.get(temp);
  }

}
