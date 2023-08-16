import { Component, OnInit } from '@angular/core';
import { Months } from 'src/app/core/enums';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz.png';
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
  public isHourInputVisible = false;
  public inputHour = '12';
  public isMinutesInputVisible = false;
  public inputMinutes = '00';

  ngOnInit() {
    this.updateMonth();
  }

  public changeMonth(step: number): void {
    const currentMonthIndex = this._getMonthIndex(this.month);
    const newMonthIndex = (currentMonthIndex + step + 12) % 12;
    this.month = Months[newMonthIndex + 1];
    this.updateMonth();
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

  public isCurrentMonth(): boolean {
    const currentMonthIndex = new Date().getMonth() + 0;
    return this._getMonthIndex(this.month) === currentMonthIndex;
  }

  public toggleHourInput(): void {
    this.isHourInputVisible = !this.isHourInputVisible;

    if (!this.isHourInputVisible) {
      this.hour = this.inputHour;
    }
  }

  public onHourInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputNumber = parseInt(inputElement.value, 10);

    if (!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 12) {
      this.inputHour = inputNumber.toString();
    } else {
      this.inputHour = '00';
    }
  }

  public toggleMinutesInput(): void {
    this.isMinutesInputVisible = !this.isMinutesInputVisible;

    if (!this.isMinutesInputVisible) {
      this.minutes = this.inputMinutes;
    }
  }

  public onMinutesInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputNumber = parseInt(inputElement.value, 10);

    if (!isNaN(inputNumber) && inputNumber >= 0 && inputNumber <= 59) {
      this.inputMinutes = inputNumber.toString().padStart(2, '0');
    } else {
      this.inputMinutes = '00';
    }
  }

  private _getMonthIndex(month: string): number {
    return Object.values(Months).indexOf(month);
  }

  private updateMonth(): void {
    this.weeks = this._getWeeksOfMonth(this._getMonthIndex(this.month));
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
}
