import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { createUser, User } from '../state/user.model';

import { ICarListDto } from './dto-user';
import { MapperUsersService } from './mapper-users.service';
/**
 * Service communication with http server https://backend-jscamp.saritasa-hosting.com/api/users.
 */
@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  /**
   *  @param httpClient.
   *  @param mapperUsers converts user.
   */
  constructor(private httpClient: HttpClient, private mapperUsers: MapperUsersService) {
  }
  /**
   *  Get user from api..
   */
  public getUsers(): Observable<User[]> {
    return this.httpClient.get<ICarListDto>('https://backend-jscamp.saritasa-hosting.com/api/users').pipe(
      map(({results}) => {
        return results.map(
          userDto => createUser(this.mapperUsers.parseToUser(userDto)),
        );
      }),
    );
  }

}
