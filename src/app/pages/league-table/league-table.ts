import { Component, inject } from '@angular/core';

import { League } from '../../services/league';

@Component({
  selector: 'app-league-table',
  imports: [],
  templateUrl: './league-table.html',
  styleUrl: './league-table.css',
})
export class LeagueTable {
  private leagueService = inject(League);

  constructor() {
    this.loadLeagueTable();
  }

  loadLeagueTable(): void {
    this.leagueService.getLeagueTable().subscribe({
      next: (response) => {
        console.log('LEAGUE API SUCCESS:', response);
      },
      error: (error) => {
        console.error('LEAGUE API ERROR:', error);
      },
    });
  }
}
