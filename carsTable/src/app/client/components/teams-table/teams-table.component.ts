import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Team } from "../../../core/models/team";
import { RowViewModel } from "./row-view-model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-teams-table",
  templateUrl: "./teams-table.component.html",
  styleUrls: ["./teams-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0", visibility: "hidden" })),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
    ])
  ]
})
export class TeamsTableComponent implements OnInit {

  /**
   * Daily report which is now expanded(open).
   */
  public expandedElement: Team;
  /**
   * Names of columns shown in the table.
   */
  public displayedColumns = ["id", "name"];
  /**
   * Each reports with an additional hidden rows.
   */
  public filteredDailyReportsWithExpandRow$: Observable<RowViewModel[]>;

  /**
   *
   * Adds every daily reports row view model with isDetailRow property.
   */
  @Input() set team$(value: Observable<Team[]>) {
    this.filteredDailyReportsWithExpandRow$ = value.pipe(
      map((teams) => {
        console.log(teams);
        const rows = [];
        teams.map(
          team => rows.push(team, { isDetailRow: true, team })
        );
        return rows;
      })
    );
  }

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Hide row if it contains isDetailRow ,required for use predicate "When".
   * @param i Index in table.
   * @param row Which is checked for contain isDetailRow.
   */
  public isExpansionDetailRow = (i: number, row: RowViewModel) => {
    this.expandedElement = null;
    return row.hasOwnProperty("isDetailRow");
  };

  /**
   * Shows the hidden row with text and questions daily reports.Row visibility = visible;
   * @param row the daily report whose text you want to show.
   */
  public toExpandRow(row: Team): void {
    this.expandedElement = row;
  }

}
