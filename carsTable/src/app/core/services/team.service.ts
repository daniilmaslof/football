import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Team } from "../models/team";
import { QueryFn } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TeamService {

  constructor(private firestore: AngularFirestore) {
  }

  getTeams() {
    return this.firestore.collection("team").snapshotChanges().pipe(
      map(
        value => {
          return value.map(a => {
              const data = a.payload.doc.data() as Team;
              const idCollection = a.payload.doc.id;
              return { idCollection, ...data };

            }
          );
        }
      ));
  }


  addTeam(team: Team) {
    return this.firestore.collection("team").add(
      {
        name: team.name,
        firstPlayers: team.firstPlayers,
        secondPlayers: team.secondPlayers
      }
    );
  }
  updateTeam(team: Team,id) {
    return this.firestore.doc(`team/${id}`).update(
      {
        name: team.name,
        firstPlayers: team.firstPlayers,
        secondPlayers: team.secondPlayers
      }
    );
  }
  getTeam(id: string): Observable<any> {
    return this.firestore.doc(`team/${id}`).snapshotChanges(

    ).pipe(
      map(
        value => {
          return value.payload.data();
        }
      )
    );
  }
}
