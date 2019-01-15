import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize, map, retryWhen, switchMap, take, takeUntil } from "rxjs/operators";

import { Car } from "../models/Car/car";

import { CarsService } from "./cars.service";
import { Observable, of } from "rxjs";
import { TeamService } from "./team.service";
import { Team } from "../models/team";

/**
 * Resolve does not support observable error state.
 * Can pass the error through the interface or make a component(error) and redirect there.
 */
interface ResolvedData {
  data?: any;
  error?: any;
}

/**
 * Resolve components that need a car.
 */
@Injectable({
  providedIn: "root"
})
export class TeamResolver implements Resolve<Observable<ResolvedData>> {

  constructor(private teamService: TeamService) {
  }

  /**
   * method is called when go to the link.
   * There is a race condition in that snapshot.
   *
   * @param route from where do we get the car.
   * @return Observable with a car or with an error why could not get it.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<ResolvedData> {

    if (route.queryParams.id) {
      console.log(route.queryParams.id);
      return this.teamService.getTeam(route.queryParams.id).pipe(
        map(team => {
          console.log(team);
          return { data: team };
        }),
        catchError(err => of({ error: err })),
        take(1),
      );
    }
    return of({ data: new Team() });
  }

  //   if (route.queryParams.id) {
  //     return this.teamService.getCar(route.queryParams.id).pipe(
  //       map(team => {
  //         return { team: team };
  //       }),
  //       catchError(err => of({ error: err })),
  //     );
  //   }
  //   return of({ car: new Car() });
  // }
}
