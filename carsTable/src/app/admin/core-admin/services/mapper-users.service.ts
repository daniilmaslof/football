import { Injectable } from '@angular/core';

import { User } from '../state/user.model';

import { IUserDto } from './dto-user';
/**
 * Class stores parsing functions that converts data from the server to classes client.
 */
@Injectable({
  providedIn: 'root',
})
export class MapperUsersService {

  /**
   **
   * Parse to car from IUserDto received from api.
   *
   * @param userFromApi user sent from API.
   * @return Data converted to a type  User.
   */
  public parseToUser(userFromApi: IUserDto): User {
    return {
      id: userFromApi.id,
      email: userFromApi.email,
      firstName: userFromApi.first_name,
      lastName: userFromApi.last_name,
      gender: userFromApi.gender,
      role: userFromApi.role,
    };
  }
}
