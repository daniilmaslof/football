import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../../core-admin/state/user.model';

/**
 * Displays the form user.
 */
@Component({
  selector: 'app-user',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  /**
   * Model user.
   */
  @Input()
  public user: User;
  /**
   * Event Emitter edit user.
   */
  @Output()
  public editUser: EventEmitter<User> = new EventEmitter<User>();

  private submiForm(formUser: NgForm): void {
    if (formUser.valid) {
      this.editUser.emit(this.user);
    }
  }
}
