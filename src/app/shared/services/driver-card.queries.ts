import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { IDriverCarResponse, IFareResponse } from '../interfaces';

const fareQuery: DocumentNode = gql`
  query($driverId: Int!, $phoneBattery: Int!, $driverAvailability: Int!, $distance: Int!, $estimatedArrivalTime: Int!) {
    fare(driverId: $driverId,
      phoneBattery: $phoneBattery,
      driverAvailability: $driverAvailability,
      distance: $distance,
      estimatedArrivalTime: $estimatedArrivalTime
    )
  }
`;

const vehicleQuery: DocumentNode = gql`
  query driverActiveCar($driverId: Int!) {
    driverActiveCar(driverId: $driverId){
      imageUrl
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DriverCardQueries {
  constructor(private _apollo: Apollo) {}

  public generateFare(
    driverId: number, phoneBattery: number, driverAvailability: number, distance: number, estimatedArrivalTime: number
  ): Observable<ApolloQueryResult<IFareResponse>> {
    return this._apollo.watchQuery<IFareResponse>({
      query: fareQuery,
      variables: {
        driverId, phoneBattery, driverAvailability, distance, estimatedArrivalTime
      },
      context: {
        headers: new HttpHeaders().set('Authorization', this._getToken())
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  public getDriverCar(driverId: number): Observable<ApolloQueryResult<IDriverCarResponse>> {
    return this._apollo.watchQuery<IDriverCarResponse>({
      query: vehicleQuery,
      variables: {
        driverId
      },
      context: {
        headers: new HttpHeaders().set('Authorization', this._getToken())
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  private _getToken(): string {
    return CookieHelper.getToken();
  }
}
