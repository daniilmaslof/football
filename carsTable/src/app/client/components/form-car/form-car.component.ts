import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatSelectChange, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Car } from '../../../core/models/Car/car';
import { ElementDictionariesRelatedWithCar } from '../../../core/models/Car/element-dictionaries-related-with-car';
import { CarsService } from '../../../core/services/cars.service';
import { CanComponentDeactivate } from '../../../core/services/deactivate-form.guard';
import { DictionaryCarsService } from '../../../core/services/dictionary-cars.service';
import { DialogDeactivationComponent } from '../dialog-deactivation/dialog-deactivation.component';

/**
 * Component with car form.
 */
@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.scss'],
})
export class FormCarComponent implements OnInit, CanComponentDeactivate {
  /**
   * Car Form.
   */
  @ViewChild('carForm')
  public carForm: NgForm;
  private isFormSubmitted = false;
  /**
   * car which we fill.
   */
  public car: Car;
  /**
   * Observable with  dictionary make.
   */
  public make$: Observable<Array<ElementDictionariesRelatedWithCar>>;
  /**
   * Observable with  dictionary Body Type.
   */
  public bodyType$: Observable<Array<ElementDictionariesRelatedWithCar>>;
  /**
   * Observable with  dictionary Model.
   */
  public model$: Observable<Array<ElementDictionariesRelatedWithCar>>;
  /**
   * error associated with the form.
   */
  public error: String;

  /**
   * @param activatedRouter Angular.
   * @param router Angular.
   * @param dictionaryCarsServise Service for obtaining dictionaries associated with car.
   * @param carsServise Service for sending cars.
   * @param dialog Material.
   * @param snackBar Material.
   */
  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private dictionaryCarsServise: DictionaryCarsService,
              private carsServise: CarsService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) {

  }

  /**
   * Receives a car from the resolver and loads dictionary.
   */
  public ngOnInit(): void {
    this.error = this.activatedRouter.snapshot.data.carResolver.error;
    if (!this.error) {
      this.car = this.activatedRouter.snapshot.data.carResolver.car;

      this.make$ = this.dictionaryCarsServise.getMake();
      this.bodyType$ = this.dictionaryCarsServise.getBodyType();
      if (this.car.make.id) {
        this.model$ = this.dictionaryCarsServise.getModel(this.car.make.id);
      }
    }
  }

  /**
   * Send car and depending on the success create error or snack bar.
   */
  public onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.car.id) {
      this.car.updated = new Date();
      this.carsServise.putCar(this.car).subscribe(
        value => {
          this.isFormSubmitted = true;
          this.snackBar.open('the car is sent');
        }, httpErrorResponse => this.error = `${httpErrorResponse.error} status server ${httpErrorResponse.status}`,
      );
    } else {
      this.car.updated = new Date();
      this.car.created = new Date();
      this.carsServise.postCar(this.car).subscribe(
        value => {
          this.isFormSubmitted = true;
          this.snackBar.open('the car is sent');
        },
        httpErrorResponse => this.error = `${httpErrorResponse.error} status server ${httpErrorResponse.status}`,
      );
    }
  }

  /**
   * When changing make start load dictionary models with selected make id.
   */
  public changeSelectMake(changeMake: MatSelectChange): void {
    this.car.model.id = null;
    this.model$ = this.dictionaryCarsServise.getModel(changeMake.value);
  }

  /**
   * Allows to leave the component if form submitted or users didn`t enter data,else create modal window with confirm navigate.
   */
  public canDeactivate(): Observable<boolean> {
    if (this.error) {
      return Observable.of(true);
    }
    if (this.carForm.touched || this.carForm.submitted) {
      const dialogDeactivate = this.dialog.open(DialogDeactivationComponent, {
        width: '400px',
        height: '350px',
      } as MatDialogConfig<any>);
      return dialogDeactivate.afterClosed().map(
        value => value as boolean,
      );
    }
    return Observable.of(true);
  }
}
