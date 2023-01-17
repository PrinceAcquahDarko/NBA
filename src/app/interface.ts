export interface ITeams {
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  id: number;
  name: string;
}

export interface GetTeams {
  data: ITeams[];
  meta: {};
}

export interface IselectedTeam extends ITeams {
  imgUrl?: string;
  outcomes?: string[];
  avg_scored?: number;
  avg_conceded?: number;
}

export interface IGetResults {
  data: teamResults[];
  meta: {};
}

export interface teamResults {
  date: string;
  home_team: ITeams;
  home_team_score: number;
  visitor_team: ITeams;
  visitor_team_score: number;
 
}

export interface allGames {
  data: teamResults[];
  id: number;
  name?: string;
  abbreviation?: string;
  conference?:string
}
