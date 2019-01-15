export class Team {

  public id: number;
  public name: string;
  firstPlayers: string[];
  secondPlayers: string[];
  scoreTeam: number;

  constructor({ id = null, name = "", firstPlayers = ["", "", "", "", "", "", ""], secondPlayers = ["", "", "", ""] }: Partial<Team> =
                { id: null, name: "", firstPlayers: ["", "", "", "", "", "", ""], secondPlayers: ["", "", "", ""] }) {
    this.name = name;
    this.id = id;
    this.firstPlayers = firstPlayers;
    this.secondPlayers = secondPlayers;
  }
}
