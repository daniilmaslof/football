import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { UsersDataService } from '../services/users-data.service';

import { UsersStore } from './users.store';
/**
 *  Service to change the state  store.
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  /**
   *  @param usersStore Store.
   *  @param usersDataServise Api to retrieve users data.
   */
  constructor(private usersStore: UsersStore, private usersDataServise: UsersDataService) {
  }
  /**
   * Upload users of usersDataServise  and adds them to the store.
   */
  public uploadUser(): void {
    this.usersDataServise.getUsers().subscribe(
      users => {
        this.usersStore.add(users);
      },
    );
  }
}
