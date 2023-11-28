import { Component, OnInit } from '@angular/core';
import { MyTripsQueries } from '../../services';
import { ITrip } from '../../interfaces';

@Component({
  selector: 'app-user-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss']
})
export class UserTripsComponent implements OnInit{
  public trips: ITrip[] = [];
  constructor(private _userTripsQuery: MyTripsQueries) { }

  ngOnInit(): void {
    this._userTripsQuery.getTrips().subscribe(({ data }) => {
      if (data) {
        this.trips = data.trips || [];
      }
    });
  }
}
