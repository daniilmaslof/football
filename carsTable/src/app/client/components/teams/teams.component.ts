import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { PageEvent } from "@angular/material";
import { combineLatest, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { debounceTime, distinctUntilChanged, map, share, startWith, switchMap, tap } from "rxjs/operators";
import { TeamService } from "../../../core/services/team.service";

/**
 * Component displaying daily reports.
 */
@Component({
  selector: "app-teams-reports",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsComponent {
  team$: any;
  /**
   * Indicates that we're loading daily reports from API.
   */
  public isLoadingDailyReports$ = new BehaviorSubject<boolean>(false);

  /*** @param dailyReportsService Allows you to get daily reports.
   * @param store Stores the current user.
   */
  constructor(private teamService: TeamService) {
    this.team$ = this.teamService.getTeams();
  }

}
