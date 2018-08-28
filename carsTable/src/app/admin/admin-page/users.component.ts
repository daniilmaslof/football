import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, ITdDataTableSortChangeEvent, TdDataTableSortingOrder } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../core-admin/state/user.model';
import { UsersQuery } from '../core-admin/state/users.query';
import { UsersService } from '../core-admin/state/users.service';

/**
 * Component with  users.
 */
@Component({
  selector: 'app-admin-page',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private users$: Observable<User[]>;

  /**
   * @param usersQuery store methods receiving users.
   * @param usersService store method change of users
   */
  constructor(private usersQuery: UsersQuery,
              private usersService: UsersService) {
  }

  /**
   * Upload users.
   */
  public ngOnInit(): void {
    this.usersService.uploadUser();
    this.users$ = this.usersQuery.selectAll$;
  }
}
