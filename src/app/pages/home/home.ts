import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { Fixture } from '../../models/fixture';
import { FixtureService } from '../../services/fixture/fixture';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private fixtureService = inject(FixtureService);

  fixtures = signal<Fixture[]>([]);

  lastResult = computed(() => {
    const finishedMatches = this.fixtures().filter(
      (fixture) => fixture.status === 'FINISHED',
    );

    return finishedMatches.at(-1);
  });

  nextMatch = computed(() => {
    return this.fixtures().find((fixture) => fixture.status === 'UPCOMING');
  });

  recentForm = computed(() => {
    const finishedMatches = this.fixtures()
      .filter((fixture) => fixture.status === 'FINISHED')
      .slice(-5);

    return finishedMatches.map((fixture) => {
      if (fixture.homeScore === fixture.awayScore) {
        return 'D';
      }

      const unitedAreHome = fixture.homeTeam === 'Man United';

      if (unitedAreHome) {
        return fixture.homeScore! > fixture.awayScore! ? 'W' : 'L';
      }

      return fixture.awayScore! > fixture.homeScore! ? 'W' : 'L';
    });
  });

  constructor() {
    this.loadFixtures();
  }

  loadFixtures() {
    this.fixtureService.getFixtures().subscribe({
      next: (fixtures) => {
        this.fixtures.set(fixtures);
      },
      error: (error) => {
        console.error('Unable to load home fixtures:', error);
      },
    });
  }
}
