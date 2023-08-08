/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Component } from '@angular/core';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { Parser } from 'json2csv';
interface IPrayerEvent {
  Subject: string;
  'Start Date': string;
  'Start Time': string;
  'End Date': string;
  'End Time': string;
  'All Day Event': boolean;
  Description: string;
  Location: string;
  Private: boolean;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  prayerTimes: PrayerTimes;
  todayPrayerTimes: PrayerTimes;
  records = [];
  constructor() {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates = new Coordinates(
        position.coords.latitude,
        position.coords.longitude
      );
      const params = CalculationMethod.MoonsightingCommittee();
      this.todayPrayerTimes = new PrayerTimes(coordinates, new Date(), params);

      const start = new Date(new Date().getFullYear(), 0, 1);
      const end = new Date(new Date().getFullYear(), 11, 31);
      const myPrayerEvents: IPrayerEvent[] = [];
      let loop = new Date(start);
      while (loop <= end) {
        this.prayerTimes = new PrayerTimes(coordinates, loop, params);
        myPrayerEvents.push({
          Subject: 'الفجر',
          'Start Date': loop.toLocaleDateString('en-US'),
          'Start Time': this.prayerTimes.fajr.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'End Date': loop.toLocaleDateString('en-US'),
          'End Time': this.prayerTimes.fajr.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'All Day Event': false,
          Description: 'حي على الصلاة حي الفلاح، صلاة الفجر ❤️',
          Location: 'المسجد',
          Private: true,
        });
        myPrayerEvents.push({
          Subject: 'الظهر',
          'Start Date': loop.toLocaleDateString('en-US'),
          'Start Time': this.prayerTimes.dhuhr.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'End Date': loop.toLocaleDateString('en-US'),
          'End Time': this.prayerTimes.dhuhr.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'All Day Event': false,
          Description: 'حي على الصلاة حي الفلاح، صلاة الظهر ❤️',
          Location: 'المسجد',
          Private: true,
        });
        myPrayerEvents.push({
          Subject: 'العصر',
          'Start Date': loop.toLocaleDateString('en-US'),
          'Start Time': this.prayerTimes.asr.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'End Date': loop.toLocaleDateString('en-US'),
          'End Time': this.prayerTimes.asr.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'All Day Event': false,
          Description: 'حي على الصلاة حي الفلاح، صلاة العصر ❤️',
          Location: 'المسجد',
          Private: true,
        });
        myPrayerEvents.push({
          Subject: 'المغرب',
          'Start Date': loop.toLocaleDateString('en-US'),
          'Start Time': this.prayerTimes.maghrib.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'End Date': loop.toLocaleDateString('en-US'),
          'End Time': this.prayerTimes.maghrib.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),

          'All Day Event': false,
          Description: 'حي على الصلاة حي الفلاح، صلاة المغرب ❤️',
          Location: 'المسجد',
          Private: true,
        });
        myPrayerEvents.push({
          Subject: 'العشاء',
          'Start Date': loop.toLocaleDateString('en-US'),
          'Start Time': this.prayerTimes.isha.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'End Date': loop.toLocaleDateString('en-US'),
          'End Time': this.prayerTimes.isha.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          'All Day Event': false,
          Description: 'حي على الصلاة حي الفلاح، صلاة العشاء ❤️',
          Location: 'المسجد',
          Private: true,
        });
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }

      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(myPrayerEvents);

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';

      //provide the name for the CSV file to be downloaded
      hiddenElement.download = 'مواقيت الصلاة.csv';
      hiddenElement.click();
    });
  }
}
