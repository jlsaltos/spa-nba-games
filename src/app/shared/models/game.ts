import { Team } from "./team";

export interface Game {
    id : number;
    date: string;
    homeTeam: Team;
    homeTeamScore: number;
    period:number,
    postseason:boolean,
    season:number,
    status:string,
    time:string,
    visitorTeam: Team,
    visitorTeamScore: number;
}