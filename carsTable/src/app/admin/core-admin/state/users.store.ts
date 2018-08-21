import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { User } from './user.model';
/**
 *  State store contains various methods of state management.
 */
export interface State extends EntityState<User> {
}
/**
 * Initial state of the store.
 */
const initialState = [];

/**
 * Receives data from the service gives query( CQS/CQRS).
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<State, User> {

  /**
   * Init store.
   */
  constructor() {
    super(initialState);
  }
}
