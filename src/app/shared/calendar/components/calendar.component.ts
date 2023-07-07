import { Component, OnInit } from '@angular/core';
import { Months } from 'src/app/core/enums';

const IMAGE_URL = 'https://biz-app-bucket.s3.us-east-2.amazonaws.com/iiz.png';
const WEEKDAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public hour = '12';
  public minutes = '00';
  public timePeriod = 'PM';
  public imageUrl = IMAGE_URL;
  public weekdays = WEEKDAYS;
  public weeks: (number | null)[][] = [];
  public selectedDate: number = new Date().getDate();
  public month = Months[new Date().getMonth() + 1];

  ngOnInit() {
    this.weeks = this._getWeeksOfMonth(this._getMonthIndex(this.month));
  }

  public isDateSelected(date: number | null): boolean {
    return this.selectedDate === date;
  }

  public selectDate(date: number | null): void {
    if (date) {
      this.selectedDate = date;
    }
  }

  public toggleTimePeriod(): void {
    this.timePeriod = this.timePeriod === 'AM' ? 'PM' : 'AM';
  }

  private _getWeeksOfMonth(monthIndex: number): (number | null)[][] {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const weeks: (number | null)[][] = [];
    const monthCalendar = this._generateMonthCalendar(currentYear, monthIndex);

    for (const week of monthCalendar) {
      const dates: (number | null)[] = [];
      for (const day of week) {
        if (day === 0) {
          dates.push(null);
        } else {
          dates.push(day);
        }
      }

      weeks.push(dates);
    }

    return weeks;
  }

  private _generateMonthCalendar(year: number, month: number): number[][] {
    const monthCalendar: number[][] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();

    let week: number[] = new Array(7).fill(0);

    for (let day = 1; day <= numDaysInMonth; day++) {
      const index = (firstDayOfWeek + day - 1) % 7;
      week[index] = day;

      if (index === 6 || day === numDaysInMonth) {
        monthCalendar.push(week);
        week = new Array(7).fill(0);
      }
    }

    return monthCalendar;
  }

  private _getMonthIndex(month: string): number {
    return Object.values(Months).indexOf(month);
  }
}
