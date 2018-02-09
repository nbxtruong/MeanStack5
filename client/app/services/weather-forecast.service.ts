import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppHttpClient } from './app-http.service';
import { Injectable } from '@angular/core';
import { constants } from '../constants';

@Injectable()
export class WeatherService {

  weatherAPI = constants.WEATHER_API;
  constructor(
    private httpClient: HttpClient
  ) { }

  getWeather() {
    return this.httpClient.get(this.weatherAPI);
  }
}
