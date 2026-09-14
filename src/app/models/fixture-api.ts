export interface FixtureApiTeam {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
}

export interface FixtureApiCompetition {
    id: number;
    name: string;
    code: string;
    emblem: string;
}

export interface FixtureApiScore {
    fullTime: {
        home: number | null;
        away: number | null;
    };
}

export interface FixtureApiMatch {
    id: number;
    utcDate: string;
    status: string;
    venue: string | null;

    competition: FixtureApiCompetition;

    homeTeam: FixtureApiTeam;
    awayTeam: FixtureApiTeam;

    score: FixtureApiScore;
}

export interface FixtureApiResponse {
    matches: FixtureApiMatch[];
}