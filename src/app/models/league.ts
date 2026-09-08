export interface LeagueTeam {
  teamId: number;
  position: number;
  teamName: string;
  tla: string;
  crest: string;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}