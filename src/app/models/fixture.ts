export interface Fixture {
id: number;
date: string;
homeTeam: string;
awayTeam: string;
homeScore: number | null;
awayScore: number | null;
competition: string;
status: 'UPCOMING' | 'FINISHED';
}