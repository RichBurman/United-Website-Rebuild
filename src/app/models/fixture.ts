export interface Fixture {
id: number;
date: string;
venue: string;
homeTeam: string;
homeTeamCrest: string;
awayTeam: string;
awayTeamCrest: string;
homeScore: number | null;
awayScore: number | null;
competition: string;
status: 'UPCOMING' | 'FINISHED';
}