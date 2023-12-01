import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public progressPercentage = 0;
  public arrivalTime = '';
  @Input() tripTime = 60;
  @Input() isGray = false;
  @Input() startTimerOnInit = true;

  ngOnInit() {
    if(this.startTimerOnInit) {
      this.startTimer();
    }
    this.calculateEndTime(this.tripTime);
  }

  private startTimer() {
    const interval = 1000;

    const timerInterval = setInterval(() => {
      this.progressPercentage = (this.progressPercentage + (interval / (this.tripTime * 1000)) * 100) || 0;

      if (this.progressPercentage >= 100) {
        clearInterval(timerInterval);
      }
    }, interval);
  }

  private calculateEndTime(seconds: number) {
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + seconds * 1000);

    // Set the time zone offset to GMT-6
    const timeZoneOffset = -6 * 60; // GMT-6 is 6 hours behind UTC
    endTime.setMinutes(endTime.getMinutes() + timeZoneOffset);

    const formattedTime = endTime.toLocaleString('en-US', {
        timeZone: 'America/Belize', // Specify the time zone as GMT-6
        hour12: false, // Use 24-hour format
        hour: 'numeric',
        minute: 'numeric'
    });

    this.arrivalTime = formattedTime;
  }
}
