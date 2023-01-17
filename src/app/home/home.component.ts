import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppService } from '../app-service/app.service';
import { allGames, IselectedTeam, ITeams } from '../interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teams!: ITeams[];
  selectedTeams: IselectedTeam[] = [];
  allGames: allGames[] = [];
  team = {
    id: '',
  };
  constructor(private _as: AppService, private _router: Router) {}

  ngOnInit(): void {
    this._as
      .getTeams()
      .pipe(map((x) => x.data))
      .subscribe(
        (res) => {
          this.teams = res;
        },
        (err) => {
          alert(err);
        }
      );

    let getTeams = JSON.parse(localStorage.getItem('selected_teams')!);
    let getgames = JSON.parse(localStorage.getItem('all_games')!);
    if (getTeams.length) {
      this.selectedTeams = getTeams;
    }
    if (getgames.length) {
      this.allGames = getgames;
    }
  }

  submitTeam() {
    let logoUrl = 'https://interstate21.com/nba-logos';

    if (!this.team.id) {
      alert('please select a team to preceed');
      return;
    }
    let team_exits = this.selectedTeams.findIndex(
      (i) => i.id === +this.team.id
    );
    if (team_exits !== -1) {
      alert('team already added');
      return;
    }
    let selected_team: IselectedTeam = this.teams.filter(
      (i) => i.id === +this.team.id
    )[0];
    selected_team.imgUrl = `${logoUrl}/${selected_team.abbreviation}.png`;
    selected_team.outcomes = [];
    this._as
      .getPast12DaysResults(selected_team.id)
      .pipe(map((x) => x.data))
      .subscribe(
        (res) => {
          this.allGames.push({
            id: selected_team.id,
            data: res,
          });

          localStorage.setItem('all_games', JSON.stringify(this.allGames));
          let points_scored = 0;
          let points_conceded = 0;
          res.forEach((game) => {
            let home_away_team;
            game.home_team.id === +this.team.id
              ? (home_away_team = 'home_team')
              : (home_away_team = 'visitor_team');

            if (home_away_team === 'home_team') {
              if (game.home_team_score > game.visitor_team_score) {
                selected_team.outcomes?.push('W');
                points_scored += game.home_team_score;
                points_conceded += game.visitor_team_score;
              } else {
                selected_team.outcomes?.push('L');
                points_scored += game.home_team_score;
                points_conceded += game.visitor_team_score;
              }
            } else {
              if (game.visitor_team_score > game.home_team_score) {
                selected_team.outcomes?.push('W');
                points_scored += game.visitor_team_score;
                points_conceded += game.home_team_score;
              } else {
                selected_team.outcomes?.push('L');
                points_scored += game.visitor_team_score;
                points_conceded += game.home_team_score;
              }
            }
          });
          selected_team.avg_scored = parseFloat(
            (points_scored / res.length).toFixed(1)
          );
          selected_team.avg_conceded = parseFloat(
            (points_conceded / res.length).toFixed(1)
          );

          this.selectedTeams.push(selected_team);
          localStorage.setItem(
            'selected_teams',
            JSON.stringify(this.selectedTeams)
          );
        },
        (err) => {
          alert(err);
        }
      );
  }

  close(deletedTeam: ITeams) {
    this.selectedTeams = this.selectedTeams.filter(
      (i) => i.id !== deletedTeam.id
    );
    localStorage.setItem('selected_teams', JSON.stringify(this.selectedTeams));
  }

  results(team: IselectedTeam) {
    let selected_game = this.allGames.filter((i) => i.id === team.id)[0];
    selected_game.name = team.name;
    selected_game.abbreviation = team.abbreviation;
    selected_game.conference = team.conference;
    this._router.navigate(['results', team.abbreviation], {
      queryParams: { data: JSON.stringify(selected_game) },
    });
  }
}
