import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { User } from './user.model';
import { State, UsersStore } from './users.store';
import { Observable } from 'rxjs/Observable';
/**
 *  Reads from the store,contains various types of selector.
 */
@Injectable({
  providedIn: 'root',
})
export class UsersQuery extends QueryEntity<State, User> {
  /**
   *  Init query.
   */
  constructor(protected store: UsersStore) {
    super(store);
  }
  /**
   *  Select all User.
   */
  public selectAll$: Observable<User[]> = this.selectAll();
}
