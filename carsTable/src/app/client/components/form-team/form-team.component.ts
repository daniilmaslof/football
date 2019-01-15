import { Component, OnInit, ViewChild } from "@angular/core";
import { Car } from "../../../core/models/Car/car";
import { Team } from "../../../core/models/team";
import { NgForm } from "@angular/forms";
import { TeamService } from "../../../core/services/team.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-form-team",
  templateUrl: "./form-team.component.html",
  styleUrls: ["./form-team.component.scss"]
})
export class FormTeamComponent implements OnInit {

  /**
   * Car Form.
   */
  @ViewChild("carForm")
  public carForm: NgForm;
  /**
   * car which we fill.
   */
  public team: Team;
  public firstPlayers: string[];

  constructor(private teamService: TeamService, private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.team = new Team();
    console.log(this.team);
    // this.error = this.activatedRoute.snapshot.data.carResolver.error;

    this.team = this.activatedRoute.snapshot.data.teamResolver.data;
    console.log(this.team);
  }

  /**
   * Send car and depending on the success create error or snack bar.
   */
  public onSubmit(): void {
    console.log(this.team);
    console.log(this.carForm);
    Object.keys(this.carForm.value).forEach(
      value => {
        if (value.split("firstPlayers-")[1]) {
          this.team.firstPlayers[value.split("firstPlayers-")[1]] = this.carForm.value[value];
        }
        if (value.split("secondPlayers-")[1]) {
          this.team.secondPlayers[value.split("secondPlayers-")[1]] = this.carForm.value[value];
        }
      }
    );
    if (this.activatedRoute.snapshot.data.teamResolver.data) {
      console.log(this.activatedRoute.snapshot);
      this.teamService.updateTeam(this.team,this.activatedRoute.snapshot.queryParams['id']);
      return;
    }
    this.teamService.addTeam(this.team);

    //
    //   firstPlayers-0
    // :
    //   "asd"
    //   firstPlayers-1
    // :
    //   "asd"
    //   firstPlayers-2
    // :
    //   "asd"
    //   firstPlayers-3
    // :
    //   "asd"
    //   firstPlayers-4
    // :
    //   "asd"
    //   firstPlayers-5
    // :
    //   "asd"
    //   firstPlayers-6
    // :
    //   "asd"
    //   name
    //     :
    //     "qwe"
    //   secondPlayers-0
    // :
    //   "qwe"
    //   secondPlayers-1
    // :
    //   "12"
    //   secondPlayers-2
    // :
    //   "qwe"
    //   secondPlayers-3
    // :
    //   "qwe"
    // this.isFormSubmitted = true;
    // this.car.updated = new Date();
    // if (!this.car.id) {
    //   this.car.created = new Date();
    // }
    // this.carsServise.saveCar(this.car).subscribe(
    //   () => {
    //     this.isFormSubmitted = true;
    //     this.snackBar.open('the car is sent');
    //   }, httpErrorResponse => this.error = `${httpErrorResponse.error} status server ${httpErrorResponse.status}`,
    // );
  }

}
