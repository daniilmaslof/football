/**
 * The row in the table if it contains a field isDetailRow it is hidden.
 */
import { Team } from "../../../core/models/team";

export interface RowViewModel {
  isDetailRow: boolean;
  team: Team;
}
