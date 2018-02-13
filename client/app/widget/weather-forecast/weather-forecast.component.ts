import { WeatherService } from '../../services/weather-forecast.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'weather-app',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherComponent implements OnInit {

    weather10Days;
    weatherToday = { "today": "", "icon": "", "status": "", "temp": 0 };
    weatherNextDays = [{ "day": "", "icon": "", "status": "", "temp": 0 },
    { "day": "", "icon": "", "status": "", "temp": 0 },
    { "day": "", "icon": "", "status": "", "temp": 0 }
    ];

    constructor(private weatherService: WeatherService,
    ) { }

    ngOnInit() {
        this.getWeather10Days();
        let that = this;
        setInterval(function () {
            if (this.weather != "undefined") {
                clearInterval(this);
                that.getWeatherToday();
                that.getWeatherNextDays();
            }
        }, 1000);
    }

    getWeather10Days() {
        this.weatherService.getWeather().subscribe(
            res => {
                let resJsonBuffer = <any>res;
                this.weather10Days = resJsonBuffer.forecast.simpleforecast.forecastday;
            },
            error => {
                console.log(error);
            }
        );
    }

    getWeatherToday() {
        this.weatherToday.icon = this.weather10Days[0].icon_url;
        this.weatherToday.status = this.weather10Days[0].conditions;
        this.weatherToday.temp = (parseInt(this.weather10Days[0].high.celsius) +
            parseInt(this.weather10Days[0].low.celsius)) / 2;
    }

    getWeatherNextDays() {
        for (let i = 0; i < 3; i++) {
            this.weatherNextDays[i].day = this.weather10Days[i + 1].date.weekday_short;
            this.weatherNextDays[i].icon = this.weather10Days[i + 1].icon_url;
            this.weatherNextDays[i].status = this.weather10Days[i + 1].conditions;
            this.weatherNextDays[i].temp = (parseInt(this.weather10Days[i + 1].high.celsius) +
                parseInt(this.weather10Days[i + 1].low.celsius)) / 2;
        }
    }
}