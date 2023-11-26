import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public progressPercentage = 0;
  public arrivalTime = '';
  @Input() tripTime = 0;
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

    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();

    this.arrivalTime = `${this.formatTime(hours)}:${this.formatTime(minutes)}`;
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
